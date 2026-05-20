---
title: "Blockchain compliance India: RBI + tax + DPDP guide"
slug: blockchain-compliance-india
metaDescription: "Navigate India's blockchain regulatory landscape with our comprehensive guide on RBI, tax, DPDP, and PMLA compliance for blockchain projects."
excerpt: "Learn about India's blockchain compliance requirements, including RBI regulations, tax implications, DPDP Act, and PMLA obligations for blockchain projects."
category: Blockchain
date: 2026-05-19
author: Toshi Consulting
targetKeyword: "blockchain compliance india"
iconName: chain
tone: from-cyan-500 to-teal-500
faqs:
  - q: "Does the 30% VDA tax apply to my enterprise blockchain project, or only to crypto trading?"
    a: "The 30% VDA tax applies to transfers of VDAs as defined in section 2(47A) of the Income Tax Act. A permissioned Hyperledger supply-chain ledger with no transferable token is generally outside scope; a points-token on Polygon that users can swap is likely inside."
  - q: "Do we need to register with FIU-IND if we're not running an exchange?"
    a: "The March 7, 2023 MoF notification brings any person carrying on VDA exchange, transfer, safekeeping, administration, or related financial services under PMLA. Custody wallets, token issuers, staking-as-a-service, and most DeFi front-ends incorporated in India fall in."
  - q: "How does DPDP Act 2023 interact with an immutable ledger — can we honour erasure requests?"
    a: "Yes, with architecture. On-chain stores hashes and pointers; personal data lives in off-chain encrypted stores you can delete."
  - q: "What are the RBI's current regulations on blockchain and VDAs in India?"
    a: "The RBI has hardened its stance on VDAs, restricting banking rails for VDA businesses and expanding the CBDC pilot. The RBI also encourages tokenised deposits and CBDC-adjacent rails."
---

## Blockchain Compliance in India 2026 — A Builder's Guide to RBI, Tax, DPDP, and PMLA

As a builder or founder in India's blockchain space, navigating the complex regulatory landscape is crucial for the success and longevity of your project. We've seen a surge in demand for clarity on blockchain compliance, with many entrepreneurs and CTOs unsure about which regulations apply to their specific use case. At Toshi Consulting, our team has built a comprehensive guide to help you understand the four key regimes you need to comply with: RBI, Income Tax, DPDP Act 2023, and PMLA/FIU-IND.

## The Four Regimes You Actually Touch

When building a blockchain project in India, you're likely to interact with four primary regulatory frameworks: 

1. **RBI (Reserve Bank of India)**: Focuses on monetary policy, payments, and virtual digital assets (VDAs).
2. **Income Tax**: Governed by the Income Tax Act 1961, specifically sections 115BBH and 194S for VDAs.
3. **DPDP Act 2023 (Digital Personal Data Protection Act)**: Regulates the processing of personal data, including on-chain and off-chain data.
4. **PMLA/FIU-IND (Prevention of Money Laundering Act and Financial Intelligence Unit-India)**: Aims to prevent money laundering and terrorist financing.

Understanding which of these regimes applies to your project is critical. Misunderstanding or ignoring these regulations can lead to significant financial and reputational risks.

## RBI and the Virtual Digital Asset Position

The RBI has taken a clear stance on VDAs, restricting banking rails for VDA businesses and expanding the CBDC (Central Bank Digital Currency) pilot. 

### What the RBI Has Actually Said

The RBI's position on VDAs has evolved, particularly after the 2020 Supreme Court ruling in IAMAI v RBI. Key points include:

- The RBI has restricted banking channels for VDA businesses.
- The 2022 circular on banking rails for VDAs.
- The 2024 adoption of the FSB-IMF synthesis paper on crypto assets.

### CBDC and Tokenised Deposits

The RBI is actively encouraging CBDC and tokenised deposits:

- The e-Rupee CBDC pilot is ongoing.
- Tokenised deposits are being explored as an alternative to traditional banking rails.

### What This Means for Your Build

