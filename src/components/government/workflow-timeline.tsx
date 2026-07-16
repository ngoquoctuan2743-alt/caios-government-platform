import { Check } from "lucide-react"

const STAGES = ["Tiếp nhận", "Thẩm định", "Phê duyệt", "Trả kết quả"]

/** Horizontal step timeline for case-progress surfaces (Officer console, Citizen case detail). */
export function WorkflowTimeline({ currentStep = 1 }: { currentStep?: number }) {
  return (
    <ol className="flex items-start">
      {STAGES.map((stage, i) => {
        const done = i < currentStep
        const active = i === currentStep
        const isLast = i === STAGES.length - 1
        return (
          <li key={stage} className="flex flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <div className={"h-0.5 flex-1 transition-colors duration-500 " + (i === 0 ? "opacity-0" : done || active ? "bg-primary" : "bg-border")} />
              <div className="relative">
                {active && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" style={{ animationDuration: "2s" }} />}
                <div
                  className={
                    "relative flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 " +
                    (done
                      ? "border-primary bg-primary text-primary-foreground"
                      : active
                        ? "border-primary bg-card text-primary shadow-[0_0_0_4px_rgba(200,16,46,0.1)]"
                        : "border-border bg-card text-muted-foreground")
                  }
                >
                  {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                </div>
              </div>
              <div className={"h-0.5 flex-1 transition-colors duration-500 " + (isLast ? "opacity-0" : done ? "bg-primary" : "bg-border")} />
            </div>
            <span className={"mt-2 text-xs font-medium transition-colors " + (done || active ? "text-foreground" : "text-muted-foreground")}>{stage}</span>
          </li>
        )
      })}
    </ol>
  )
}
