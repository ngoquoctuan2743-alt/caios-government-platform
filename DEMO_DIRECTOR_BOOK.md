# DEMO_DIRECTOR_BOOK.md
### CAIOS — Vietnam AI Innovation Challenge — Demo Director Book
**Format:** A screenplay, not a specification. Every timestamp below assumes a single unbroken take of the MVD flow (`MVD_IMPLEMENTATION_PLAN.md`), total runtime **3:50**, leaving buffer inside the 3–5 minute window for a breath and applause.
**Directing principle:** the audience should never be looking at a form. They should always be looking at a person's problem, dissolving.

---

## Master Timeline (at a glance)

| Time | Beat |
|---|---|
| 0:00–0:20 | Opening Scene — the cold open |
| 0:20–0:40 | Transition — meet Mai |
| 0:40–1:10 | Conversation & AI Recognition |
| 1:10–1:40 | Legal Citation Reveal |
| 1:40–2:05 | Checklist Generation |
| 2:05–2:35 | Missing Document Detection — the surprise |
| 2:35–2:55 | Citizen Confirms — handoff to officer |
| 2:55–3:25 | Officer Approval Scene |
| 3:25–3:45 | Case Completion |
| 3:45–3:50 | Final Impact Message |

---

## 1. Opening Scene

**What the audience sees:** black screen. No logo yet. A single line of text fades in, centered, small:

> *"Every year, millions of Vietnamese citizens make a trip to a government office — only to be told something is missing."*

Hold for two full seconds of silence. Then, a second line fades in beneath it:

> *"We think that trip should never happen."*

Cut to black. Logo fades in: **CAIOS**. Hold one second. Cut to the live application.

**Why:** the audience needs to feel the cost of the status quo in their own body — the mild dread of a wasted trip — before they're shown a single pixel of the product. This is the TED-talk opening: state the human stakes before the solution.

## 2. Narration Script

*(Presenter speaks over the Opening Scene and every beat after. Exact words below; pauses marked with `//`.)*

**[0:00]** *"Every year, millions of Vietnamese citizens make a trip to a government office // only to be told something is missing."*

**[0:12]** *"We think that trip should never happen. // This is CAIOS — a public service AI that prepares a citizen's case before they ever leave home."*

**[0:20]** *"Meet Mai. Her Citizen ID renews next month. Watch what happens when she just... asks."*

**[0:40]** *(Mai types; let it play out, narration pauses here — silence is allowed while the audience reads.)*

**[1:05]** *"Notice what it didn't do. It didn't guess. It checked."*

**[1:10]** *"And here's the part that matters most."* **(Citation reveal beat — pause fully, let the citation render, then:)** *"Every claim this system makes is tied to the actual law — Decree 59, Article 21 — not a plausible-sounding sentence. If it can't find the source, it will tell you it doesn't know. It will never guess."*

**[1:40]** *"Now it builds Mai's checklist — personalized to her, not a generic form."*

**[2:05]** *"She tells it what she already has."* **(Missing-document beat)** *"...and it catches the gap immediately. Not at the counter. Right now, before she's wasted a single trip."*

**[2:35]** *"Her case is ready. It goes to a real officer — because this system never makes the final decision. A person does."*

**[2:55]** *"Watch how fast an officer can move when the case arrives already verified."*

**[3:25]** *"Approved. Mai sees it the moment it happens."*

**[3:45]** *"This isn't a chatbot. It's a case manager that never sleeps, never guesses, and never lets a citizen walk away without knowing exactly what happens next. // This is what public service can feel like."*

## 3. Screen Timeline (second-by-second)

