---
title: "DPDP Act + AI: compliance guide for Indian businesses"
slug: ai-compliance-india-dpdp
metaDescription: "Navigate AI compliance in India with the DPDP Act. Learn how Indian businesses can ensure AI systems meet DPDP requirements and avoid ₹250 crore penalties."
excerpt: "Ensure AI systems comply with the DPDP Act and avoid hefty penalties. Learn how to implement consent management, data localisation, and deletion workflows for AI deployments."
category: AI
date: 2026-05-19
author: Toshi Consulting
targetKeyword: "ai compliance india"
iconName: brain
tone: from-teal-500 to-cyan-500
faqs:
  - q: "We already use ChatGPT/Claude through their public APIs — are we breaking DPDP today?"
    a: "Probably not yet, but you're accumulating exposure. We explain the three concrete controls to ship in the next 90 days: PII redaction at the prompt boundary, consent capture before any AI feature touches user data, and a logged record of which API call processed which Data Principal's data."
  - q: "Do we have to host our AI models in India to be DPDP-compliant?"
    a: "No, DPDP is more permissive on cross-border than GDPR. Transfers are allowed unless the government blacklists a country. Sector regulators can impose stricter localisation."
  - q: "How do we honour a 'delete my data' request when the customer's PII is already baked into a fine-tuned model or sitting in vector embeddings?"
    a: "This is the hardest DPDP-AI problem. Patterns include avoiding fine-tuning on raw PII, maintaining a deletion ledger, and periodic full retrain on a PII-scrubbed corpus."
  - q: "What are the penalties for non-compliance with the DPDP Act?"
    a: "Up to ₹250 crore per breach. The Data Protection Board can issue orders against non-compliant businesses."
---

The DPDP Rules were notified in November 2025, and most Data Fiduciary obligations land May 2027 — roughly 12 months from publish date. Every Indian business that has plugged ChatGPT, Claude, Gemini, or a RAG chatbot into a customer-facing workflow over the last 24 months is now sitting on a compliance gap they have not measured. Penalty exposure runs up to ₹250 cr per breach, and the Data Protection Board is being staffed precisely so it can issue orders against the obvious early offenders.

## The 60-second answer

If AI touches identifiable customer data, you are a Data Fiduciary for that processing — and the May 2027 clock is running. The DPDP Act demands that you implement consent management, data localisation, and deletion workflows for AI deployments. Failure to comply can result in penalties of up to ₹250 crore.

## What DPDP actually demands of an AI system (in plain English)

The DPDP Act imposes five key obligations on AI systems that process personal data:

*   **Notice**: Provide clear notice to users about how their data will be used in AI systems.
*   **Consent**: Obtain explicit consent from users before processing their data in AI systems.
*   **Purpose limitation**: Ensure that AI systems only process data for specified, legitimate purposes.
*   **Retention**: Limit the retention of personal data in AI systems to only as long as necessary.
*   **Erasure**: Implement deletion workflows to honour user requests for data erasure.

AI systems introduce new challenges, such as:

*   **Derived personal data**: AI-generated data, like embeddings, can be considered personal data.
*   **Prompt logging**: AI system logs may contain personal data.
*   **Fine-tune data**: Training data used for fine-tuning AI models can be sensitive.

Significant Data Fiduciary (SDF) status may be triggered if your AI feature processes large amounts of sensitive data.

## Where Indian businesses are quietly non-compliant today

Many Indian businesses are non-compliant with the DPDP Act due to:

*   **Using public AI APIs**: Businesses using public AI APIs, like ChatGPT or Claude, may be accumulating exposure due to lack of consent management, data localisation, and deletion workflows.
*   **RAG and vector databases**: Businesses using RAG and vector databases may not be aware that embeddings can be considered personal data.
*   **Fine-tuned models**: Businesses using fine-tuned models may not have implemented deletion workflows for sensitive data.

## The data-residency question, decoded

The DPDP Act allows cross-border data transfers, but sector regulators can impose stricter localisation requirements. India-region hosting options include:

*   **Azure India**: Offers India-region hosting for AI workloads.
*   **AWS Mumbai/Hyderabad**: Provides India-region hosting options.
*   **GCP Mumbai/Delhi**: Offers India-region hosting for AI workloads.

## A 90-day DPDP-for-AI compliance sprint

To achieve DPDP compliance, follow this 90-day plan:

### Days 1-30: Inventory and classification

*   Inventory every AI integration and classify PII flow.

### Days 31-60: Consent and redaction

*   Ship consent artefacts and implement PII redaction at the prompt boundary.

### Days 61-90: DPIA and governance

*   Conduct a DPIA for high-risk use cases and implement vendor DPAs.

## The compliance-cost reality

Compliance costs vary based on organisation size and complexity:

*   **SMB starter posture**: ₹3-8L one-time + ₹20-50K/mo ongoing.
*   **Mid-market full programme**: ₹15-40L one-time + ₹1-3L/mo ongoing.
*   **SDF-grade governance**: ₹50L+ one-time + dedicated DPO.

## How we help

At Toshi Consulting, we help Indian businesses achieve DPDP compliance for AI systems. Our team provides:

*   **AI integration**: We integrate AI systems with DPDP compliance.
*   **QA Testing & Automations**: We test AI integrations for DPDP compliance.

[Learn more about our AI integration practice](/services#ai-integration). 

## Where to go from here

To ensure AI systems comply with the DPDP Act, Indian businesses must take proactive steps. We recommend:

*   Conducting a thorough review of AI systems and data flows.
*   Implementing consent management, data localisation, and deletion workflows.
*   Engaging with experts to ensure compliance.

[Contact us](/contact) to discuss your AI compliance needs.

## The bottom line

DPDP compliance for AI systems is critical to avoid penalties and maintain customer trust. By following the guidelines outlined above and engaging with experts, Indian businesses can ensure compliance and stay ahead of the May 2027 enforcement deadline.

For more information on cybersecurity best practices and AI compliance, visit:

*   [NASSCOM — Responsible AI / DPDP playbook](https://www.nasscom.in/)
*   [MeitY — DPDP Act 2023 official text + DPDP Rules notification](https://www.meity.gov.in/)
*   [NIST AI Risk Management Framework (AI RMF 1.0)](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-30.pdf)
