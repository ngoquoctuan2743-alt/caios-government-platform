# WORKFLOW_CONSTITUTION.md
### The Official Workflow Constitution — Citizen AI Operating System
**Status:** Constitutional — supersedes prior assumptions about workflow design
**Precedence:** Binds every future workflow, agent, and procedure definition. Where an implementation choice conflicts with this document, the implementation is wrong.
**Companion document:** `AI_OPERATING_SYSTEM.md` defines the *mind*. This document defines the *journey the mind carries the citizen through* — one universal journey, instantiated differently for every procedure.

---

## Preface

Vietnam has hundreds of administrative procedures, dozens of issuing agencies, and sixty-three provinces each with local variation in processing time and requirements. The temptation, when facing that diversity, is to build a different workflow for every procedure. That temptation must be refused.

**Every administrative procedure is different. But every citizen journey follows the same universal workflow.**

A citizen registering a birth and a citizen registering a business are, from the outside, doing unrelated things. From the inside — from the citizen's experience of not knowing, gathering, worrying, waiting, and finally holding a completed document — they are going through the identical shape of journey. This document designs that one shape, once, so that it can be instantiated by *configuration* — a different procedure definition, a different legal source set, a different checklist — rather than by *reinvention*.

This is what makes the platform scale from one pilot procedure to hundreds without collapsing under its own variety.

---

## 1. Universal Citizen Journey

The journey below is procedure-agnostic. Whether the citizen is renewing an ID card or registering a business, they pass through these same eight stages, feeling recognizably the same things at each one.

### Stage 1 — Need Emerges ("I have a need")
- **Goal:** The citizen has just realized they must interact with the government — a card is expiring, a life event happened, a deadline was mentioned to them.
- **Citizen emotion:** Mild dread, uncertainty, sometimes urgency. This is the moment procrastination begins if the next step isn't obvious.
- **Pain points:** No idea where to start; doesn't know the official name of what they need; afraid of wasting time.
- **Expected AI behavior:** Meet the citizen in plain language — accept "my ID card is expiring soon," not require "I would like to initiate a Citizen ID Renewal procedure." Immediately reduce the felt size of the task.
- **Success criteria:** The citizen feels, within the first exchange, that the system understood them and that this is now a solvable, bounded task.
- **Failure scenarios:** The citizen is asked to self-classify using bureaucratic terminology they don't know; the citizen abandons the interaction because the first response felt like a form, not a conversation.

### Stage 2 — Orientation (Seeking Understanding)
- **Goal:** Understand what procedure applies, what it will require, and roughly how long it will take.
- **Citizen emotion:** Curiosity mixed with anxiety about hidden requirements or costs.
- **Pain points:** Conflicting information from different informal sources (neighbors, old forum posts); fear of an outdated rule.
- **Expected AI behavior:** State the correct procedure and its current legal basis plainly, with the confidence and currency of that information visible.
- **Success criteria:** The citizen has a correct mental model of what's ahead before investing any effort.
- **Failure scenarios:** The AI names a procedure without confirming it fits the citizen's specific situation (age, prior status, location); the citizen is given generic information that turns out not to apply to them.

### Stage 3 — Engagement (Committing to Proceed)
- **Goal:** The citizen decides to actually start, providing the facts needed to determine eligibility.
- **Citizen emotion:** Cautious commitment — this is the moment the citizen starts investing real effort and expects that effort to not be wasted.
- **Pain points:** Being asked questions that feel irrelevant or repetitive; not knowing why a question is being asked.
- **Expected AI behavior:** Ask only what is needed for eligibility, explain briefly why each question matters, and use anything already known from citizen memory instead of re-asking.
- **Success criteria:** Eligibility is determined in the fewest questions genuinely necessary.
- **Failure scenarios:** The citizen is asked something already answered in a prior case; the eligibility question set feels like an interrogation rather than a short, purposeful check.

