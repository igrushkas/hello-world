# Pricing Tiers + Feedback Enforcement + Waitlist Promotion

## Date: 2026-02-14

## Overview
Add 4-tier pricing (Free / Starter $9.99 / Pro $19.99 / Founding), mode locking by tier, annual billing with discount, 3-day feedback enforcement for founding members, and automatic waitlist-to-founding promotion.

## Tiers

| Tier | Monthly | Annual | Modes | Outcomes | Notes |
|------|---------|--------|-------|----------|-------|
| Free | $0 | $0 | Personal Life | 3 max | Core features only |
| Starter | $9.99 | $99/yr (save $21) | Life + Health | Unlimited | All features |
| Pro | $19.99 | $179/yr (save $61) | All 4 | Unlimited | All features |
| Founding | Free 3-6mo | - | All 4 | Unlimited | Must give daily feedback |

## Mode Locking
- Free: only `personal` mode. Tapping Business/Health/Finances shows upgrade modal.
- Starter: `personal` + `health`. Tapping Business/Finances shows upgrade modal.
- Pro/Founding/Trial: all 4 modes unlocked.
- Outcome cap: free tier limited to 3 outcomes. Adding 4th shows upgrade.

## Feedback Enforcement (Founding Members)
- Check `lastFeedbackDate` on login
- 3 days no feedback: show warning modal
- Next login still no feedback: revoke founding status, start 14-day free trial
- Separate from inactivity check (14 days no login = revoke)

## Waitlist Auto-Promotion
- When founding member revoked: query `waitlist` collection ordered by `joinDate`
- First person: set `foundingMember: true`, increment counter, remove from waitlist
- Next login: show congratulations modal

## Pricing UI (Hormozi Value Stack)
- 3-column pricing cards with monthly/annual toggle
- Annual shows effective monthly rate + total savings
- Value anchors: "ADHD coaching: $200-500/mo", "Less than 2 coffees a week"
- Used in: upgrade modal (in-app), landing page, trial expiry screen

## LemonSqueezy Integration
- 4 checkout URLs (Starter monthly, Starter annual, Pro monthly, Pro annual)
- Placeholder URLs until products created
- Pass uid + email as checkout params (existing pattern)

## Files to Modify
- `app.js`: userTier expansion, mode locking, feedback enforcement, waitlist promotion, pricing logic
- `index.html`: new pricing modal, updated upgrade overlay, landing page pricing section
- `styles.css`: pricing cards, annual toggle, tier badges
- `firestore.rules`: no changes needed (existing rules sufficient)
