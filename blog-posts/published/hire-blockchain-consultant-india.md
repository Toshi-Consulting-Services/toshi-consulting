---
title: "Hire Blockchain Consultant India: 2026 Checklist"
slug: hire-blockchain-consultant-india
metaDescription: Planning to hire a blockchain consultant in India? Our buyer's checklist covers FIU-IND, INR pricing, IP ownership, and the red-flag answers to walk away from.
excerpt: A first-person buyer's checklist of 13 questions — with the good answer and the red-flag answer — for shortlisting a blockchain consulting firm in India in 2026.
category: Blockchain
date: 2026-05-19
author: Toshi Consulting
targetKeyword: hire blockchain consultant india
iconName: chain
tone: from-cyan-500 to-sky-500
faqs:
  - q: What should it actually cost to hire a blockchain consultant in India in 2026?
    a: Senior consultants bill ₹3,500-9,000/hour. A production-ready pilot lands in the ₹8-25L range; a full platform build runs ₹25L to ₹1.5Cr depending on chain, audit scope, and integrations. Monthly retainers for post-launch support sit at ₹1.5-6L. Anything quoted below ₹2,000/hour is a junior developer being marketed as a "consultant" — useful for execution, dangerous for architecture.
  - q: Does the firm need to understand FIU-IND, the 30% VDA tax, and the DPDP Act?
    a: Yes — non-negotiable if your product touches tokens, wallets, exchanges, NFTs, or any Web3 surface. They should be current on the FIU-IND AML/CFT guidelines refreshed on 8 January 2026 (Travel Rule, Principal Officer, Designated Director, 5-year records), the 30% VDA tax plus 1% TDS deduction at source, and how DPDP's right to erasure collides with on-chain immutability. The standard answer is off-chain PII with on-chain hashes — if they cannot explain that pattern in one sentence, they are not ready.
  - q: Who owns the code, the keys, and the data after the engagement ends?
    a: You should. Insist on full IP assignment on payment, source code in a repository you control, an escrow arrangement for any proprietary modules, multi-sig admin-key handover with a documented rotation, and exportable data with no vendor-locked SaaS in the critical path. This is the single clause where 70% of blockchain engagements come unstuck at exit — get it right on day one.
  - q: Should I hire a blockchain consulting firm in India or an offshore agency?
    a: For any product that touches Indian users, Indian payments, or Indian regulators, a domestic firm wins on regulatory fit alone — FIU-IND registration, GST invoicing, INR contracting, DPDP familiarity, and the ability to sit in the same RBI Regulatory Sandbox review you are sitting in. Offshore firms can be excellent for pure protocol work, but you will spend the savings on a separate Indian compliance counsel and an integration layer that nobody owns end to end.
---

If you have reached the point of typing "hire blockchain consultant India" into a search bar, you have already made the hard call — you believe blockchain belongs somewhere in your stack and you want a partner to build it. The harder call is the next one: which firm. We have sat on both sides of that table — as the firm being evaluated and as the buyer evaluating others — and the gap between a good blockchain consultancy in India and a dressed-up dev shop is the gap between a clean exit and an expensive lawsuit.

This post is the checklist we wish every prospective client used on us. Thirteen questions, organised by risk surface — strategy fit, technical depth, regulatory, commercial, post-launch — each with the answer a competent firm gives and the red-flag answer that should end the meeting. INR pricing throughout. Indian regulatory wrapper throughout. No filler.

## Why hiring a blockchain consultant is harder than hiring a web team

A bad web agency wastes a quarter and some money. A bad blockchain partner can mint immutable mistakes, lock you out of your own multi-sig, expose you to FIU-IND penalties, or write a smart contract that drains itself the week after launch. The decisions are largely one-way doors: the wrong chain, the wrong token standard, the wrong key-custody model, the wrong jurisdiction of incorporation — none of these are cheap to reverse.

That asymmetry is why the checklist below is sharper than what we would use for a regular software vendor. The cost of getting it right is one careful month of evaluation. The cost of getting it wrong shows up in years.

## First, the question your consultant should ask *you*

Before any of the buyer-side questions, there is one question your consultant must put to you in the first meeting:

**"Do you actually need a blockchain?"**

If the firm does not push back — if they nod along while you describe a workflow that a Postgres audit log and a digital signature could solve — walk away. We have personally talked clients out of blockchain on roughly one in three discovery calls, because the use case did not need shared write access across mutually distrusting parties. That single push-back is the most reliable trust signal you will get in the entire procurement process.