### Stage 4 — Preparation (Document Gathering)
- **Goal:** The citizen assembles the specific documents required for their specific situation.
- **Citizen emotion:** This is often the most stressful stage — the stage where real-world friction (a document is at a relative's house, an office is far away, a certificate must be requested from another agency) shows up.
- **Pain points:** Discovering a required document only after multiple failed attempts; not knowing which documents are substitutable or waivable.
- **Expected AI behavior:** Present a complete, personalized checklist up front — not revealed one item at a time — and flag which items are likely to take the longest to obtain, so the citizen can start those first.
- **Success criteria:** The citizen never discovers a new requirement after they believed they were done gathering.
- **Failure scenarios:** A required document appears only at the verification stage, forcing a second round of collection; the checklist is generic rather than personalized to the citizen's actual circumstances.

### Stage 5 — Readiness Verification
- **Goal:** Confirm that everything gathered is genuine, current, and correctly matched to this citizen and this procedure.
- **Citizen emotion:** Suspense — this is the moment the citizen finds out whether their effort was sufficient.
- **Pain points:** Being told something is wrong without a clear, specific, actionable explanation of what and why.
- **Expected AI behavior:** Verify thoroughly and report specifically — not "some documents are invalid" but "your household registration copy is more than the required 6 months old."
- **Success criteria:** Every issue is caught here, before submission, never at the government counter.
- **Failure scenarios:** A defect is missed here and discovered later by a human officer, costing the citizen a second trip — the single most damaging failure mode in the entire journey.

### Stage 6 — Submission
- **Goal:** The verified, complete case is formally submitted to the responsible agency.
- **Citizen emotion:** Relief, mixed with a need for reassurance that submission actually happened and was received correctly.
- **Pain points:** Not knowing whether submission succeeded; unclear what happens next or how long it will take.
- **Expected AI behavior:** Confirm submission explicitly, state a realistic timeline, and explain exactly what the citizen should expect to happen next.
- **Success criteria:** The citizen knows, without asking, that submission worked and what "normal" looks like from here.
- **Failure scenarios:** Ambiguous confirmation that leaves the citizen unsure whether to follow up or wait.

### Stage 7 — Processing & Waiting
- **Goal:** The case moves through government review while the citizen waits.
- **Citizen emotion:** This stage is emotionally quiet by nature, but anxiety returns sharply if time passes without any signal.
- **Pain points:** Silence that is indistinguishable from something having gone wrong.
- **Expected AI behavior:** Proactive status visibility and timely reminders — the citizen should never have to wonder whether they've been forgotten.
- **Success criteria:** The citizen always knows the current status without needing to ask.
- **Failure scenarios:** A request for additional information arrives without warning and without an easy path to respond; silence past the expected timeline with no explanation.

### Stage 8 — Resolution & Completion ("My case is completed")
- **Goal:** The citizen receives the outcome — approval and the resulting document, or a clearly explained alternative path if not approved.
- **Citizen emotion:** Closure — this stage must feel definitively finished, not ambiguously "probably done."
- **Pain points:** Not knowing what to do with the outcome next (where to collect a physical document, whether any follow-on action is required).
- **Expected AI behavior:** Confirm completion explicitly, explain any immediate next steps (collection, related procedures now unlocked), and close the case cleanly in the citizen's view.
- **Success criteria:** The citizen leaves with a completed outcome and total clarity about anything left to do.
- **Failure scenarios:** The case lingers in an ambiguous "probably done" state; a rejection is delivered without a clear explanation of what to do differently.

---

## 2. Universal AI Workflow

This is the internal reasoning pipeline that powers all eight citizen-journey stages above. It is universal across every procedure; only the *content* each step operates on (which legal sources, which checklist, which eligibility rules) changes per procedure.

### Step 1 — Citizen Goal
- **Purpose:** Capture what the citizen is actually trying to accomplish, in their own words.
- **Inputs:** Raw citizen utterance.
- **Outputs:** A plain-language goal statement.
- **Decision rules:** No classification is attempted yet — this step only captures, it does not interpret.
- **Possible failures:** Prematurely forcing the citizen's words into a bureaucratic category before understanding the actual goal.
- **Recovery strategy:** If the goal is too vague to act on ("I need help with paperwork"), ask one open, non-technical question to narrow it.

### Step 2 — Intent Recognition
- **Purpose:** Determine what kind of interaction this is — a new case, a continuation of an existing case, a status question, or something outside the system's scope.
- **Inputs:** The captured goal, active case list for this citizen.
- **Outputs:** An intent classification.
- **Decision rules:** If the goal plausibly matches an existing open case, prefer continuity over starting a new one.
- **Possible failures:** Treating a follow-up question as a brand-new case, losing context.
- **Recovery strategy:** When ambiguous, ask directly: "Is this about your existing [procedure] case, or something new?"

### Step 3 — Procedure Discovery
- **Purpose:** Identify which official procedure (or combination) matches the citizen's goal.
- **Inputs:** The goal, intent classification, known citizen profile facts.
- **Outputs:** A matched procedure identifier, or a ranked set of candidates.
- **Decision rules:** A single clean match proceeds; multiple plausible matches or zero matches both require clarification, never a silent best guess.
- **Possible failures:** Selecting a plausible-sounding but incorrect procedure.
- **Recovery strategy:** Present the top candidate(s) in plain language and let the citizen confirm before proceeding.

### Step 4 — Eligibility Verification
- **Purpose:** Confirm the citizen actually qualifies for the discovered procedure under current law.
- **Inputs:** Procedure identifier, citizen-provided facts, legal eligibility rules for that procedure.
- **Outputs:** An eligibility verdict (eligible / not eligible / conditionally eligible pending a specific fact) with reasoning.
- **Decision rules:** Eligibility is evaluated deterministically against the rule set for that procedure — never inferred loosely by pattern-matching against similar cases.
- **Possible failures:** Declaring eligibility on incomplete information.
- **Recovery strategy:** If a required eligibility fact is unknown, ask for it specifically rather than assuming a default.

### Step 5 — Requirement Collection
- **Purpose:** Determine the exact set of information and conditions this specific citizen's case must satisfy.
- **Inputs:** Procedure identifier, eligibility verdict, procedure's requirement rule set.
- **Outputs:** A structured requirement list scoped to this citizen (not the generic procedure requirement list).
- **Decision rules:** Requirements are filtered by the citizen's actual circumstances (e.g., mixed-nationality marriage pulls in additional requirements a domestic case doesn't need).
- **Possible failures:** Presenting the full generic requirement list instead of the personalized subset, overwhelming the citizen with irrelevant items.
- **Recovery strategy:** When a requirement's applicability is unclear, ask the one clarifying question needed to resolve it rather than including it defensively.

