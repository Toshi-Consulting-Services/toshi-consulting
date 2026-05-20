---
title: "QA team cost India 2026: in-house vs outsourced TCO"
slug: qa-team-cost-india
metaDescription: "QA team cost India, fully loaded: a side-by-side ₹ TCO calculator for in-house vs outsourced QA pods, with SDET, Manual QA & Lead salary benchmarks."
excerpt: "We build the real ₹ TCO for an in-house QA pod against an outsourced retainer — salaries, EPF, tools, recruitment, ramp time, the lot."
category: QA
date: 2026-05-19
author: Toshi Consulting
targetKeyword: qa team cost india
iconName: rocket
tone: from-teal-500 to-emerald-500
faqs:
  - q: What does a 5-person in-house QA team actually cost per year in India, fully loaded?
    a: For a 1 Lead + 2 SDET + 2 Manual pod in NCR or Pune, expect ₹62–78L/yr once you add EPF 12%, gratuity 4.81%, statutory bonus, seat cost (₹8–12k/month/head), tool licences (BrowserStack, TestRail, LambdaTest) at ₹3–6L/yr, recruitment fees at 8.33% of CTC per hire, and a 20% attrition replacement buffer. Bangalore runs 15–25% higher; Tier-2 cities like Indore, Coimbatore or Mohali shave 20–25%.
  - q: At what team size does outsourcing stop being cheaper than hiring in-house?
    a: Roughly four to five FTE-equivalents. Below that, an outsourced pod at ₹3.5–7L/month beats hiring on speed-to-value, with zero attrition risk and no recruitment spend. Above that, the per-head economics flip and in-house wins — provided you can actually hire and retain mid-senior SDETs, which in 2026 is not a given.
  - q: What hidden costs do outsourcing vendors leave off the invoice?
    a: Ramp time (four to eight weeks of half-productive billing), context-transfer overhead from your engineers, IP and code-access controls, DPDP data-processor agreements, time-zone handoff loss, and the exit cost when you eventually switch vendors. Budget 15–25% on top of the headline retainer for year one.
  - q: Is hybrid (in-house lead + outsourced pod) actually cheaper, or just a compromise?
    a: For most Series-A to Series-C teams, hybrid is the lowest-regret option. One in-house QA Lead at ₹22–30L CTC owns strategy, ownership and code review; an outsourced execution pod of two to four engineers handles regression, automation maintenance and release sign-off. You capture roughly 80% of the cost arbitrage with 90% of the control.
---

If you have searched "QA team cost India" in the last fortnight, you are almost certainly a CTO or founder approving the next hire, comparing a fully-loaded in-house pod against an outsourced retainer that *looks* cheaper on the invoice. The frustrating part: salary aggregators give you one number, outsourcing vendors give you another, and neither is the cost you will actually pay. So in this post we are going to do the arithmetic — properly, in rupees, with EPF, gratuity, seat cost, tool licences, recruitment fees and ramp time all on the same page. By the end you will have a real ₹ TCO calculator you can drop into a board deck.

## Why this question is harder than it looks

We get asked some version of "what does a QA team cost in India" twice a month. The honest answer is that the question contains three buried assumptions that determine the price:

1. **What kind of QA?** A manual regression pod, an automation-first SDET squad, and a performance-and-security capability are not the same product and do not cost the same money.
2. **Where in India?** Bangalore SDET salaries run 15–25% over the NCR/Pune baseline, and Tier-2 cities like Coimbatore, Indore or Mohali are 20–25% under it. The same five-person pod can cost ₹85L in Bangalore and ₹48L in Coimbatore.
3. **Fully loaded against what?** The salary on [AmbitionBox](https://www.ambitionbox.com/profile/qa-engineer-salary) is base CTC. The number you pay is base + EPF + gratuity + statutory bonus + seat + laptop + tools + recruitment + attrition buffer. That is a 1.35–1.5× multiplier the salary sites do not show.

Get those three right and the in-house-vs-outsource decision becomes arithmetic, not anxiety. Get them wrong and you under-budget by 30–40% and miss your release dates. Our [QA test automation 2026 guide](/blog/qa-test-automation-2026-guide) covers the *what kind of QA* question; this post handles the money side.

## The fully-loaded in-house QA cost — line by line

### Salary benchmarks by role (2026, NCR/Pune baseline)

Pulled and cross-checked against [AmbitionBox](https://www.ambitionbox.com/profile/qa-engineer-salary), Naukri JobSpeak and Glassdoor India listings active in Q1 2026:

| Role | Experience | Base CTC (NCR/Pune) | Bangalore | Tier-2 |
|---|---|---|---|---|
| Manual QA | 2–5 yrs | ₹4–8L | ₹5–10L | ₹3–6L |
| SDET (mid) | 3–6 yrs | ₹9–16L | ₹12–20L | ₹7–13L |
| SDET (senior) | 6–9 yrs | ₹16–24L | ₹20–32L | ₹13–19L |
| QA Lead | 7–10 yrs | ₹18–28L | ₹22–34L | ₹15–22L |
| QA Manager | 10+ yrs | ₹26–42L | ₹32–50L | ₹22–34L |

Those bands are the *offer* number, not the cost number.

### The 1.35–1.5× multiplier

On top of base CTC, an Indian employer pays:

- **EPF employer contribution: 12%** of basic (capped, but for most QA salaries it lands at roughly 5–8% of total CTC).
- **Gratuity: 4.81%** of basic per year, accrued from day one under the Payment of Gratuity Act, 1972.
- **Statutory bonus / variable: 8.33–20%** depending on grade and policy.
- **Leave encashment, mediclaim, group life, comp-off cash-out**: another 2–4%.

Add it up and the cost-to-employer is 1.18–1.25× CTC for individual contributors, and 1.30–1.40× once you fold in the items below.

### Seat, laptop, tools, training

The unglamorous line items that finance always forgets:

- **Seat cost** (Gurugram/Noida/Pune Grade-A): ₹8,000–12,000/month/head — ~₹1.2L/yr per person.
- **Laptop + peripherals** amortised over three years: ₹35–55k/yr.
- **BrowserStack / Sauce Labs / LambdaTest** (cross-browser + device farm): ₹1.5–3L/yr for a 5-engineer pod.
- **TestRail or Xray for Jira**: ₹60k–1.2L/yr.
- **Postman team tier, k6 / JMeter cloud, Playwright Cloud if used**: ₹50k–1.5L/yr.
- **Training, conferences, certifications**: ₹40–80k/yr/head if you want to keep mid-senior SDETs.

### Recruitment and attrition

This is where in-house budgets quietly bleed:

- **Recruitment fee**: 8.33–12% of CTC per hire when you use an agency. For an ₹18L SDET that is ₹1.5–2.2L per seat, paid up front.
- **Time-to-hire**: 6–10 weeks for a mid-SDET in 2026, longer for a Lead. Hiring-manager time is a real cost we usually price at ₹50–80k of internal salary per hire.
- **Attrition buffer**: 18–22% annual attrition is normal for Indian QA roles; build a 20% buffer line so the math survives reality.

> **💡 Key insight:** the gap between "what we offered" and "what it cost us" on an Indian QA team is consistently 35–50%. If your CFO is looking at base CTC only, the budget is wrong before the first hire lands.

## The fully-loaded outsourced QA cost — line by line

### Pricing models you will actually see

There are three engagement shapes Indian QA vendors quote, and they price very differently:

- **Time & Materials (T&M)**: ₹800–2,500/hour depending on role mix. Senior SDET ₹2,000–2,500, mid-SDET ₹1,200–1,800, manual ₹800–1,200. Cross-checked against the offshore-rate bands in [NASSCOM's IT-BPM pricing reporting](https://nasscom.in/) and the rate cards we see in active Toshi engagements.
- **Dedicated pod / managed team**: ₹3.5–7L/month for a 3–5 person pod (1 lead + mix of SDET and manual). This is the model most product teams default to.
- **Fixed-bid project**: ₹4–25L for a defined scope — regression suite build-out, framework migration, release certification window. Useful for one-shot work, dangerous for steady-state.

### What is in the retainer (and what isn't)

A vendor retainer typically covers engineer salaries, their statutory load, their seat, their laptop, their attrition risk and their management overhead. Things it usually does *not* cover, and which you will pay for separately:

- **Tool licences** in your name — BrowserStack, TestRail, LambdaTest, etc. Budget the same ₹3–6L/yr as the in-house line.
- **Your CI infra, device cloud minutes, staging environments**.
- **On-call / out-of-hours** support — almost always quoted separately at 1.5–2× hourly.
- **Travel** for kick-off and quarterly reviews if you want them on-site.

### The hidden 15–25%

This is the part competing vendor pages do not put in the calculator:

- **Ramp time**: 4–8 weeks where you pay full rate for half-productive output while the pod learns your stack.
- **Context-transfer overhead**: your engineers lose 10–15% of their week to vendor questions for the first quarter.
- **DPDP data-processor agreement**, IP escrow, code-access controls — legal and platform work that adds ₹1–3L year-one.
- **Exit cost**: switching vendors mid-stream costs roughly one quarter of annual spend in handover, hiring gaps and re-ramp. Budget it as an option premium even if you do not exercise it.

> **⚠️ Watch out:** the ₹4L/month retainer you sign in March is rarely the ₹4L/month you pay in March. Year-one effective cost on outsourced QA is typically 15–25% above the headline number. Bake that into the comparison or the choice is rigged.

## The calculator: a side-by-side 12-month TCO

Here is the worked example we walk founders through. A Series-A SaaS in Gurugram needs a five-person QA capability: one QA Lead, two mid-SDETs, two Manual QA. Both columns are honest, 12-month, fully loaded, in INR.

| Line item | In-house (₹L/yr) | Outsourced pod (₹L/yr) |
|---|---:|---:|
| Base salaries (1 Lead ₹24L + 2 SDET ₹13L + 2 Manual ₹6L) | 62.0 | — |
| EPF + gratuity + statutory bonus (~22% load) | 13.6 | — |
| Seat cost (5 × ₹10k × 12) | 6.0 | — |
| Laptops + peripherals (amortised) | 2.0 | — |
| Tooling (BrowserStack + TestRail + LambdaTest) | 4.5 | 4.5 |
| Recruitment fees (5 hires × 10% CTC, year 1) | 6.2 | — |
| Attrition replacement buffer (20%) | 12.4 | — |
| Training, certifications, off-sites | 2.5 | — |
| Management overhead (10% of an EM's time) | 3.5 | 1.5 |
| Vendor retainer (5-person pod @ ₹4.2L/mo) | — | 50.4 |
| Ramp + context-transfer (year 1 only) | — | 4.5 |
| DPDP DPA, IP escrow, legal setup | — | 1.8 |
| Exit-option premium (~5% of retainer) | — | 2.5 |
| **Year-1 fully-loaded TCO** | **₹112.7L** | **₹65.2L** |
| **Steady-state year-3 TCO** | **₹78–86L** | **₹62–70L** |

A few things to read out of that table honestly:

- **Year one, outsourced wins by a clear margin** — roughly ₹47L — because recruitment, ramp and attrition land on the in-house column.
- **By year three the gap narrows to ₹10–20L**, and that is before you price the strategic value of in-house ownership.
- **Crossover happens around 6–7 FTE-equivalents**, where the per-head economics of a managed pod stop beating a hired team you have already paid to recruit.

If you want the underlying assumptions in your own sheet, the [outsource QA vs in-house](/blog/outsource-qa-vs-in-house) post has the editable model.

## The decision tree: hire, outsource, or hybrid

We end up recommending each of the three about a third of the time. The pattern is roughly:

**Hire in-house when** the product *is* the IP (fintech core ledger, healthtech clinical workflow, deeptech IP), when you are regulated (BFSI under RBI, health under DPDP + sector rules), when the QA roadmap is ≥18 months of steady demand, and when you need >5 FTE-equivalents. The economics catch up by year two and the control compounds.

**Outsource when** you are pre-PMF or in heavy pivot mode, when you need <4 FTE of QA capacity, when the work is burst-shaped (release windows, framework migrations, certification cycles), or when you cannot realistically hire mid-senior SDETs in your city within your timeline. Better an outsourced pod shipping in week three than a req sitting open for five months.

**Go hybrid** — and this is our most common recommendation for Series A through Series C — when you want strategy + IP ownership in-house but cannot justify a full pod. One in-house QA Lead at ₹22–30L CTC owns architecture, code review, hiring later, and vendor management; an outsourced execution pod of two to four engineers handles regression, automation maintenance and release sign-off. The thinking behind the [QA team structure that actually works](/blog/qa-team-structure) sits underneath this recommendation.

## DPDP, IP and the risk side of the ledger

If you outsource QA in India in 2026, the [DPDP Act](https://prsindia.org/billtrack/the-digital-personal-data-protection-bill-2023) treats your vendor as a data processor, and you remain the data fiduciary. Practically that means a signed Data Processing Agreement, documented purpose-limitation, breach-notification timelines, and — for sensitive sectors — a Data Protection Impact Assessment before the engagement begins. None of that is optional, and a vendor who shrugs at it is telling you something.

Beyond compliance, the practical IP controls we insist on in our own engagements:

- Code access through your VCS with named accounts, not shared logins.
- Test data either synthetic or masked at source; no production PII in lower environments.
- Laptops on the vendor's MDM with disk encryption, screen-lock and remote-wipe.
- On-shore data residency where the sector requires it — preference for vendors operating from NCR, Pune, Mumbai or Bangalore over offshore-of-offshore subcontract chains.

The cost of getting this wrong dwarfs any retainer arbitrage. Year one, budget ₹1–3L for the legal and platform work, and put it in the table above honestly.

## How we structure QA engagements at Toshi

We almost never sell a stock pod. We sit with the engineering leader for a fortnight, build the table above with their actual salary offers and tool stack, and recommend one of three shapes: full in-house pod build (we hire, you absorb), managed pod (we run, you direct), or hybrid (we provide execution, you keep the Lead). Pricing follows the model — see [QA testing and automations](/services#qa-testing-and-automations) for the engagement shapes, or [get in touch](/contact) if you want us to run the calculator against your actual numbers.

The arithmetic in this post is the same arithmetic we use in those conversations. The honesty in the table is the differentiator.
