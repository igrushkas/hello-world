# Habit Magic - Future Roadmap & Recommendations

## 🔥 High Impact Features

### 1. Google Calendar Integration
Auto-import events as tasks, map to categories (Business meeting → Business mode, Doctor visit → Health mode). Requires enabling Calendar API in Firebase console, requesting `calendar.readonly` scope during Google login, fetch events, filter, and map to actions with smart category assignment.

### 2. Auto-Break Large Tasks Nudge
When someone enters a big vague action like "Build website", nudge them: "This sounds like a big one. Break it into 2-3 smaller bites? Your brain will thank you." Killer feature for ADHD users. Tasks should be under 20 minutes each.

### 3. Offline-to-Account Data Migration
Demo mode data does NOT merge when user later signs in with Google. Data stays in separate localStorage key. Add migration so offline work gets merged into the user's account upon first sign-in.

### 4. Download/Export Button for Logged-In Users
Currently only Demo Mode has a download button. Add a small download icon in the "7 Days Action Log" section header that exports completed actions as CSV or JSON.

---

## 💰 Monetization (When Ready)

### 5. Hormozi 3-Tier Pricing Model
- **Free**: 3 outcomes, Personal mode only
- **Pro ($9.99/mo)**: Unlimited outcomes, all modes, badges, streaks
- **Ultimate ($19.99/mo)**: Everything + Business Mode + priority support
- Ultimate is a "decoy anchor" to make Pro look like a steal
- Currently app is in Free Beta with all features unlocked

### 6. Founders Price Lock-In ($4.99/mo Forever)
Early adopters/founding members get locked in at a special price to create urgency. The founding member badge + counter system already exists, but no special pricing tier is coded.

### 7. Referral Reward Logic (3 Referrals = 1 Free Month)
Referral tracking system is BUILT (unique codes, Firestore tracking, atomic counters). The actual REWARD — granting 1 free month to users who refer 3 people — is NOT wired up yet.

### 8. Smart Upgrade Nudge at Engagement Peak
Show message around day 10-11 of trial: "Your streak is 11 days — sign up to keep it forever." Trigger conversion at the emotional peak when user is most engaged.

### 9. Sell Coaching Packages That Include the App
Fastest money path: Sell a $197 "Life & Business Alignment" coaching package that INCLUDES the app. The app becomes the tool, coaching becomes the product. Find 50 coaches via Facebook groups, Instagram DMs, Reddit, LinkedIn.

---

## 🔒 Security & Hosting

### 10. Move Hosting to Hostinger
Deploy via FTP/SFTP or GitHub Actions auto-deploy to Hostinger. Then make GitHub repo private (free). User already pays for Hostinger. Would need FTP credentials + target folder (usually `public_html/`). Best option: GitHub Actions auto-deploy on push.

### 11. API Key Restrictions in Google Cloud Console
Restrict Firebase API key HTTP referrers to only:
- `https://myhabitmagic.com/*`
- `http://localhost:*`

Trim allowed APIs from 9 down to 4:
- ✅ Cloud Firestore API
- ✅ Firebase Installations API
- ✅ Firebase Rules API
- ✅ Identity Toolkit API
- ❌ Remove: App Distribution, Cloud Messaging, Hosting, Management, Remote Config, Remote Config Realtime

### 12. Advanced Code Obfuscation
Current minification (terser/clean-css) makes code hard to read but determined copiers can still reverse it. Consider adding: variable renaming, control flow flattening, string encryption via tools like javascript-obfuscator.

### 13. Firestore Security Rules Verification
The `firestore.rules` file in the repo is just a local reference. Firebase uses whatever is deployed in the console. Verify production rules match the local file.

---

## 📈 Growth & Marketing

### 14. Landing Page Enhancements
- Fill in video/screenshot placeholders in the 6 feature showcase sections
- Add real testimonials (currently placeholder sections)
- Add pricing section when Hormozi 3-tier model is activated

### 15. Reddit + TikTok Launch
- Post in r/ADHD, r/adhdmeme, r/productivity communities
- Create one TikTok/Reel showing the app (ADHD content goes viral)
- DM 10 ADHD influencers on TikTok offering free lifetime access for a review

### 16. Google Search Console & SEO
- Add myhabitmagic.com as a property in Google Search Console
- Use URL Inspection tool to request re-indexing
- Ping Google sitemap endpoint to notify of changes

---

## ✨ Nice to Have

### 17. "Community Champion" Badge
Earned for leaving feedback/reviews. Review trigger modals are built, but no specific badge exists for leaving reviews.

### 18. PWA / Mobile App
Add service worker for offline capability, PWA manifest for "Add to Home Screen" on mobile. Currently web-only with no offline support.

### 19. Grandfathering Logic for Free Tier
When paywalls are re-enabled, existing outcomes beyond the free limit (3) should be grandfathered — accessible but users cannot create new ones past the limit. Don't lock existing outcomes, that would feel punishing.

### 20. Rename Demo Mode Label
Consider renaming to "Try Without Account" or "Quick Demo" with warning "Data saved on this device only." Currently says "Try Demo Mode" with 2-week expiration.

---

*Last updated: February 2025*