### Step 6 — Document Collection
- **Purpose:** Guide the citizen through gathering and submitting the physical or digital documents the requirement list calls for.
- **Inputs:** The requirement list, citizen document uploads.
- **Outputs:** A set of received documents, tracked against the requirement list.
- **Decision rules:** Documents are accepted for processing as soon as submitted; nothing is silently deferred without the citizen knowing.
- **Possible failures:** Losing track of which documents have and have not yet been received.
- **Recovery strategy:** Always reflect current collection status back to the citizen so nothing is submitted twice or missed.

### Step 7 — Document Validation
- **Purpose:** Confirm every submitted document is genuine, legible, current, and actually matches what was requested.
- **Inputs:** Submitted documents, requirement list.
- **Outputs:** A per-document validity status with specific defect descriptions where relevant.
- **Decision rules:** A document is only marked valid when it can be positively confirmed to meet its requirement — the default state for an unclear document is "needs review," never "assumed fine."
- **Possible failures:** Accepting a low-quality scan or a subtly wrong document as valid.
- **Recovery strategy:** Request a specific, named correction ("please re-upload a clearer photo of the back of your ID card") rather than a generic rejection.

### Step 8 — Legal Validation
- **Purpose:** Confirm the entire case, as assembled so far, actually satisfies current law for this procedure and this citizen's specific circumstances.
- **Inputs:** Procedure identifier, eligibility verdict, validated documents, current legal source set.
- **Outputs:** A legal sufficiency verdict with citations.
- **Decision rules:** No legal claim proceeds without a traceable, current citation; conflicting or stale sources block progress rather than being resolved by assumption.
- **Possible failures:** Proceeding on an outdated legal basis.
- **Recovery strategy:** When legal sources conflict or are stale, this step routes directly to escalation — it does not attempt to reason its way past a genuine legal gap.

