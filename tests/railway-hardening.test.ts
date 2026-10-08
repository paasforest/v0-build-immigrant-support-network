import { afterEach, describe, expect, it, vi } from "vitest"
import { MAX_REQUEST_BYTES, readLimitedFormData, UploadError } from "@/lib/server/uploads"
import { clientKey, rateLimit } from "@/lib/server/rate-limit"
import { handleVisaAssessment } from "@/lib/server/handle-visa-assessment"
import type { CaseStore } from "@/lib/server/case-store/types"

const BOUNDARY = "----isn-test-boundary"
const CHUNK = 64 * 1024

/** A multipart body streamed in 64 KB chunks, counting how many bytes the server actually pulled. */
function streamingRequest(totalBytes: number, headers: Record<string, string> = {}) {
  const head = new TextEncoder().encode(
    `--${BOUNDARY}\r\nContent-Disposition: form-data; name="file:caseDocument"; filename="big.pdf"\r\nContent-Type: application/pdf\r\n\r\n%PDF-`
  )
  const tail = new TextEncoder().encode(`\r\n--${BOUNDARY}--\r\n`)
  let sent = 0
  let pulled = 0
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (sent === 0) {
        sent += head.byteLength
        pulled += head.byteLength
        controller.enqueue(head)
        return
      }
      if (sent >= totalBytes) {
        pulled += tail.byteLength
        controller.enqueue(tail)
        controller.close()
        return
      }
      const size = Math.min(CHUNK, totalBytes - sent)
      sent += size
      pulled += size
      controller.enqueue(new Uint8Array(size))
    },
  })
  const request = new Request("http://localhost/api/visa-assessment", {
    method: "POST",
    body,
    // @ts-expect-error -- required by Node's fetch for streaming request bodies
    duplex: "half",
    headers: { "content-type": `multipart/form-data; boundary=${BOUNDARY}`, ...headers },
  })
  return { request, pulled: () => pulled }
}

describe("readLimitedFormData", () => {
  it("rejects a declared Content-Length over the limit without reading the body", async () => {
    const { request, pulled } = streamingRequest(10 * 1024 * 1024, { "content-length": String(10 * 1024 * 1024) })
    await expect(readLimitedFormData(request)).rejects.toMatchObject({ status: 413 })
    // Only the stream's eager first pull (the small multipart header) happened; no file data was read.
    expect(pulled()).toBeLessThan(CHUNK)
  })

  it("stops reading a body without Content-Length once it passes the limit", async () => {
    const { request, pulled } = streamingRequest(40 * 1024 * 1024)
    const err = await readLimitedFormData(request).catch((e) => e)
    expect(err).toBeInstanceOf(UploadError)
    expect(err.status).toBe(413)
    // Read no further than the limit plus a few chunks of stream buffering, nowhere near 40 MB.
    expect(pulled()).toBeLessThan(MAX_REQUEST_BYTES + 4 * CHUNK)
  })

  it("parses a body within the limit", async () => {
    const { request } = streamingRequest(1024 * 1024)
    const form = await readLimitedFormData(request)
    expect((form.get("file:caseDocument") as File).size).toBeGreaterThan(1000 * 1000)
  })
})

describe("visa assessment handler: oversized requests", () => {
  const store = {
    kind: "local",
    createVisaCase: vi.fn(),
    createContactEnquiry: vi.fn(),
  } as unknown as CaseStore

  it("returns 413 and never reaches storage", async () => {
    const { request } = streamingRequest(20 * 1024 * 1024, { "x-real-ip": "192.0.2.10" })
    const res = await handleVisaAssessment(request, store)
    expect(res.status).toBe(413)
    expect(store.createVisaCase).not.toHaveBeenCalled()
  })
})

describe("clientKey", () => {
  const req = (headers: Record<string, string>) => new Request("http://localhost/", { headers })

  it("prefers X-Real-IP over any X-Forwarded-For value", () => {
    expect(clientKey(req({ "x-real-ip": "203.0.113.5", "x-forwarded-for": "1.2.3.4, 203.0.113.5" }))).toBe("203.0.113.5")
  })

  it("ignores the client-supplied first X-Forwarded-For entry when X-Real-IP is absent", () => {
    expect(clientKey(req({ "x-forwarded-for": "1.2.3.4, 5.6.7.8, 203.0.113.9" }))).toBe("203.0.113.9")
  })

  it("falls back to a shared key when no IP headers exist", () => {
    expect(clientKey(req({}))).toBe("unknown")
  })

  it("cannot be bypassed by rotating X-Forwarded-For behind a proxy that sets X-Real-IP", () => {
    const results = Array.from({ length: 7 }, (_, i) =>
      rateLimit(`test:${clientKey(req({ "x-real-ip": "198.51.100.77", "x-forwarded-for": `10.0.0.${i}` }))}`, 5, 60_000)
    )
    expect(results).toEqual([true, true, true, true, true, false, false])
  })
})

describe("isIndexable", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it.each([
    [undefined, false],
    ["staging", false],
    ["Production", false],
    ["production", true],
  ])("SITE_ENV=%s -> indexable %s", async (value, expected) => {
    vi.resetModules()
    if (value !== undefined) vi.stubEnv("SITE_ENV", value)
    else vi.stubEnv("SITE_ENV", "")
    const { isIndexable } = await import("@/lib/indexing")
    expect(isIndexable).toBe(expected)
  })
})
