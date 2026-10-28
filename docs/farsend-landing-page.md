# FarSend landing page

Built with `landing-page-design` from
[elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills),
with the process half of Anthropic's `frontend-design` layered on top. This file is the
strategy output the skill asks for before any code, plus a record of how each visual rule
was implemented.

Live route: `/farsend` · Source: `app/farsend/`

---

## 1. Which skill to use

Four candidates, star counts read from the GitHub API on 28 October 2026.

| Skill | Stars | What it gives you | Verdict |
|---|---|---|---|
| [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) `landing-page-design` | 10.3k | Ordered conversion strategy (intake, structure, layout type, copy formulas, SEO) and a hard numerical visual system: type scale, spacing tokens, radius formula, banned fonts, one motion curve, icon sets, ship checklist | **Used.** It is the only one that tells you what a page should *say* and then pins every number. Prescriptive, occasionally dogmatic, which is exactly what stops a generated page drifting back to purple gradients |
| [anthropics/skills](https://github.com/anthropics/skills) `frontend-design` | 184k | No numbers at all. A design-lead brief: commit to a direction before coding, then critique your own plan against the generic default. Explicitly names the current AI tells (cream plus serif plus terracotta, near black plus acid green, the rounded card kit, all caps eyebrows) | **Layered on.** Better taste, worse specificity. Read first, then obey the first skill's numbers |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 142k | Searchable design intelligence: palettes, type pairings, layout patterns per product type | Skipped. It is a lookup table for decisions rather than a system, and lookup tables are how pages end up looking like each other |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 104k | Art direction, reference images, and a browser check pass | Skipped for this build. Its strongest idea, screenshot your own output and critique it, needs a browser in the loop |

The combination used here: **frontend-design decides which direction, landing-page-design decides every value, Anthropic's tell list is the last check before shipping.** One place where they disagree is worth naming: `landing-page-design` mandates a per section fade and rise, which `frontend-design` calls "the generic default". The explicit skill wins for values, so reveals stay, but they run once, they stop above the fold, and the page's one motion centrepiece is the working batch panel rather than ten identical entrances.

---

## 2. Part A: strategy

### Assumptions (A1)

The brief was "use this skill, show me the best you can do". Reading that against the repo, the
highest value target was not the registry homepage, which already has a job, but the flagship
product with the sharpest offer. Answers assumed from `tools/farsend.js`:

- **Primary action:** open the app and send a batch.
- **Offer:** turn a list of addresses and amounts into one signed transaction.
- **Audience:** teams and DAOs paying contributors, running airdrops or community rewards, already holding the funds in a wallet.
- **Objections:** gas cost, wrong address risk, custody, "is it audited".
- **Traffic source:** registry listing, Farcaster, search for "batch send ERC20".
- **Known at landing:** they know what a wallet is. No hand holding on the first screen.

### Layout type (A3)

**Type A, classic hero plus sections.** The product is understood in one look at the panel, so
the hero carries a working demo rather than an abstract argument.

### Page outline (A2)

1. Floating nav, plus a skip link
2. Hero: badge, headline, subheadline, primary CTA, one proof line, **live batch panel**
3. Chain strip, the proof signal for "does it work where I am"
4. Problem to solution, one section
5. Benefits, four, outcome led
6. Tagline reveal, the page's one large statement
7. How it works, three steps
8. Security and proof, contract facts
9. FAQ, eight questions
10. Final CTA, identical to the hero
11. Footer with privacy and terms

### Hero copy (A5)

- **Headline:** Pay your whole list in one transaction.
- **Subheadline:** FarSend turns a spreadsheet of addresses and amounts into a single signed transaction on Base, Ethereum, Optimism or Arbitrum. Import a CSV, check the total, send.
- **CTA:** Open batch sender
- **Proof line:** Live on Base since 26 January 2026. No signup, no email, nothing held in escrow.

### Benefits

1. **One signature for the whole list.** Forty recipients or four hundred, the transaction count stays at one.
2. **Roughly half the gas.** Batching shares the base cost across every recipient, 40% to 60% on typical ERC20 payout lists.
3. **Checked before you sign.** Every line checksummed, every amount validated, every duplicate caught.
4. **You keep custody.** Funds pass from your wallet through the contract to recipients. No escrow, no account.

### How it works

1. **Import the list.** Paste rows, or drop a CSV or JSON file.
2. **Review the batch.** Totals, gas estimate, and anything that would bounce, flagged with the reason.
3. **Sign once.** One transaction, and the contract pays each address in turn.

### FAQ

Eight questions, answering the four real objections first: cost, chains, account, and where the
list goes. Full text lives in `app/farsend/page.jsx` and is also emitted as `FAQPage` JSON-LD.

### SEO and AEO (A7)

- **Index it.** Evergreen offer, search intent matches the promise.
- **Title:** FarSend: batch send ETH and ERC20 in one transaction
- **Description:** FarSend batches ETH and ERC20 payouts into a single transaction on Base, Ethereum, Optimism and Arbitrum. Import a CSV, review the total, sign once.
- **Schema:** `FAQPage` plus `SoftwareApplication`.
- Canonical `/farsend`, linked from the registry nav so it is not an orphan.

---

## 3. Part B: how the visual system was applied

| Rule | Implementation |
|---|---|
| Fonts | Geist Sans for everything, Geist Mono only for addresses, amounts and step numbers. Installed from npm (`geist`) via `next/font/local` bindings, so builds work with no network fetch. No Inter, no italic, no weight above 600 |
| Type scale | Tailwind steps only. The one arbitrary size is `max-w-[680px]` on text blocks, a width, not a size |
| Spacing | Only the skill's ladder. Every value used maps to a factor of 4 already in Tailwind's scale |
| Radius | `rounded-2xl` on panels; nested surfaces are left square because the 24px inner gap exceeds the 16px radius, which is exactly what the formula produces. Buttons are `rounded-full` |
| Backgrounds | Flat. One surface ladder: `#181818` page, `#1F1F1F` panel, `#272727` hairline, `#313131` pressed state. The only gradient on the page is the hero heading, white to `#9B9B9B` |
| Icons | Phosphor at three weights. No Material |
| Motion | One curve, `cubic-bezier(0.22, 1, 0.36, 1)`, exposed as `ease-settle`. 500ms for movement, 300ms for colour, 700ms for section entrances. Transform and opacity only |
| Nav | Floating, content sized, translucent with a heavy blur. The menu glyph rotates between states instead of swapping. Mobile panel is full height, links arrive 60ms apart |
| Tagline reveal | Per word IntersectionObserver against a trigger band at the middle of the viewport. Words start at 30% opacity |
| States | Hover, active, visible focus ring, skeleton loaders shaped like the numbers they replace, a composed empty state, inline errors naming the exact line, a disabled send state |
| Ship list | Skip link, semantic landmarks, branded favicon (`app/icon.svg`), custom 404 already present, privacy and terms pages written, `alt` free by design because there are no images, metadata and social tags |

### The one deviation, on purpose

B8 asks for invented brands, testimonials and team members. This page is for a real shipped
product, so inventing customers would be a lie on a page about money. Proof comes from things
that are actually true and checkable instead: the live Base contract with a Basescan link, the
launch date, the public source, and the gas model stated in the FAQ so a reader can disagree
with it. Real content, in the product's own voice, which is what the rule is actually after.

---

## 4. Verifying

```bash
npm install
npm run dev        # http://localhost:3000/farsend
npm test           # batch parser and gas model, 51 checks
npm run lint
npm run validate
npm run build:check   # production build, safe to run while dev is up
```

`build:check` sets `NEXT_DIST_DIR=.next-build`, which `next.config.js` reads as
`distDir`. Run a plain `next build` while `next dev` is running and the build
overwrites `.next` underneath the dev server: every `/_next/static` request then
404s and the site renders as unstyled HTML until dev is restarted. That is what
`build:check` exists to avoid.

## 5. Audit notes

Found and fixed while reviewing the first pass:

- **The gas claim was wrong twice over.** It first claimed a flat 40% to 60%; the model actually topped out near 53%, and the 65,000 gas figure behind it was inflated. Re-derived against the real contract (51,000 for a standalone ERC20 transfer, 30,500 per batched recipient plus one 21,000 base), the saving is 0% at one recipient, 20% at two, 36% at ten, and approaches 40% on long lists. Copy and model now agree, and `npm test` pins the band.
- **The row cap was decorative.** The helper text said 400 lines were allowed and nothing enforced it. Parsing now caps at 400 and the panel says when it has.
- **Skeletons flashed on first paint.** The loading state fired on mount, so real numbers appeared, vanished into skeletons, then came back. The first pass is now skipped; skeletons only follow a change in recipient count.
- **Scroll lock could stick.** Opening the mobile menu above the breakpoint and then resizing left `body` overflow hidden, with the panel itself hidden by CSS. The menu now closes on the breakpoint change.
- **Placeholder contrast.** `white/40` on `#181818` is about 3.3:1. Raised to `white/55`.
- **Duplicated logic.** The parser and gas model lived inside the component where nothing could exercise them. They are now `app/farsend/lib/batch.mjs`, with `scripts/check-batch-parser.mjs` covering 51 cases and running in CI.

### Checked against the real app and repo

The copy was re-verified against `farsend.vercel.app`, `public/chains.json` and `BatchSender.sol`:

| Claim | Before | Now |
|---|---|---|
| Networks | Four (Base, Ethereum, Optimism, Arbitrum) | Eight, each with its own deployed contract, listed with explorer links read from `chains.json` |
| Custody | "Never holds your funds" | False for ERC20: `disperseToken` pulls the total with `transferFrom` into the contract, pays out, then refunds the remainder. Now stated exactly |
| Gas | 65,000 standalone, "40 to 60%" | 51,000 standalone against 30,500 per batched recipient plus one 21,000 base, so 36% at ten and approaching 40% |
| Licence | "on GitHub under the MIT licence", "fork it" | The contract declares SPDX MIT, but the repo has no top level licence file, so the page no longer invites reuse |
| Total units | Labelled USDC | The app lets you choose the asset, so the preview no longer names one |
| Random amounts | Not mentioned | Added as a benefit and in the steps: fixed, apply to all, or spread across a min and max |

Not changed, worth knowing:

- The page has no screenshots. Nothing here could be rendered headlessly in the sandbox, so the layout is verified through the served CSS, the asset graph and the DOM, not by eye. Open `/farsend` on a phone before merging.
- The hero menu button, the FAQ `<details>` and the mobile panel behave correctly by markup, but their motion has not been watched in a browser.