### Step 9 — Risk Detection
- **Purpose:** Identify anything about this case likely to cause rejection, delay, or require special scrutiny.
- **Inputs:** The full case bundle assembled so far.
- **Outputs:** A risk assessment with named factors, not just a score.
- **Decision rules:** Risk factors are surfaced for review; they are never used to make an accusation directly to the citizen.
- **Possible failures:** Suppressing a real risk factor to avoid friction, or conversely raising unfounded suspicion that damages trust.
- **Recovery strategy:** Ambiguous risk signals are escalated for human judgment rather than resolved automatically in either direction.

### Step 10 — Missing Information Detection
- **Purpose:** Identify any gap remaining between what's been collected/validated and what full completion actually requires.
- **Inputs:** Requirement list, document validation results, eligibility verdict.
- **Outputs:** An explicit gap list, or confirmation that no gaps remain.
- **Decision rules:** "No gaps" is only ever stated when every requirement has been positively confirmed — never inferred from the absence of a flagged problem.
- **Possible failures:** Declaring completeness prematurely.
- **Recovery strategy:** Any doubt about completeness defaults to listing the item as still open, not closed.

### Step 11 — Personalized Checklist
- **Purpose:** Present the citizen with one clear, complete, prioritized checklist reflecting exactly where their case stands.
- **Inputs:** All outputs from Steps 4–10.
- **Outputs:** A checklist the citizen can act on directly.
- **Decision rules:** The checklist reflects only what's actually still needed — completed items are shown as completed, not repeated.
- **Possible failures:** A stale checklist that doesn't reflect the latest validation results.
- **Recovery strategy:** The checklist is regenerated from current state every time it's shown, never cached past a state change.

### Step 12 — Submission Recommendation
- **Purpose:** Determine whether the case is actually ready to be formally submitted.
- **Inputs:** The checklist, legal validation verdict, risk assessment.
- **Outputs:** A submit / do-not-submit-yet recommendation with the specific reason if not ready.
- **Decision rules:** Submission is recommended only when every checklist item is resolved and no unresolved legal or risk flag remains.
- **Possible failures:** Recommending submission with an unresolved gap, leading to a preventable rejection.
- **Recovery strategy:** When in doubt, the default is "not yet ready" — a false negative here costs a few extra minutes; a false positive costs a wasted submission.

### Step 13 — Timeline Generation
- **Purpose:** Give the citizen a realistic expectation of how long each remaining stage will take.
- **Inputs:** Procedure's standard processing time, current agency/jurisdiction parameters, case-specific factors (e.g., expedited eligibility).
- **Outputs:** A dated, stage-by-stage timeline.
- **Decision rules:** Timelines are stated as ranges grounded in actual agency data, never invented to sound reassuring.
- **Possible failures:** An optimistic timeline that doesn't hold, damaging trust more than a longer, accurate one would have.
- **Recovery strategy:** When actual processing time diverges from the generated timeline, the timeline is updated and the citizen is told why.

### Step 14 — Progress Tracking
- **Purpose:** Maintain and surface the case's real-time position in its lifecycle.
- **Inputs:** Case state updates from the submitting agency or officer actions.
- **Outputs:** A current status visible to the citizen at any time.
- **Decision rules:** Status is only ever reported from confirmed state changes — never inferred or estimated as if it were confirmed fact.
- **Possible failures:** Displaying a status that hasn't actually been confirmed by the responsible agency.
- **Recovery strategy:** When the true status is unknown, the system says "still being processed, last confirmed update was [date]" rather than guessing progress.

### Step 15 — Reminder
- **Purpose:** Proactively surface anything time-sensitive the citizen needs to act on.
- **Inputs:** Deadlines, requests for additional information, upcoming expirations.
- **Outputs:** A timely, channel-appropriate notification.
- **Decision rules:** Reminders are sent with enough lead time to actually act, and are not repeated so often that they get ignored.
- **Possible failures:** A reminder that arrives too late to be useful, or so frequently it trains the citizen to dismiss it.
- **Recovery strategy:** Reminder cadence is tied to actual urgency, escalating in frequency only as a real deadline approaches.

