import { getCaseStore } from "@/lib/server/case-store"
import { handleContact } from "@/lib/server/handle-contact"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    return await handleContact(request, getCaseStore())
  } catch (err) {
    console.error("[contact] unexpected error", err)
    return new Response(
      JSON.stringify({ error: "We could not send your message right now. It has not been delivered. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
    )
  }
}
