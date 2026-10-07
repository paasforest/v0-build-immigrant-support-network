import { getCaseStore } from "@/lib/server/case-store"
import { handleVisaAssessment } from "@/lib/server/handle-visa-assessment"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    return await handleVisaAssessment(request, getCaseStore())
  } catch (err) {
    console.error("[visa-assessment] unexpected error", err)
    return new Response(
      JSON.stringify({
        error: "We could not submit your assessment right now. Nothing has been saved. Please try again, or contact us on WhatsApp.",
      }),
      { status: 500, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
    )
  }
}