### Step 16 — Case Completion
- **Purpose:** Formally and clearly close the case once an outcome is reached.
- **Inputs:** Final outcome from the responsible agency (approved, rejected, or otherwise resolved).
- **Outputs:** A completion confirmation and any immediate next steps (collection, follow-on procedures).
- **Decision rules:** A case is only marked complete when a definitive outcome has actually been confirmed — never based on the passage of time alone.
- **Possible failures:** Leaving a case in limbo after the real-world outcome already happened.
- **Recovery strategy:** If completion status cannot be confirmed within the expected timeline, this itself becomes a tracked follow-up item, not a silently stale case.

---

## 3. Workflow Principles

These are non-negotiable properties of the workflow, independent of which procedure is running through it.

- **Never skip steps.** Every case passes through every step in order; a step can conclude quickly when its answer is trivial, but it is never bypassed.
- **Never guess.** Where a step's required input is unknown, the workflow asks or escalates — it does not substitute an assumption to keep moving.
- **Never hallucinate.** No step produces a legal, eligibility, or completeness claim that isn't grounded in an actual retrieved rule, document, or confirmed status.
- **Always verify.** Every document, every eligibility fact, every legal claim is checked against its authoritative source before being relied upon — nothing is accepted at face value.
- **Always explain.** Every decision the workflow makes is accompanied by a plain-language reason a citizen can actually understand.
- **Always cite legal sources.** Any claim about what the law requires carries a named, dated source.
- **Always know the next action.** At every point in the journey, the citizen (and the system) can state exactly what happens next — the workflow never leaves a case in an undefined state.

---

## 4. Workflow State Machine

Thirteen states describe the position of any case, for any procedure, at any time.

### Draft
- **Entry condition:** A citizen has expressed a goal and a procedure has been tentatively identified, but eligibility has not yet been confirmed.
- **Exit condition:** Eligibility is confirmed (→ Preparing) or the citizen abandons before eligibility is resolved (→ Archived).
- **Allowed transitions:** → Preparing, → Archived.
- **Forbidden transitions:** → Submitted, → Approved, → Rejected (nothing may be decided on an unconfirmed case).

### Preparing
- **Entry condition:** Eligibility confirmed; the personalized requirement list has been generated.
- **Exit condition:** All required information beyond documents has been collected (→ Waiting Documents), or the citizen pauses (→ Waiting Citizen).
- **Allowed transitions:** → Waiting Documents, → Waiting Citizen, → Archived.
- **Forbidden transitions:** → Ready To Submit (documents must exist first), → Under Review.

### Waiting Citizen
- **Entry condition:** The workflow requires an input only the citizen can provide (an answer, a decision, a document) and none has arrived within the expected window.
- **Exit condition:** The citizen responds (→ back to the state that was active before waiting began) or the case is inactive long enough to be archived per retention policy (→ Archived).
- **Allowed transitions:** → Preparing, → Waiting Documents, → Archived.
- **Forbidden transitions:** → Submitted, → Under Review (a case cannot silently progress while genuinely waiting on the citizen).

### Waiting Documents
- **Entry condition:** The requirement list is finalized but one or more required documents have not yet been received or validated.
- **Exit condition:** All documents are received and pass validation (→ Ready To Submit), or a document is confirmed unobtainable, requiring re-planning (→ Preparing).
- **Allowed transitions:** → Ready To Submit, → Preparing, → Waiting Citizen.
- **Forbidden transitions:** → Submitted (submission cannot occur while documents remain outstanding).

### Ready To Submit
- **Entry condition:** Every checklist item is validated, legal validation passed, and no unresolved risk flag remains.
- **Exit condition:** The citizen confirms submission (→ Submitted), or a late-arriving change (a new document defect, a law update) invalidates readiness (→ Preparing or → Waiting Documents).
- **Allowed transitions:** → Submitted, → Preparing, → Waiting Documents.
- **Forbidden transitions:** → Approved, → Rejected (no outcome exists yet — this state only reflects internal readiness).

