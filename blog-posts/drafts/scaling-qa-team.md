---
title: Scaling QA Team
slug: scaling-qa-team
metaDescription: Learn how to scale your QA team from 1 product to 10 with our playbook, covering org design, test architecture, and Indian-context economics.
excerpt: Discover the 5-stage QA maturity model and how to choose between centralised, federated, and hybrid QA teams.
category: QA
date: 2026-05-19
author: Toshi Consulting
targetKeyword: scaling qa team
iconName: rocket
tone: from-emerald-500 to-teal-500
faqs:
- q: At what product count or team size should we stop embedding QA inside each squad and create a central QA platform team?
  a: The honest answer is when the fourth product is in beta or the engineering team crosses ~40. However, the real signal is when you start re-solving the same test-infra problem in three places.
- q: What should we build in-house vs hand to a QA automation partner?
  a: Keep the test-strategy, test-architecture, and product-critical regression suites in-house; outsource the volume and the spikes. An in-house SDET in India at ₹18-30L fully loaded vs a partner-pod equivalent at ₹6-12L/mo for 2-3 engineers.
- q: How do we keep test coverage honest when we go from 1 product to 10? Won't the regression suite become un-runnable?
  a: Cover suite tiering, shared test-infra, parallelisation, ruthless deletion of low-value tests, AI-assisted maintenance, and the leadership metric that actually matters (defect-escape rate).
- q: What's the difference between a centralised QA team and an embedded SDET model?
  a: A centralised QA team handles all testing for multiple products, while embedded SDETs work within each product squad. Choose based on your org size, product complexity, and testing requirements.

---

## Scaling QA from 1 product to 10 — the playbook
As companies grow from a single product to a portfolio of 10, their QA setup faces unprecedented challenges. We've seen this firsthand with our clients, where the QA team that worked seamlessly for one product becomes the bottleneck for multiple products. In this post, we'll explore the 5-stage QA maturity model, org-design options, and Indian-context economics to help you scale your QA team effectively.

## The 90-second summary
To scale your QA team, you need to understand the 5-stage QA maturity model: 
1. Ad-hoc / manual-only (1 product, < 10 engineers)
2. First automation, single framework (1-2 products, 10-25 engineers)
3. Multi-product, shared CI gates (2-4 products, 25-60 engineers)
4. QA platform team + embedded SDETs (4-8 products, 60-150 engineers)
5. Federated SDETs + central platform + partner pods (8+ products, 150+ engineers)
You'll also need to choose between three org-design options: centralised QA, embedded SDETs, or a hybrid model. We'll dive into the pros and cons of each, including the ₹ economics and DPDP compliance.

## Why scaling QA breaks differently than scaling engineering
Scaling QA is not the same as scaling engineering. While engineering teams can often scale linearly with the addition of new products, QA teams face unique challenges. The "1 QA per squad" model that worked for the first product breaks at the third product, where shared test data, environment contention, and release-train collisions become major issues. Leadership signals, such as "QA is the bottleneck," become a board slide when the fourth product is in beta.

## The 5-stage QA maturity model
The 5-stage QA maturity model helps you self-locate and plan your QA scaling journey:
1. **Stage 1 — Ad-hoc / manual-only**: Suitable for 1 product with < 10 engineers.
2. **Stage 2 — First automation, single framework**: Ideal for 1-2 products with 10-25 engineers.
3. **Stage 3 — Multi-product, shared CI gates**: Designed for 2-4 products with 25-60 engineers.
4. **Stage 4 — QA platform team + embedded SDETs**: Suitable for 4-8 products with 60-150 engineers.
5. **Stage 5 — Federated SDETs + central platform + partner pods**: Best for 8+ products with 150+ engineers.

## The org-design fork — three honest options
You have three org-design options to choose from:
1. **Centralised QA team**: Pros — easier to manage, cons — can become a bottleneck.
2. **Embedded SDETs per squad with a thin platform team**: Pros — faster time-to-market, cons — can lead to duplicated effort.
3. **Hybrid in-house + managed QA partner**: Pros — scalable, cons — requires careful partner selection.
To choose, consider your org size, product complexity, and testing requirements.

## The test-architecture decisions you only get to make once
When designing your test architecture, consider:
1. **One framework across products vs framework-per-stack**: Choose based on your product complexity and testing requirements.
2. **Shared test-data layer + ephemeral environments**: Essential for efficient testing.
3. **The pyramid at scale — unit / integration / contract / E2E ratios**: Aim for a balanced test pyramid.
4. **AI-assisted authoring + self-healing**: Useful for test maintenance and automation.

## Indian-context economics
When scaling your QA team in India, consider:
1. **SDET salary bands (₹) by experience and city, fully loaded**: ₹18-30L for an in-house SDET.
2. **In-house SDET cost vs managed QA pod — break-even math**: ₹6-12L/mo for a partner-pod equivalent.
3. **DPDP + sector overlays (fintech / health-tech)**: Ensure compliance with Indian regulations.

## Metrics leadership should actually track
To measure QA effectiveness, track:
1. **Defect-escape rate**: The primary metric for QA success.
2. **Release confidence + mean time to detect regression**: Essential for understanding QA efficiency.
3. **Anti-metrics — test count, coverage %, automation %**: Avoid focusing solely on these metrics.

## A 30-60-90 day plan you can copy
To scale your QA team in the next 90 days:
1. **Days 1-30**: Assess your current QA setup and identify bottlenecks.
2. **Days 31-60**: Choose an org-design option and implement changes.
3. **Days 61-90**: Monitor progress and adjust your strategy as needed.
For more information on QA cost calculation, visit our [QA cost calculator](/blog/qa-team-cost-india). To learn more about outsourcing QA, read our [outsource vs in-house guide](/blog/outsource-qa-vs-in-house).

## How we help
At Toshi Consulting, our QA Testing & Automations practice helps organisations scale their QA teams effectively. We provide guidance on org design, test architecture, and Indian-context economics. [Talk to us](/contact) to learn more about how we can help you scale your QA team.

## Where to go from here
Scaling your QA team from 1 product to 10 requires careful planning and execution. By following the 5-stage QA maturity model, choosing the right org-design option, and considering Indian-context economics, you can ensure your QA team is equipped to handle the challenges of multiple products. Remember to track the right metrics and adjust your strategy as needed. For more information on QA scaling, visit our [QA Testing & Automations page](/services#qa-testing). 

External sources:
- [NASSCOM](https://www.nasscom.in/)
- [World Quality Report](https://www.capgemini.com/in-en/service/world-quality-report/)
- [Google Testing Blog](https://testing.googleblog.com/)