The same goes for hype-driven NFT, DAO, or "tokenise the loyalty program" pitches. A serious blockchain consulting firm in India will ask what problem you are solving for whom, and only then talk about chains. If they open with "we recommend Polygon" before they have heard your use case, your meeting is over.

## Strategy and fit — three questions

### 1. Can you show me one project where you talked a client out of blockchain?

**Why it matters:** every honest practitioner has this story. The absence of one means the firm has never said no to revenue — which means they will not say no to *you* when you should be told no.

**Good answer:** a specific example — "we had a textile traceability client where we proposed a hashed Postgres ledger with periodic anchoring to a public chain, rather than a full Hyperledger network, and saved them roughly ₹40L over three years."

**Red-flag answer:** "Every project we have done needed blockchain." Translation: they have never met a hammer that did not see a nail.

### 2. Which chain would you pick for my use case, and why not the other three?

**Why it matters:** chain selection is where most blockchain projects in India go wrong on day one. Public L1, public L2, permissioned (Hyperledger Fabric, Corda, Quorum), or hybrid each have a real fit and a real failure mode. A consultant who cannot articulate the trade-offs is a developer with a favourite framework, not an architect.

**Good answer:** a structured comparison. Throughput, finality, gas predictability, regulator comfort, validator set, audit ecosystem, exit options. For a regulated Indian use case with bank partners, the answer is usually Hyperledger Fabric or Corda. For consumer Web3 with public composability, Polygon PoS, Polygon zkEVM, or Arbitrum. For tokenised RWAs touching exchanges, Ethereum mainnet plus an L2. They should say *why not* the other three with the same conviction.

**Red-flag answer:** "Whichever one you prefer." That is a vendor optimising for you signing the SOW, not for your project succeeding.

### 3. What does your discovery phase look like, and what is the concrete deliverable?

**Why it matters:** a fixed-scope blockchain build quoted before discovery is a quote written for a project the firm has not yet understood. Discovery should produce a written artefact you can take to a second opinion.

**Good answer:** a 2-4 week paid discovery with a deliverable that includes use case validation, chain recommendation with reasoning, threat model, regulatory map (FIU-IND, RBI, DPDP, GST), high-level architecture, milestone plan, and an INR cost band for the build phase. Priced in lakhs, not "we'll do it free if you sign the build."

**Red-flag answer:** no discovery, or a free one. Free discovery is paid for by inflating the build estimate, and the deliverable is usually a slide deck rather than an architecture document.

> **Key insight:** the discovery deliverable is the single document that determines whether you are buying a project or buying a problem. If you cannot take it to a second consultant and have them read it cold, it is not a real artefact.

## Technical depth — three questions

### 4. Who writes our smart contracts, and which audit firm signs them off?

**Why it matters:** writing Solidity and auditing Solidity are different jobs done by different people. An in-house "audit" by the same team that wrote the contract is not an audit — it is a code review with a marketing label. Real audits come from named firms with public report archives.

**Good answer:** the build team is named, the audit firm is named, and the firm references a public audit report you can read. Acceptable audit partners in 2026 include OpenZeppelin, Trail of Bits, CertiK, Halborn, and Quantstamp internationally; in India, Hashlock, QuillAudits, and Shellboxes have credible track records. The audit is scoped, line-itemed, and the cost is disclosed up front — typically ₹6-25L for a focused contract suite. For ballpark numbers, see our breakdown in [smart contract audit cost](/blog/smart-contract-audit-cost).

**Red-flag answer:** "We do our own audits." Or worse: "Audits are optional for the MVP." On an immutable ledger, the MVP *is* production.

### 5. How will you handle key management and admin multi-sig?

**Why it matters:** the single biggest cause of crypto-asset loss is not contract exploits — it is mishandled keys. If your consultant cannot describe their custody model in one paragraph, they have not thought about it.

**Good answer:** hardware wallets (Ledger, Trezor) for cold storage, a 3-of-5 or 4-of-7 multi-sig (Safe / Gnosis Safe is the default) for admin operations, MPC or threshold signatures where operational tempo demands it, a documented key-rotation policy, and a clear handover plan at engagement close. They should also explain how they avoid single-developer custody during the build phase.

**Red-flag answer:** anything involving a single key, an unencrypted `.env` file, or "we will sort that out closer to launch."

### 6. How do you reconcile on-chain immutability with the DPDP Act's right to erasure?

**Why it matters:** the Digital Personal Data Protection Act gives Indian users a right to have their personal data deleted. Public blockchains do not delete. If you put personal data on chain, you have built a regulatory liability that compounds with every transaction.