### Submitted
- **Entry condition:** The case has been formally sent to the responsible agency.
- **Exit condition:** The agency begins active review (→ Under Review).
- **Allowed transitions:** → Under Review.
- **Forbidden transitions:** → Draft, → Preparing (a submitted case does not revert to pre-submission states; corrections from this point happen through Need More Information, not by rewinding).

### Under Review
- **Entry condition:** The responsible agency or officer has begun evaluating the submitted case.
- **Exit condition:** A decision is reached (→ Approved or → Rejected), additional information is required (→ Need More Information), or the reviewing officer flags something requiring escalation (→ Escalated).
- **Allowed transitions:** → Need More Information, → Escalated, → Approved, → Rejected.
- **Forbidden transitions:** → Preparing, → Draft.

### Need More Information
- **Entry condition:** The reviewing agency has requested something additional from the citizen after submission.
- **Exit condition:** The citizen supplies the requested information and it is validated (→ Under Review).
- **Allowed transitions:** → Under Review, → Escalated (if the request goes unanswered past a defined window or reveals a new complication).
- **Forbidden transitions:** → Approved, → Rejected (a decision cannot be reached while information is actively outstanding).

### Escalated
- **Entry condition:** Any human-in-the-loop trigger fires (see §7) — legal ambiguity, risk flag, citizen request, novel situation, or repeated failure.
- **Exit condition:** A human officer resolves the escalation, returning the case to whichever state is appropriate given their resolution (→ Under Review, → Need More Information, → Approved, → Rejected).
- **Allowed transitions:** → Under Review, → Need More Information, → Approved, → Rejected.
- **Forbidden transitions:** None inherently forbidden — escalation is a judgment checkpoint, not a dead end, and a human officer may direct the case to whichever next state is correct.

### Approved
- **Entry condition:** The responsible agency has issued a positive final decision.
- **Exit condition:** Completion formalities (document issuance, collection) conclude (→ Completed).
- **Allowed transitions:** → Completed.
- **Forbidden transitions:** → Under Review, → Rejected (a final decision does not reopen without a formal separate process, which would be modeled as a new case, not a state reversal).