- **Banking Access**: VDA businesses face challenges in securing banking rails.
- **Fiat On-Ramps**: Limited options for fiat on-ramps for VDA startups.
- **"No-INR-Rail" Trap**: VDA businesses may struggle with INR liquidity.

> **💡 Key Insight:** The RBI's restrictions on banking rails for VDA businesses have significant implications for startups looking to operate in India, making it essential to explore alternative solutions.

## The 30% VDA Tax and 1% TDS — Section 115BBH and 194S Decoded

The Income Tax Act imposes a 30% flat tax on VDA transfers (section 115BBH) and a 1% TDS (section 194S).

### Section 2(47A) — The VDA Definition

The definition of VDA in section 2(47A) is crucial:

- Applies to transfers of VDAs.
- Excludes certain types of digital assets.

### The 30% Flat Tax Mechanics

- No loss set-off.
- No expense deduction except acquisition cost.

### The 1% TDS Under 194S

- Who deducts: buyer of VDAs.
- Thresholds: ₹10k/₹50k.
- Reporting: Form 26QE/26QF.

### Three Worked Examples

1. **Points-Token Loyalty App**: In scope.
2. **Tokenised Invoice-Discounting Pilot**: Not in scope.
3. **Permissioned Supply-Chain Ledger**: Not in scope.

## PMLA and FIU-IND — When Blockchain Becomes a "Reporting Entity"

The PMLA and FIU-IND regulations aim to prevent money laundering and terrorist financing.

### The March 7, 2023 MoF Notification

Five trigger activities bring VDA service providers under PMLA:

- Exchange.
- Transfer.
- Safekeeping.
- Administration.
- Related financial services.

### Registration, Principal Officer, and Designated Director

- FIU-IND registration required.
- Principal officer and designated director responsibilities.

### A 6-Point Self-Test

Determine if you need to register with FIU-IND:

1. Do you provide VDA exchange services?
2. Do you facilitate VDA transfers?
3. Do you offer VDA safekeeping or administration?
4. Are you involved in VDA-related financial services?
5. Do you have a physical presence in India?
6. Are you incorporated in India?

## DPDP Act 2023 and On-Chain Personal Data

The DPDP Act 2023 regulates personal data processing, including on-chain data.

### The "Immutable + Erasure" Paradox

Designing for data erasure:

- Off-chain encrypted stores.
- On-chain hash pointers.

### DPIA Expectations

Data Protection Impact Assessment (DPIA) requirements:

- Conduct DPIA for high-risk data processing.
- Integrate consent flow.

### Cross-Border Data Transfer Rules

- Node geography choices.
- Data transfer regulations.

## What Compliance Actually Costs in INR

Estimated compliance costs for Indian Web3 startups:

- Legal opinion: ₹1.5-5L.
- FIU-IND registration: ₹3-8L (year 1).
- DPIA and DPDP gap-fix: ₹2-6L.
- Smart-contract audit: ₹4-12L.
- Annual tax compliance: ₹1-3L.

Total year-1 compliance wrapper: **₹12-35L**.

## Compliance-First Build Checklist

10-point checklist before writing Solidity:

1. VDA classification.
2. Regime mapping.
3. KYC/Travel-Rule design.
4. Node geography.
5. DPDP architecture.
6. Audit budget.
7. FIU registration trigger check.
8. Banking-rail plan.
9. Tax-reporting plumbing.
10. MSA clauses with your consulting partner.

## How We Run Blockchain Compliance Reviews at Toshi

At Toshi Consulting, we offer comprehensive blockchain compliance reviews:

- **Blockchain Consulting**: Our team provides expert guidance on blockchain compliance.
- **Contact Us**: Discuss your specific needs and challenges.

## The Bottom Line

Blockchain compliance in India requires careful consideration of multiple regulatory frameworks. At Toshi Consulting, we've helped numerous clients navigate these complexities. By understanding and complying with RBI, Income Tax, DPDP Act 2023, and PMLA/FIU-IND regulations, you can ensure the long-term success of your blockchain project in India.

[Discuss Your Blockchain Compliance Needs](/contact) | [Learn More About Our Blockchain Consulting Services](/services#blockchain-consulting)