**Good answer:** off-chain personal data in an encrypted store with proper key management, on-chain hashes (or zero-knowledge commitments) for integrity, and a documented deletion process for the off-chain store that breaks the link to the on-chain hash. For sensitive fields where the hash itself is risky, ZK proofs or selective disclosure (BBS+, AnonCreds) become the answer. They should be able to draw it on a whiteboard in two minutes.

**Red-flag answer:** "DPDP doesn't really apply to blockchain." It does, and the [Ministry of Electronics and Information Technology](https://www.meity.gov.in/) has been explicit about that posture. For deeper coverage, our [blockchain compliance in India](/blog/blockchain-compliance-india) guide walks through the overlapping obligations.

## Regulatory — three questions every Indian buyer must ask

### 7. Are you up to date on the FIU-IND AML/CFT guidelines updated 8 January 2026?

**Why it matters:** if your product touches virtual digital assets — tokens, wallets, exchanges, NFT marketplaces, custody, broker-dealer flows — you are a VDA Service Provider under the Prevention of Money Laundering Act. The [FIU-IND AML/CFT guidelines](https://fiuindia.gov.in/) cover Travel Rule data exchange, Principal Officer and Designated Director appointments, suspicious transaction reporting, and 5-year record retention. The January 2026 refresh tightened several thresholds.

**Good answer:** the firm names the recent update, walks through registration as a VDA SP, can recommend a Principal Officer profile, and has either done a FIU-IND filing themselves or partnered with a compliance counsel who has. They build the AML controls into the product flow, not as an afterthought.

**Red-flag answer:** "FIU-IND only applies to exchanges." It does not — custodians, wallet providers, and certain DeFi front-ends are all in scope.

### 8. How do you handle the 30% VDA tax and 1% TDS in product flows?

**Why it matters:** Section 115BBH (30% on VDA gains) and Section 194S (1% TDS on transfer) of the Income Tax Act are operational engineering problems, not just tax-filing problems. If your product moves tokens between Indian users, you may need to deduct TDS at source, issue Form 26QE, and reconcile with the exchange or counterparty.

**Good answer:** the firm has built TDS deduction into a product before, can describe the integration with exchange APIs (CoinDCX, WazirX, ZebPay) or with the bank rail for fiat off-ramps, and includes accounting hooks (Zoho Books, Tally, custom GL) in the architecture from day one. They will mention edge cases — peer-to-peer transfers, airdrops, staking rewards — without prompting.

**Red-flag answer:** "Tax is the user's problem." Legally and operationally, in many flows, it is yours.

### 9. Have you taken a project through the RBI Regulatory Sandbox or worked with a partner bank on a permissioned-chain pilot?

**Why it matters:** for any DLT product touching payments, lending, KYC, or trade finance, the [RBI Regulatory Sandbox](https://www.rbi.org.in/) is often the cleanest path to a production pilot in India. A firm that has navigated a cohort knows the documentation rhythm, the test plan format, and the regulator's red lines. A firm that has only read about it does not.

**Good answer:** a named cohort, a named partner bank, and a description of what the live test measured. Alternatively, a documented engagement with a Scheduled Commercial Bank on a permissioned trade-finance or supply-chain finance pilot.

**Red-flag answer:** "The sandbox isn't necessary." It might not be necessary for your specific use case, but they should be able to explain why, not dismiss it.

## Commercial — three questions that protect your P&L

### 10. What does this cost in INR, broken into discovery, build, audit, deploy, and 12-month run?

**Why it matters:** blockchain projects fail at the budget level more often than at the technical level. A single number for the whole engagement is a number designed to balloon.

**Good answer:** a phase-by-phase breakdown. Realistic 2026 bands we see in the Indian market:

- **Discovery:** ₹2-6L over 2-4 weeks
- **Pilot build:** ₹8-25L over 8-14 weeks
- **Full platform:** ₹25L to ₹1.5Cr over 4-9 months
- **External audit:** ₹6-25L depending on contract scope
- **Deployment + first 90 days:** ₹3-10L
- **Run / retainer (12 months):** ₹1.5-6L per month

Senior consultants bill ₹3,500-9,000 per hour; principal architects can reach ₹12,000. Below ₹2,000/hour, you are buying junior developer time with a consultant label.

**Red-flag answer:** "We can do the whole thing for ₹5L." That is either a junior dev pretending, or a quote designed to land you in scope-change hell. Our [blockchain consulting 2026 guide](/blog/blockchain-consulting-2026-guide) goes deeper on how these phases stack across different use cases.

### 11. Fixed-bid, time-and-materials, or hybrid — and how are scope changes priced?

**Why it matters:** fixed-bid blockchain work is a fiction unless the scope is mechanically precise. T&M without caps is a budget bonfire. The right answer is almost always hybrid.

**Good answer:** fixed-price discovery, fixed-price audit, T&M build with a not-to-exceed ceiling and a written change-control process (each change goes to a one-page CR with effort and cost). Milestone payments tied to deliverables, not calendar dates. A 10-15% contingency built into the build phase, disclosed openly.

**Red-flag answer:** unbounded T&M, or fixed-bid with no defined acceptance criteria. Both end the same way.

### 12. Who owns the IP, the repo, the keys, and the data on day 1, day 90, and after exit?

**Why it matters:** this is the clause where 70% of blockchain engagements come undone. Vendors hold the keys hostage. Repos sit on a vendor's GitHub org. Critical infrastructure runs on a vendor's AWS account. When the relationship sours — and roughly a third of engagements do — you have no clean exit.

**Good answer:** IP assignment on payment of each milestone (not at the end). Source code in *your* repository from week one. Smart contract deployment from a multi-sig you control. Cloud infrastructure in your accounts, with the vendor as a delegated IAM role. Source escrow for any vendor-proprietary modules in the critical path. Multi-sig admin keys handed over with a documented rotation. Exportable data — no vendor-locked SaaS components that you cannot extract.

**Red-flag answer:** "We hand over everything at the end." Translation: we will hold you hostage for the final payment.

> **Watch out:** the cleanest test of an exit clause is to read it as if the engagement has already gone wrong. If you would not be comfortable terminating the contract on a Tuesday and being fully operational on Wednesday with a successor team, the clause is not strong enough.

## Post-launch — three questions about the year after go-live

### 13. What is your SLA for a smart-contract vulnerability disclosure, your plan for chain incidents, and your exit handover?

We have folded these into one question because in practice they travel together — a serious firm answers all three with one breath.

**Why it matters:** a smart contract vulnerability disclosed responsibly by a white-hat researcher is a clock starting. So is an L2 sequencer outage. So is the end of the engagement. Each demands a written runbook, not improvisation.

**Good answer:**

- **Vulnerability SLA:** acknowledgement within 4 hours, triage within 24, patch and migration plan within a contractually defined window. A documented bug-bounty program (Immunefi, HackenProof, or a private programme) for production contracts.
- **Chain incidents:** a runbook for chain forks, gas-price spikes, L2 sequencer downtime, oracle failures, and bridge incidents. Multi-RPC redundancy. A circuit breaker / pause function in critical contracts.
- **Exit:** a documented handover plan, 60-90 days of paid support to a successor team, and a "no-knowledge-hostage" clause — the vendor commits to a full operational walk-through, not a Notion page.

**Red-flag answer:** "We will handle it as it comes up." On an immutable ledger, "as it comes up" is too late.

## Red flags — answers that should end the meeting

If during the evaluation you hear any of the following, we would stop the process and move to the next firm on your shortlist:

- No India project references they can name
- Cannot articulate FIU-IND obligations specific to your product
- Quotes a junior developer's hourly rate as a "consultant" rate
- Refuses to assign IP on milestone payment
- No named external audit partner
- Cannot explain why-this-chain in trade-off terms
- Holds keys, repo, or infrastructure on their own accounts with no exit clause
- Dismisses DPDP, RBI sandbox, or the 30% + 1% TDS framework as "not relevant"

Any one of these in isolation is a conversation; two together is a pass.

## How we structure blockchain engagements at Toshi

When we take on a blockchain mandate, we run paid discovery first (₹2-6L, two to four weeks) and we hand you a document you can take to a second consultant for a sanity check. Build runs on T&M with a not-to-exceed ceiling, milestone payments, and a written change-control process. Audit is external and named in the SOW. IP assigns on each milestone. Keys, repos, and infrastructure live in your accounts from day one. Run-phase retainers are monthly, cancellable on 30 days. If you would like to talk through whether your use case actually needs a blockchain — including the cases where we will tell you it does not — [get in touch](/contact) or read more about our [blockchain consulting practice](/services#blockchain-consulting).

The single most important thing we can tell you about hiring a blockchain consultant in India in 2026 is this: the firm you want is the one that will tell you no when no is the right answer, that prices in INR with phase-by-phase honesty, and that hands you the keys before they ask for the cheque. Use the thirteen questions above on every shortlisted vendor, and the right partner will be obvious by the third meeting.