- **0:00–0:12** — black screen, two lines of text (see §1).
- **0:12–0:20** — logo card, then cut to the citizen login screen, already authenticated (skip credential entry live — start on the dashboard to protect pacing).
- **0:20–0:40** — dashboard, empty state ("You don't have any open cases yet"), cursor moves to a clearly-labeled "Start a new case" entry point, click, Conversation screen opens.
- **0:40–0:55** — citizen types: *"Hi, my ID card expires next month, what do I need to do?"* — typed at natural human speed, not pasted instantly.
- **0:55–1:05** — AI "thinking" indicator (three-dot pulse, 2.5–3 seconds — see §4/§7).
- **1:05–1:10** — AI response begins rendering: recognizes ID Card Renewal, confirms eligibility in one clean sentence.
- **1:10–1:40** — the response continues into the cited legal basis; a **citation badge** animates in distinctly from the surrounding text (see §12).
- **1:40–2:05** — checklist card slides/fades in below the conversation, three items appearing one at a time, ~300ms stagger each.
- **2:05–2:20** — citizen clicks a simple confirmation control per item ("I have this" / "I don't have this yet") — for two items, "I have this"; for the photo item, "I don't have this yet."
- **2:20–2:35** — **Missing Document Alert** animates in immediately (no thinking delay here — this must feel instantaneous, see §7) with a warm but clear callout and a concrete next step.
- **2:35–2:55** — citizen clicks "Submit what I have," screen transitions to a brief confirmation state, then cut to the Officer Queue.
- **2:55–3:10** — officer queue shown with Mai's case at the top, clearly flagged as newly arrived and fully prepared; officer clicks in.
- **3:10–3:25** — Officer Case Review screen: citation, checklist status, and eligibility already visible without scrolling; officer clicks **Approve**.
- **3:25–3:35** — brief, satisfying confirmation animation (checkmark, not confetti — see §4).
- **3:35–3:45** — cut back to Mai's case page: completion banner, clear statement of next step (where/how to collect the physical card).
- **3:45–3:50** — final impact message card (see §14), logo, hold.

## 4. Animation Timing

- **Typing indicator:** three dots, gentle pulse, 2.5–3.0 seconds max — long enough to read as "thinking," never long enough to read as "loading."
- **Citation badge:** does not appear with the rest of the text — it animates in **0.4 seconds after** the sentence that introduces it finishes rendering, with a subtle highlight-glow (not a bounce, not a flash) — the delay is what makes it register as a distinct, deliberate claim rather than decorative text.
- **Checklist items:** stagger-fade-in, 300ms apart, top to bottom — fast enough not to drag, slow enough to count as three distinct things being prepared for her.
- **Missing Document Alert:** appears with zero delay the instant the citizen marks the photo as "don't have" — this is the one place in the entire demo where speed itself is the message.
- **Officer Approve confirmation:** a single clean checkmark draw-on animation, 600ms, no sound effect, no confetti — the tone here is competence, not celebration.
- **Completion banner:** fades in over 500ms with a soft background tint shift (not a hard cut) so it reads as resolution, not just another screen.

## 5. Mouse Movements

- Move deliberately and slowly at all times — a fast, darting cursor reads as nervous; a slow, confident cursor reads as a system (and a presenter) that already knows the outcome.
- Before every click, pause the cursor on the target for a full half-second before clicking — this gives the audience's eye time to arrive at the same point before the action happens.
- During the citation reveal (1:10–1:40), do not touch the mouse at all — hands off, let the audience read without a moving cursor competing for attention.
- During the Missing Document Alert (2:05–2:35), move the cursor to hover just above the alert as it appears, then click through immediately — this visually "catches" the alert the instant it lands, reinforcing the speed of the detection.
- During the Officer Approve click (3:10–3:25), pause noticeably longer than usual (a full second) before clicking — this is the moment a human being makes a real decision, and the pacing should feel weightier than every automated step before it.

## 6. Camera Focus

*(For a screen recording or live-mirrored demo, "camera" = deliberate zoom/crop of the shared screen, not a physical camera.)*