### Rejected
- **Entry condition:** The responsible agency has issued a negative final decision.
- **Exit condition:** The citizen is informed with the specific reason and any available appeal or reapplication path (→ Completed, marking this journey's endpoint), or a new corrected case is started (→ new Draft, a distinct case, not a reopening of this one).
- **Allowed transitions:** → Completed.
- **Forbidden transitions:** → Approved, → Under Review.

### Completed
- **Entry condition:** A final outcome (approved or rejected) has been confirmed and communicated, and any immediate follow-up actions are resolved.
- **Exit condition:** The case moves to archival per retention policy (→ Archived).
- **Allowed transitions:** → Archived.
- **Forbidden transitions:** Any transition back into an active state — a completed case is immutable going forward; anything new is a new case.

### Archived
- **Entry condition:** Retention policy triggers archival of a completed or abandoned case.
- **Exit condition:** None during normal operation — archival is a terminal state, retained for audit and citizen-history purposes.
- **Allowed transitions:** None.
- **Forbidden transitions:** All — an archived case is never reactivated; a citizen who needs the same procedure again starts a new case, which may reference the archived one for prior context but does not resurrect it.

---

## 5. Exception Handling

| Exception | Workflow Reaction |
|---|---|
| **Citizen uploads the wrong document** | Document Validation flags the mismatch specifically (what was expected vs. what was received); state remains Waiting Documents; the citizen is told exactly what to upload instead, never just "invalid." |
| **Citizen uploads a blurry image** | Document Validation reports a quality failure distinct from a content failure; the citizen is asked for a re-upload with specific guidance (lighting, framing); this does not count as a wrong-document failure. |
| **Citizen changes their mind about the procedure** | Treated as a new Procedure Discovery pass; the current Draft/Preparing case is either updated in place (if truly the same underlying need) or archived and a new case started, always with the citizen's explicit confirmation of which. |
| **Citizen stops responding** | The case remains in Waiting Citizen; the Reminder step handles proportionate, non-intrusive follow-up; after a policy-defined inactivity period, the case moves to Archived without penalty — nothing is auto-submitted or auto-rejected due to silence. |
| **The relevant law changes mid-case** | Legal Validation is re-run against the updated legal source before the case is allowed to proceed to Ready To Submit; if the change affects an already-Submitted or Under Review case, this is surfaced as a flag for the reviewing officer, not silently absorbed. |
| **The system becomes unavailable** | No state transition is ever assumed to have happened during an outage; upon recovery, the workflow reconciles from the last confirmed state and communicates any delay transparently to the citizen rather than presenting a falsely current status. |
| **An officer intervenes directly** | Officer actions are first-class state transitions, logged identically to AI-driven ones; the workflow treats officer judgment as authoritative and does not attempt to "correct" it. |
| **A duplicate case is detected** (the same citizen, same procedure, already has an open case) | The workflow surfaces the existing case rather than creating a second one; if the citizen genuinely needs a second instance (e.g., a second business registration), this requires explicit confirmation that it is intentional. |
| **Fraud is suspected** | Risk Detection raises the flag to a human officer through Escalated; the AI never states a fraud accusation to the citizen directly, and the case does not proceed to Submitted while the flag is open. |

---

## 6. Government Workflow Rules

Different agencies, provinces, and regulations are handled as **parameters to one workflow**, never as separate workflows.

- **Different agencies** are represented as the *responsible party* parameter on a procedure definition — the same Submission, Under Review, and Progress Tracking steps apply regardless of which agency is on the receiving end; only the destination and its specific status vocabulary differ.
- **Different provinces** are represented as *jurisdiction* parameters affecting which local office handles the case, which local-level forms or supplementary rules apply, and which processing-time figures are realistic — the workflow steps themselves do not change per province.
- **Different regulations** are handled entirely inside Legal Validation and Eligibility Verification, which consult the legal source set scoped to the applicable jurisdiction and procedure — the surrounding workflow has no awareness of *which* law it's checking, only that checking must happen and must cite its source.
- **Different processing times** are a Timeline Generation input, not a workflow variant — the same step produces a different, accurately parameterized answer depending on the procedure and jurisdiction, rather than requiring a different timeline-handling mechanism per case type.

The universal workflow's power is precisely that an engineer adding province number sixty-four, or agency number thirty, never touches the workflow itself — only its configuration.

---

## 7. Human-in-the-loop

- **When AI continues** — every step where its required input is available, its confidence is above threshold, and the applicable rules are deterministic or clearly cited. This is the default path for the large majority of well-defined, common cases.
- **When AI asks** — whenever a specific, answerable piece of information is missing and obtaining it from the citizen is the fastest, most respectful path to progress (see Workflow Constitution §2, Steps 4–6 especially).
- **When AI waits** — after asking, or after submission, whenever the next required input must come from the citizen or from the responsible agency, and no further internal reasoning can substitute for that wait. The workflow makes waiting visible (Waiting Citizen, Under Review) rather than silent.
- **When AI stops** — whenever continuing would require guessing at a legal interpretation, an eligibility judgment, or a document's authenticity that cannot be verified with confidence. Stopping here means routing to escalation, not producing a best-effort answer anyway.
- **When AI escalates** — legal ambiguity or conflict, risk flags above threshold, explicit citizen request for a human, novel/unclassified situations, vulnerable-citizen indicators, cross-jurisdiction or multi-party legal complexity, and repeated unresolved failure loops — the same canonical trigger list defined in `AI_OPERATING_SYSTEM.md` §9, applied here at the workflow-state level (entry into Escalated).
- **When government officers take control** — the moment a case enters Escalated, and permanently for the act of final decision at Under Review → Approved/Rejected, regardless of how confident the AI's own assessment was. The AI's role at that boundary is to have prepared the clearest possible case for the officer to decide quickly and correctly — never to have decided in advance and merely sought a rubber stamp.

---

## 8. Citizen Experience

| Stage | What the citizen sees | What the citizen feels | What the citizen should do next |
|---|---|---|---|
| Need Emerges | A simple, welcoming prompt to describe their situation in their own words | Uncertain, slightly anxious | Just describe what's going on — no need to know the official term |
| Orientation | The identified procedure, explained plainly, with a rough sense of effort and time | Reassured that this is a known, bounded task | Confirm this matches their situation |
| Engagement | A short, purposeful set of eligibility questions | Cooperative, mildly curious why each question is asked | Answer honestly; ask if anything is unclear |
| Preparation | A complete, personalized checklist, with the hardest-to-obtain items flagged first | Motivated, sometimes daunted by the hardest item | Start with the flagged, slow-to-obtain items |
| Readiness Verification | Specific, itemized feedback on each submitted document | Suspense, then relief or clear direction to fix something specific | Correct any flagged item exactly as described |
| Submission | An explicit confirmation that submission succeeded, with a timeline | Relief, cautious optimism | Wait, and expect updates at the stated cadence |
| Processing & Waiting | Current status, last-updated date, and next expected update | Calm as long as visibility continues; anxious if it stops | Respond promptly if additional information is requested |
| Resolution & Completion | A definitive outcome statement and any immediate next step | Closure — resolved either way, never left wondering | Follow the stated next step (collect a document, or pursue an explained alternative) |

---

## 9. Officer Experience

| Stage the case is in when it reaches an officer | What officers see | What officers review | What AI summarizes | What AI recommends |
|---|---|---|---|---|
| Under Review | The complete, validated case bundle: citizen facts, validated documents, legal basis applied | Whether the AI's eligibility and document conclusions hold up against the officer's own judgment and any information the AI could not access | A concise case summary: what was checked, what passed, what (if anything) was borderline | Whether the case appears ready for approval, with reasoning, not just a verdict |
| Escalated | Everything from Under Review, plus the specific escalation reason and confidence level that triggered the handoff | The exact point of uncertainty or conflict the AI could not resolve on its own | A context package built specifically so the officer never has to ask the citizen to repeat anything already provided | A recommended resolution path where one is available, clearly labeled as a suggestion, not a decision already made |
| Need More Information (post-request) | The citizen's newly supplied response, alongside the original request | Whether the new information actually resolves the original request | What changed since the request was made | Whether review can now proceed or another round is needed |
| Any stage, on demand | Full audit trail of every AI action and decision on the case | Anything the officer wants to independently verify | Nothing withheld — the summary is a convenience, not a gate on access to the underlying record | N/A — officers can always go straight to the raw record instead of the AI's summary |

The constant rule across every row: **the AI prepares and recommends; it never presents its own conclusion as though it were already the decision.**

---

## 10. Future Evolution

The universal workflow is designed so that growth happens through configuration, not redesign.

- **New procedures** are added by defining a new procedure configuration — its eligibility rules, its personalized checklist logic, its legal source set, its responsible agency and jurisdiction parameters. None of the sixteen workflow steps or thirteen states change; only their inputs do.
- **New ministries or agencies** are added as new *responsible party* and *jurisdiction* parameter values. The Submission, Progress Tracking, and Government Workflow Rules layer (§6) already treat "which agency" as a variable, not a structural assumption.
- **New laws** update the legal source set that Legal Validation and Eligibility Verification consult, with staleness and versioning already handled by the Trust Layer defined in `AI_OPERATING_SYSTEM.md`. A law changing does not require a workflow change — only a legal-memory update.
- **New AI Agents** — should the mind (`AI_OPERATING_SYSTEM.md`) evolve to include additional specialized agents — plug into existing workflow steps as new contributors to Document Validation, Risk Detection, or any other step, without altering the step's place in the sixteen-step sequence or the states it can transition between.

**The platform's future-proofing is precisely this separation:** the *shape* of the citizen's journey, defined once in this constitution, is permanent. Everything that changes as Vietnam's administrative landscape evolves — new procedures, new agencies, new laws, new agents — changes underneath that shape, as configuration and content, never as a rewrite of the journey itself.

---

## Closing Note

This document, together with `AI_OPERATING_SYSTEM.md`, forms the complete constitutional layer of the Citizen AI Case Manager. `AI_OPERATING_SYSTEM.md` governs how the system thinks; `WORKFLOW_CONSTITUTION.md` governs the journey it carries every citizen through. Every future procedure definition, every new agent, every workflow-engine implementation is an instantiation of what is written here — not a reinterpretation of it.
