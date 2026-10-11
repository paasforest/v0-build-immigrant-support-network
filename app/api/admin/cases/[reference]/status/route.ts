import { getCaseStore } from "@/lib/server/case-store"
import { handleStatusUpdate } from "@/lib/server/admin/handlers"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function failure(err: unknown) {
  console.error("[admin] request failed", err instanceof Error ? err.message : "unknown error")
  return new Response("Something went wrong. Nothing was changed.", { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } })
}

export async function POST(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const { reference } = await params
    return await handleStatusUpdate(request, reference, getCaseStore())
  } catch (err) {
    return failure(err)
  }
}