- **0:00–0:20:** full black/text, no application visible — no camera movement, this is pure narrative.
- **0:20–1:05:** standard full-screen view of the browser — establish the real product before zooming into anything.
- **1:10–1:40 (citation reveal):** slow zoom into the citation badge specifically — this is the single most important visual beat in the demo and should occupy the most screen real estate at its peak.
- **2:05–2:35 (missing document):** zoom to the checklist + alert region, tight enough that the alert's exact wording is legible from the back of the room.
- **3:10–3:25 (officer approval):** zoom to the officer screen's citation/checklist summary plus the Approve button together in one frame — the point is to show the officer isn't approving blind, they're approving a visibly complete case.
- **3:45–3:50:** pull back to full screen, then to the logo card — end wide, the way you began.

## 7. AI Response Timing

- **First AI turn (0:55–1:10):** ~2.5–3s "thinking" delay before any text appears, then the response renders progressively (not all at once) over roughly 20–25 seconds including the citation. This is the demo's one moment where deliberate latency is a feature — instant would read as canned; this pacing reads as reasoning happening live.
- **Missing Document detection (2:05–2:35):** **zero perceptible delay.** This is the one response that must feel instantaneous, because the entire emotional point of this beat is "caught before you even finished telling it" — any thinking indicator here would undercut the message.
- **Officer approval (3:10–3:25):** instantaneous system response to the officer's click — the officer's own pause (§5) provides all the weight this moment needs; the system should never appear to make the officer wait.

## 8. Audience Emotional Curve

```
Curiosity ──► Recognition ──► Delight ──► Concern ──► Relief ──► Confidence ──► Trust ──► Satisfaction
  (0:00)        (0:40)         (1:10)      (2:05)      (2:20)      (2:55)       (3:10)     (3:45)
```

- **0:00–0:20 (Curiosity):** the cold open creates a question — what's the solution to this familiar frustration?
- **0:40–1:05 (Recognition):** "oh, it actually understood what she meant" — the first small win.
- **1:10–1:40 (Delight):** the citation reveal — audiences do not expect a demo to show its legal homework; this is a genuine surprise (see §10).
- **2:05–2:20 (Concern):** a deliberate, brief dip — the audience realizes she's missing something, and for one beat feels the old anxiety of "here we go, this is where it goes wrong."
- **2:20–2:35 (Relief):** the alert lands immediately — the dip resolves faster than the audience expects, which is what makes it land as delight-on-top-of-relief rather than just relief.
- **2:55–3:10 (Confidence):** watching the officer move fast builds confidence the system isn't just citizen-facing theater — it visibly helps the government side too.
- **3:10–3:45 (Trust → Satisfaction):** the human approval, then the clean completion, resolve the entire arc — the audience leaves on resolution, not on a cliffhanger.

## 9. Judge Attention Points

Judges are not a general audience — assume at least one is actively looking for the seams. Design for that scrutiny rather than hoping it doesn't happen:

- **The citation (1:10–1:40)** — judges with any legal or policy background will check whether this is a real, specific citation or a vague gesture at "the law." It must be specific (law name, article) every time.
- **The instant missing-document catch (2:05–2:35)** — a technically sharp judge will ask "is that hard-coded for this specific demo case?" Be ready to answer honestly in Q&A (§15) — yes, for this MVD, the checklist logic is deterministic and scoped to this one procedure; that is disclosed, not hidden.
- **The officer's actual authority (3:10–3:25)** — judges evaluating for responsible AI will specifically look for whether the system waits for a real human action or merely displays one. Make sure the Approve click is visibly a real, clickable action with a real state change, not a video cutaway.
- **The audit trail (mention in Q&A, not in the live demo unless asked)** — have it ready to show on request: every step above wrote an audit event.

## 10. Moments of Surprise

Three, deliberately spaced so they don't crowd each other:

1. **The citation reveal (1:10)** — the audience does not expect a demo to cite real law with an article number; most AI demos gesture vaguely at "compliance." This is the first "wait, it actually did that?" moment.
2. **The instant missing-document catch (2:20)** — surprising specifically because of its *speed* relative to the first AI turn's deliberate pacing — the contrast itself is the surprise.
3. **The officer's approval speed (3:10–3:25)** — the audience, having just watched an AI take its time reasoning, doesn't expect the human step to be the fast one; it subverts the expectation that "human review" means "slow," which is exactly the point this project makes about officers spending less time on routine verification.

## 11. Trust Moments

Explicitly staged, not incidental:

- The citation, shown with its source, every time a legal claim is made (1:10).
- The AI's own stated limitation in narration — *"if it can't find the source, it will tell you it doesn't know. It will never guess"* (1:10 narration) — trust built by stating the boundary out loud, not just implying it.
- The visible, named human officer taking the actual approving action (3:10–3:25) — trust built by showing, not asserting, that a person decides.
- The completion banner's clarity about what happens next (3:35–3:45) — trust built by never ending on ambiguity.

## 12. Legal Citation Reveal

This is the demo's centerpiece and deserves its own staging note beyond §3/§6/§7: **do not rush it, and do not let it compete with anything else on screen.** No mouse movement (§5), no narration until the badge has fully rendered (§2's `//` pause at 1:10), and the longest sustained camera zoom in the entire demo (§6). Everything else in this screenplay can be executed briskly; this ten-second window is the one place to deliberately slow down.

## 13. Officer Approval Scene

Staged as a *contrast* beat, not a continuation of the citizen-facing energy. Cut cleanly to the officer queue (no lingering transition animation) — the change of scene itself signals "we've moved to a different, equally real part of the system." The officer's screen should be visually calmer/denser than the citizen's (this is a professional tool, not a consumer app), and the pause before the click (§5) is the single most important piece of direction in this beat — resist the temptation to speed it up for time; it's the moment the demo proves its central claim about human authority.

## 14. Final Impact Message

Closing card, held for the full remaining runtime, no narration underneath except the last spoken line:

> **"CAIOS. The future of Vietnamese public service — where no citizen ever finds out something is missing... after it's too late."**

Logo remains on screen through applause and into Q&A transition.

## 15. Q&A Preparation

Anticipated questions and prepared, honest answers — consistent with this project's own standing rule that a Competition demo discloses what isn't built yet, never implies more than is true:

- **"Is the legal citation retrieved dynamically, or hard-coded for this demo?"** — *"For this demo, it's a small, verified dataset scoped to this one procedure — deliberately, so every citation you saw was checked by a person before today. The architecture for full retrieval across the legal corpus is designed [reference System Architecture Specification / Legal Intelligence Constitution] and is the very next milestone."*
- **"What happens if the AI isn't confident?"** — *"It doesn't guess. It escalates to a human officer with everything it does know, so the officer never has to start over — that boundary is structural, not a setting we could turn off."*
- **"Does this replace government officers?"** — *"No — and it's built so it constitutionally can't. It prepares; a person always decides. You watched that happen live."*
- **"How does this scale to hundreds of procedures?"** — *"Every procedure runs through the same workflow engine — adding one is configuration, not new code. Today's demo is deliberately narrow so every claim we made in front of you was one we could stand behind completely."*
- **"What about data privacy and security?"** — *"Citizen identifiers are hashed, not stored raw; every action is on an immutable audit trail; and access is role-based from day one — happy to show the audit log for this exact case if useful."*
- **"What's not built yet?"** — Answer this one plainly and first if asked, without prompting: *"Real-time document OCR, multi-language support, and full-corpus legal retrieval are the next milestones — today's demo shows the reasoning pattern working end-to-end on one real procedure, deliberately, before we scale it."*

---

## Closing Note for the Director

The single instruction that matters more than any other in this book: **never let the audience feel they are watching software being operated.** Every pause, every zoom, every deliberate delay above exists to keep the frame on Mai's problem dissolving and Vietnam's officers doing the part of their job that matters — the interface is the least interesting thing on screen, and it should stay that way for the entire 3:50.
