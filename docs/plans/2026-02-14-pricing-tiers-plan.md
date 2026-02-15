# Pricing Tiers Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 4-tier pricing (Free/$9.99 Starter/$19.99 Pro/Founding), mode locking, 3-day feedback enforcement, waitlist auto-promotion, and Hormozi-style pricing UI with annual discounts.

**Architecture:** Expand existing `userTier` variable from 2 values ('free'/'pro') to 4 ('free'/'starter'/'pro'/'founding'). Gate mode switching and outcome creation by tier. Add feedback date tracking to founding member engagement checks. Replace single upgrade modal with 3-tier pricing cards. LemonSqueezy placeholder URLs for 4 products.

**Tech Stack:** Vanilla JS (app.js), HTML/CSS, Firebase Firestore, LemonSqueezy (checkout links)

---

### Task 1: Expand userTier System + Mode Locking Logic

**Files:**
- Modify: `app.js:1354` (userTier variable)
- Modify: `app.js:1377-1380` (isProUser function)
- Modify: `app.js:3033-3082` (switchMode function)
- Modify: `app.js:5727-5731` (outcome limit gate in save handler)

**Step 1: Update userTier variable and add tier helpers**

At line 1354 in app.js, change:
```javascript
var userTier = 'free'; // 'free' or 'pro'
```
to:
```javascript
var userTier = 'free'; // 'free', 'starter', 'pro', or 'founding'

var TIER_ALLOWED_MODES = {
    free: ['personal'],
    starter: ['personal', 'health'],
    pro: ['personal', 'business', 'health', 'finances'],
    founding: ['personal', 'business', 'health', 'finances']
};

function canAccessMode(mode) {
    if (isFoundingMember || isTrialUser) return true;
    var allowed = TIER_ALLOWED_MODES[userTier] || TIER_ALLOWED_MODES.free;
    return allowed.indexOf(mode) !== -1;
}

function hasUnlimitedOutcomes() {
    return userTier !== 'free' || isFoundingMember || isTrialUser;
}
```

**Step 2: Update isProUser to handle all tiers**

At line 1377-1380, change:
```javascript
function isProUser() {
    return true; // FREE BETA: all features unlocked for everyone
    // Original: return userTier === 'pro' || isTrialUser();
}
```
to:
```javascript
function isProUser() {
    return userTier === 'pro' || userTier === 'starter' || userTier === 'founding' || isFoundingMember || isTrialUser;
}
```

**Step 3: Add mode locking to switchMode**

At line 3033-3035 in switchMode(), add a tier gate right after `try {`:
```javascript
function switchMode(mode) {
    try {
        // Tier gate: check if user can access this mode
        if (!canAccessMode(mode)) {
            showPricingModal(mode);
            return;
        }
        currentMode = mode;
```

**Step 4: Add mode locking to mobile dropdown handler**

Find the modeSelectMobile change event listener and update to gate it:
```javascript
modeSelectMobile.addEventListener('change', function() {
    var mode = this.value;
    if (mode && currentMode !== mode) {
        if (!canAccessMode(mode)) {
            this.value = currentMode; // Reset dropdown
            showPricingModal(mode);
            return;
        }
        switchMode(mode);
    }
});
```

**Step 5: Update outcome limit gate**

At line 5727-5731, change:
```javascript
if (data && data.outcomes && data.outcomes.length >= 3 && !isProUser()) {
    showUpgradeModal();
    return;
}
```
to:
```javascript
if (data && data.outcomes && data.outcomes.length >= 3 && !hasUnlimitedOutcomes()) {
    showPricingModal();
    return;
}
```

**Step 6: Update loadUserTier to handle all tiers**

At line 7446-7469, update `loadUserTier()` to recognize 'starter' and 'founding':
```javascript
function loadUserTier(uid) {
    if (!firebaseReady) return;
    try {
        db.collection('users').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                var data = doc.data();
                if (data.foundingMember) {
                    userTier = 'founding';
                } else if (data.tier) {
                    userTier = data.tier; // 'free', 'starter', or 'pro'
                } else if (currentUser && currentUser.email === 'irishka.lebedeva@gmail.com') {
                    userTier = 'pro';
                    db.collection('users').doc(uid).set({ tier: 'pro' }, { merge: true });
                } else {
                    userTier = 'free';
                }
            } else {
                userTier = 'free';
            }
            updateUpgradeButtonVisibility();
            updateModeLocksUI();
        }).catch(function() {
            userTier = 'free';
            updateUpgradeButtonVisibility();
        });
    } catch(e) {
        userTier = 'free';
    }
}
```

**Step 7: Add visual lock indicators on mode buttons**

Add new function `updateModeLocksUI()`:
```javascript
function updateModeLocksUI() {
    var modes = ['personal', 'business', 'health', 'finances'];
    var btnIds = {
        personal: 'btnPersonalMode',
        business: 'btnBusinessMode',
        health: 'btnHealthMode',
        finances: 'btnFinancesMode'
    };
    modes.forEach(function(mode) {
        var btn = document.getElementById(btnIds[mode]);
        if (!btn) return;
        if (canAccessMode(mode)) {
            btn.classList.remove('mode-locked');
        } else {
            btn.classList.add('mode-locked');
        }
    });
    // Also update mobile dropdown options
    var mobileSelect = document.getElementById('modeSelectMobile');
    if (mobileSelect) {
        Array.from(mobileSelect.options).forEach(function(opt) {
            if (!canAccessMode(opt.value)) {
                opt.textContent = opt.textContent.replace(' 🔒', '') + ' 🔒';
                opt.disabled = true;
            } else {
                opt.textContent = opt.textContent.replace(' 🔒', '');
                opt.disabled = false;
            }
        });
    }
    // If current mode is locked, switch to personal
    if (!canAccessMode(currentMode)) {
        switchMode('personal');
    }
}
```

**Step 8: Commit**
```bash
git add app.js
git commit -m "feat: expand userTier system with mode locking by plan tier"
```

---

### Task 2: 3-Day Feedback Enforcement for Founding Members

**Files:**
- Modify: `app.js:7238-7256` (checkFoundingMemberEngagement function)
- Modify: `app.js:7259-7283` (revokeFoundingMemberStatus function)

**Step 1: Add feedback date check to engagement function**

Replace `checkFoundingMemberEngagement()` at line 7238:
```javascript
function checkFoundingMemberEngagement() {
    if (!firebaseReady || !currentUser || !isFoundingMember) return;

    db.collection('users').doc(currentUser.uid).get().then(function(doc) {
        if (!doc.exists || !doc.data().foundingMember) return;
        var userData = doc.data();

        // Check 1: Inactivity (14 days no login = revoke)
        var lastActive = userData.lastActiveDate ? new Date(userData.lastActiveDate) : new Date();
        var now = new Date();
        var daysSinceActive = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

        if (daysSinceActive >= 14) {
            revokeFoundingMemberStatus(currentUser.uid, 'inactivity');
            return;
        } else if (daysSinceActive >= 7 && userData.foundingMemberStatus !== 'warned') {
            showInactivityNudge(daysSinceActive);
            db.collection('users').doc(currentUser.uid).set({
                foundingMemberStatus: 'warned'
            }, { merge: true });
        }

        // Check 2: Feedback gap (3 days no daily feedback = warning, then revoke)
        var lastFeedback = userData.lastFeedbackDate ? new Date(userData.lastFeedbackDate) : null;
        if (lastFeedback) {
            var daysSinceFeedback = Math.floor((now - lastFeedback) / (1000 * 60 * 60 * 24));
            if (daysSinceFeedback >= 4 && userData.feedbackWarned) {
                // Already warned, still no feedback — revoke
                revokeFoundingMemberStatus(currentUser.uid, 'no_feedback');
                return;
            } else if (daysSinceFeedback >= 3 && !userData.feedbackWarned) {
                // First warning at 3 days
                showFeedbackWarningModal(daysSinceFeedback);
                db.collection('users').doc(currentUser.uid).set({
                    feedbackWarned: true
                }, { merge: true });
            }
        }
    }).catch(function(e) { console.error('Engagement check error:', e); });
}
```

**Step 2: Update revokeFoundingMemberStatus to accept reason + auto-promote waitlist**

Replace `revokeFoundingMemberStatus()` at line 7259:
```javascript
function revokeFoundingMemberStatus(uid, reason) {
    isFoundingMember = false;
    userTier = 'free';
    db.collection('users').doc(uid).set({
        foundingMember: false,
        foundingMemberStatus: 'revoked',
        foundingMemberRevokedDate: new Date().toISOString(),
        foundingMemberRevokedReason: reason || 'unknown',
        feedbackWarned: false,
        // Start 14-day trial for revoked member
        trialUser: true,
        trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    }, { merge: true });

    // Decrement founding member count to open spot
    db.collection('meta').doc('founding_members').set({
        count: firebase.firestore.FieldValue.increment(-1)
    }, { merge: true });
    foundingMemberCount = Math.max(0, foundingMemberCount - 1);

    // Notify owner that a spot opened
    db.collection('feedback_notifications').add({
        type: 'spot_opened',
        reason: reason,
        revokedUserUid: uid,
        revokedUserEmail: currentUser ? currentUser.email : '',
        date: new Date().toISOString(),
        ownerEmail: 'ereana.swan@gmail.com'
    }).catch(function(e) { console.error('Notification error:', e); });

    // Auto-promote next person on waitlist
    promoteNextWaitlistMember();

    if (reason === 'no_feedback') {
        showFeedbackRevokedNotice();
    } else {
        showFoundingMemberRevokedNotice();
    }
}
```

**Step 3: Add showFeedbackWarningModal function**

Add after revokeFoundingMemberStatus:
```javascript
function showFeedbackWarningModal(daysMissed) {
    var overlay = document.getElementById('feedbackWarningOverlay');
    if (!overlay) return;
    var daysEl = document.getElementById('feedbackWarningDays');
    if (daysEl) daysEl.textContent = daysMissed;
    overlay.classList.remove('hidden');
}

function showFeedbackRevokedNotice() {
    var overlay = document.getElementById('feedbackRevokedOverlay');
    if (overlay) overlay.classList.remove('hidden');
}
```

**Step 4: Reset feedbackWarned when feedback is submitted**

In `submitDailyFeedback()` at line 2570, add `feedbackWarned: false` to the user set:
```javascript
db.collection('users').doc(currentUser.uid).set({
    lastFeedbackDate: new Date().toISOString(),
    feedbackStreak: firebase.firestore.FieldValue.increment(1),
    lastActiveDate: new Date().toISOString(),
    feedbackWarned: false
}, { merge: true });
```

**Step 5: Commit**
```bash
git add app.js
git commit -m "feat: add 3-day feedback enforcement for founding members"
```

---

### Task 3: Waitlist Auto-Promotion

**Files:**
- Modify: `app.js` (add promoteNextWaitlistMember function)
- Modify: `app.js` (add congratulations modal handler on login)

**Step 1: Add promoteNextWaitlistMember function**

Add after the revokeFoundingMemberStatus function:
```javascript
function promoteNextWaitlistMember() {
    if (!firebaseReady) return;
    db.collection('waitlist').orderBy('joinDate', 'asc').limit(1).get()
        .then(function(snapshot) {
            if (snapshot.empty) return; // No one on waitlist
            var waitlistDoc = snapshot.docs[0];
            var waitlistData = waitlistDoc.data();
            var promotedUid = waitlistData.uid;

            if (!promotedUid) {
                // No uid stored — can't auto-promote, just notify owner
                return;
            }

            // Promote: set as founding member
            db.collection('users').doc(promotedUid).set({
                foundingMember: true,
                foundingMemberStatus: 'active',
                foundingMemberJoinDate: new Date().toISOString(),
                foundingMemberPromotedFromWaitlist: true,
                trialUser: false,
                feedbackStreak: 0,
                feedbackWarned: false,
                lastActiveDate: new Date().toISOString()
            }, { merge: true });

            // Increment founding member count
            db.collection('meta').doc('founding_members').set({
                count: firebase.firestore.FieldValue.increment(1)
            }, { merge: true });

            // Remove from waitlist
            waitlistDoc.ref.delete();

            // Notify owner about promotion
            db.collection('feedback_notifications').add({
                type: 'waitlist_promoted',
                promotedUid: promotedUid,
                promotedEmail: waitlistData.email || '',
                promotedName: waitlistData.displayName || '',
                date: new Date().toISOString(),
                ownerEmail: 'ereana.swan@gmail.com'
            }).catch(function(e) { console.error('Promotion notification error:', e); });
        })
        .catch(function(e) { console.error('Waitlist promotion error:', e); });
}
```

**Step 2: Add congratulations check on login (in onAuthReady)**

In the `registerFoundingMember()` function, after the user doc check, add a check for `foundingMemberPromotedFromWaitlist`:
```javascript
// Inside registerFoundingMember, where we check doc.data():
if (userData.foundingMember && userData.foundingMemberPromotedFromWaitlist) {
    // Show congrats on first login after promotion
    if (!localStorage.getItem('lwp_waitlist_congrats_' + uid)) {
        localStorage.setItem('lwp_waitlist_congrats_' + uid, '1');
        setTimeout(function() { showWaitlistPromotionCongrats(); }, 1500);
    }
}
```

**Step 3: Add congratulations modal function**
```javascript
function showWaitlistPromotionCongrats() {
    var overlay = document.getElementById('waitlistCongratsOverlay');
    if (overlay) overlay.classList.remove('hidden');
}
```

**Step 4: Commit**
```bash
git add app.js
git commit -m "feat: auto-promote waitlist members when founding spots open"
```

---

### Task 4: Pricing Modal UI (Replaces Old Upgrade Overlay)

**Files:**
- Modify: `index.html:1307-1391` (replace upgradeOverlay)
- Modify: `app.js:1429-1461` (showUpgradeModal, updateCheckoutLink)
- Modify: `app.js:1447` (CHECKOUT_BASE_URL — expand to 4 URLs)

**Step 1: Replace upgradeOverlay HTML in index.html**

Replace lines 1307-1391 with new 3-tier pricing modal:
```html
<div id="upgradeOverlay" class="modal-overlay hidden">
    <div class="modal pricing-modal">
        <button class="modal-close" onclick="document.getElementById('upgradeOverlay').classList.add('hidden')">&times;</button>
        <div class="pricing-header">
            <h2 class="pricing-title">Choose Your Plan</h2>
            <p class="pricing-subtitle" id="pricingSubtitle">Unlock more modes and unlimited outcomes</p>
            <div class="billing-toggle">
                <span class="billing-label" id="billingMonthlyLabel">Monthly</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="billingToggle">
                    <span class="toggle-slider"></span>
                </label>
                <span class="billing-label" id="billingAnnualLabel">Annual <span class="save-badge">Save up to 25%</span></span>
            </div>
        </div>
        <div class="pricing-cards">
            <!-- FREE -->
            <div class="pricing-card" data-tier="free">
                <div class="pricing-card-header">
                    <h3>Free</h3>
                    <div class="pricing-price">
                        <span class="price-amount">$0</span>
                        <span class="price-period">forever</span>
                    </div>
                </div>
                <ul class="pricing-features">
                    <li class="included">&#10003; Personal Life Mode</li>
                    <li class="included">&#10003; Up to 3 Outcomes</li>
                    <li class="included">&#10003; Daily Focus &amp; Streaks</li>
                    <li class="included">&#10003; 7 Core Badges</li>
                    <li class="excluded">&#10007; Health Mode</li>
                    <li class="excluded">&#10007; Business Mode</li>
                    <li class="excluded">&#10007; Finances Mode</li>
                    <li class="excluded">&#10007; Unlimited Outcomes</li>
                </ul>
                <button class="pricing-btn pricing-btn-free" id="btnPlanFree">Current Plan</button>
            </div>
            <!-- STARTER -->
            <div class="pricing-card pricing-card-popular" data-tier="starter">
                <div class="popular-badge">Most Popular</div>
                <div class="pricing-card-header">
                    <h3>Starter</h3>
                    <div class="pricing-price">
                        <span class="price-amount" id="starterPrice">$9.99</span>
                        <span class="price-period" id="starterPeriod">/month</span>
                    </div>
                    <div class="pricing-savings hidden" id="starterSavings">Save $21/year</div>
                    <div class="pricing-anchor">ADHD coaching: $200&ndash;500/mo</div>
                    <div class="pricing-compare">Less than 2 coffees a week</div>
                </div>
                <ul class="pricing-features">
                    <li class="included">&#10003; Personal Life Mode</li>
                    <li class="included highlight">&#10003; Health Mode</li>
                    <li class="included">&#10003; Unlimited Outcomes</li>
                    <li class="included">&#10003; All Features &amp; Badges</li>
                    <li class="included">&#10003; Wheel of Life + Health</li>
                    <li class="included">&#10003; Focus Timer &amp; Rituals</li>
                    <li class="excluded">&#10007; Business Mode</li>
                    <li class="excluded">&#10007; Finances Mode</li>
                </ul>
                <a id="starterCheckoutLink" href="#" target="_blank" rel="noopener" class="pricing-btn pricing-btn-starter">Get Starter &rarr;</a>
            </div>
            <!-- PRO -->
            <div class="pricing-card" data-tier="pro">
                <div class="pricing-card-header">
                    <h3>Pro</h3>
                    <div class="pricing-price">
                        <span class="price-amount" id="proPrice">$19.99</span>
                        <span class="price-period" id="proPeriod">/month</span>
                    </div>
                    <div class="pricing-savings hidden" id="proSavings">Save $61/year</div>
                    <div class="pricing-anchor">Just $10 more for everything</div>
                    <div class="pricing-compare">Less than 1 therapy session</div>
                </div>
                <ul class="pricing-features">
                    <li class="included">&#10003; Personal Life Mode</li>
                    <li class="included">&#10003; Health Mode</li>
                    <li class="included highlight">&#10003; Business Mode</li>
                    <li class="included highlight">&#10003; Finances Mode</li>
                    <li class="included">&#10003; Unlimited Outcomes</li>
                    <li class="included">&#10003; All Features &amp; Badges</li>
                    <li class="included">&#10003; All 4 Wheels</li>
                    <li class="included">&#10003; Everything unlocked</li>
                </ul>
                <a id="proCheckoutLink" href="#" target="_blank" rel="noopener" class="pricing-btn pricing-btn-pro">Get Pro &rarr;</a>
            </div>
        </div>
        <p class="pricing-guarantee">Cancel anytime &bull; 7-day money-back guarantee</p>
    </div>
</div>
```

**Step 2: Update JS pricing logic**

Replace the CHECKOUT_BASE_URL single URL with 4 placeholder URLs and add billing toggle logic:
```javascript
var CHECKOUT_URLS = {
    starter_monthly: 'https://myhabitmagic.lemonsqueezy.com/checkout/buy/STARTER_MONTHLY_PLACEHOLDER',
    starter_annual: 'https://myhabitmagic.lemonsqueezy.com/checkout/buy/STARTER_ANNUAL_PLACEHOLDER',
    pro_monthly: 'https://myhabitmagic.lemonsqueezy.com/checkout/buy/PRO_MONTHLY_PLACEHOLDER',
    pro_annual: 'https://myhabitmagic.lemonsqueezy.com/checkout/buy/PRO_ANNUAL_PLACEHOLDER'
};

function showPricingModal(lockedMode) {
    var overlay = document.getElementById('upgradeOverlay');
    if (!overlay) return;
    var subtitle = document.getElementById('pricingSubtitle');
    if (subtitle && lockedMode) {
        var modeNames = { business: 'Business', health: 'Health', finances: 'Finances' };
        subtitle.textContent = 'Upgrade to unlock ' + (modeNames[lockedMode] || lockedMode) + ' mode';
    } else if (subtitle) {
        subtitle.textContent = 'Unlock more modes and unlimited outcomes';
    }
    updatePricingButtons();
    overlay.classList.remove('hidden');
}

function updatePricingButtons() {
    var btnFree = document.getElementById('btnPlanFree');
    if (btnFree) {
        if (userTier === 'free') {
            btnFree.textContent = 'Current Plan';
            btnFree.disabled = true;
        } else {
            btnFree.textContent = 'Downgrade';
            btnFree.disabled = true; // Can't self-downgrade
        }
    }
}

function updateCheckoutLinks() {
    var isAnnual = document.getElementById('billingToggle') && document.getElementById('billingToggle').checked;
    var starterLink = document.getElementById('starterCheckoutLink');
    var proLink = document.getElementById('proCheckoutLink');
    var baseStarter = isAnnual ? CHECKOUT_URLS.starter_annual : CHECKOUT_URLS.starter_monthly;
    var basePro = isAnnual ? CHECKOUT_URLS.pro_annual : CHECKOUT_URLS.pro_monthly;
    var params = '';
    if (currentUser) {
        params = '?checkout[custom][uid]=' + encodeURIComponent(currentUser.uid);
        if (currentUser.email) {
            params += '&checkout[email]=' + encodeURIComponent(currentUser.email);
        }
    }
    if (starterLink) starterLink.href = baseStarter + params;
    if (proLink) proLink.href = basePro + params;
}
```

**Step 3: Add billing toggle handler**

In the DOMContentLoaded event bindings section:
```javascript
safeBind('billingToggle', 'change', function() {
    var isAnnual = this.checked;
    // Update prices
    var starterPrice = document.getElementById('starterPrice');
    var starterPeriod = document.getElementById('starterPeriod');
    var starterSavings = document.getElementById('starterSavings');
    var proPrice = document.getElementById('proPrice');
    var proPeriod = document.getElementById('proPeriod');
    var proSavings = document.getElementById('proSavings');

    if (isAnnual) {
        if (starterPrice) starterPrice.textContent = '$8.25';
        if (starterPeriod) starterPeriod.textContent = '/mo ($99/yr)';
        if (starterSavings) starterSavings.classList.remove('hidden');
        if (proPrice) proPrice.textContent = '$14.92';
        if (proPeriod) proPeriod.textContent = '/mo ($179/yr)';
        if (proSavings) proSavings.classList.remove('hidden');
    } else {
        if (starterPrice) starterPrice.textContent = '$9.99';
        if (starterPeriod) starterPeriod.textContent = '/month';
        if (starterSavings) starterSavings.classList.add('hidden');
        if (proPrice) proPrice.textContent = '$19.99';
        if (proPeriod) proPeriod.textContent = '/month';
        if (proSavings) proSavings.classList.add('hidden');
    }

    // Update billing labels
    document.getElementById('billingMonthlyLabel').classList.toggle('active', !isAnnual);
    document.getElementById('billingAnnualLabel').classList.toggle('active', isAnnual);

    updateCheckoutLinks();
});
```

**Step 4: Replace old showUpgradeModal/updateCheckoutLink calls**

- `showUpgradeModal()` at line 1429 → becomes `showPricingModal()`
- `updateCheckoutLink()` at line 1449 → becomes `updateCheckoutLinks()`
- Update all references to these functions across app.js
- Remove old `CHECKOUT_BASE_URL` single URL

**Step 5: Commit**
```bash
git add app.js index.html
git commit -m "feat: add 3-tier pricing modal with annual toggle and value anchors"
```

---

### Task 5: Pricing Cards CSS

**Files:**
- Modify: `styles.css` (add pricing modal styles at end)

**Step 1: Add all pricing CSS**

Add at the end of styles.css:
```css
/* ── Pricing Modal ─────────────────────── */
.pricing-modal {
    max-width: 820px;
    width: 95%;
    padding: 24px 20px;
}
.pricing-header {
    text-align: center;
    margin-bottom: 20px;
}
.pricing-title {
    font-size: 1.5rem;
    margin-bottom: 4px;
}
.pricing-subtitle {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 16px;
}
.billing-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 8px;
}
.billing-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    transition: color 0.2s;
}
.billing-label.active {
    color: var(--accent-primary);
    font-weight: 600;
}
.save-badge {
    background: var(--accent-green);
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 8px;
    margin-left: 4px;
}
.toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
    display: inline-block;
}
.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background: var(--bg-tertiary);
    border-radius: 24px;
    transition: 0.3s;
}
.toggle-slider:before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
}
.toggle-switch input:checked + .toggle-slider {
    background: var(--accent-primary);
}
.toggle-switch input:checked + .toggle-slider:before {
    transform: translateX(20px);
}

/* Pricing Cards Grid */
.pricing-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 16px;
}
.pricing-card {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: 16px;
    padding: 20px 16px;
    position: relative;
    display: flex;
    flex-direction: column;
}
.pricing-card-popular {
    border-color: var(--accent-primary);
    box-shadow: 0 0 20px rgba(108, 92, 231, 0.15);
    transform: scale(1.03);
}
.popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent-primary);
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.pricing-card-header {
    text-align: center;
    margin-bottom: 16px;
}
.pricing-card-header h3 {
    font-size: 1.1rem;
    margin-bottom: 8px;
}
.pricing-price {
    margin-bottom: 4px;
}
.pricing-price .price-amount {
    font-size: 2rem;
    font-weight: 800;
    color: var(--accent-primary);
}
.pricing-price .price-period {
    font-size: 0.8rem;
    color: var(--text-secondary);
}
.pricing-savings {
    color: var(--accent-green);
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 4px;
}
.pricing-anchor {
    font-size: 0.7rem;
    color: var(--text-secondary);
    text-decoration: line-through;
    margin-bottom: 2px;
}
.pricing-compare {
    font-size: 0.75rem;
    color: var(--accent-green);
    font-weight: 600;
}

/* Feature list */
.pricing-features {
    list-style: none;
    padding: 0;
    margin: 0 0 16px;
    flex: 1;
}
.pricing-features li {
    padding: 5px 0;
    font-size: 0.8rem;
    color: var(--text-secondary);
}
.pricing-features li.included {
    color: var(--text-primary);
}
.pricing-features li.highlight {
    color: var(--accent-primary);
    font-weight: 600;
}
.pricing-features li.excluded {
    opacity: 0.4;
}

/* Pricing buttons */
.pricing-btn {
    display: block;
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
}
.pricing-btn-free {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
}
.pricing-btn-free:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
.pricing-btn-starter {
    background: var(--accent-primary);
    color: white;
}
.pricing-btn-starter:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
}
.pricing-btn-pro {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-orange));
    color: white;
}
.pricing-btn-pro:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
}
.pricing-guarantee {
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

/* Mode locked styles */
.mode-toggle-btn.mode-locked {
    opacity: 0.5;
    position: relative;
}
.mode-toggle-btn.mode-locked::after {
    content: '🔒';
    font-size: 0.6rem;
    position: absolute;
    top: 2px;
    right: 4px;
}

/* Feedback warning modals */
.feedback-warning-modal,
.feedback-revoked-modal,
.waitlist-congrats-modal {
    max-width: 440px;
    text-align: center;
    padding: 32px 24px;
}

/* Mobile responsive */
@media (max-width: 768px) {
    .pricing-cards {
        grid-template-columns: 1fr;
        gap: 12px;
    }
    .pricing-card-popular {
        transform: none;
        order: -1;
    }
    .pricing-modal {
        padding: 16px 12px;
        max-height: 90vh;
        overflow-y: auto;
    }
    .pricing-price .price-amount {
        font-size: 1.6rem;
    }
}

/* Light mode */
.light-mode .pricing-card {
    background: #fff;
    border-color: #e0e0e0;
}
.light-mode .pricing-card-popular {
    border-color: var(--accent-primary);
}
.light-mode .toggle-slider {
    background: #ccc;
}
```

**Step 2: Commit**
```bash
git add styles.css
git commit -m "feat: add pricing cards CSS with responsive layout and billing toggle"
```

---

### Task 6: New Modal Overlays HTML (Feedback Warning, Revoked, Waitlist Congrats)

**Files:**
- Modify: `index.html` (add 3 new modal overlays near existing modals)

**Step 1: Add feedbackWarningOverlay**

Add after the existing `#revokedOverlay`:
```html
<!-- Feedback Warning Modal (3 days no feedback) -->
<div id="feedbackWarningOverlay" class="modal-overlay hidden">
    <div class="modal feedback-warning-modal">
        <button class="modal-close" onclick="document.getElementById('feedbackWarningOverlay').classList.add('hidden')">&times;</button>
        <div style="font-size:3rem;margin-bottom:12px">&#9888;&#65039;</div>
        <h2>Feedback Needed!</h2>
        <p>You haven&rsquo;t submitted daily feedback in <strong><span id="feedbackWarningDays">3</span> days</strong>.</p>
        <p style="margin-top:8px;color:var(--text-secondary);font-size:0.9rem">As a founding member, daily feedback is how you keep your free access. Complete 3+ actions today and submit your feedback to stay active.</p>
        <button class="btn-primary" onclick="document.getElementById('feedbackWarningOverlay').classList.add('hidden')" style="margin-top:16px">Got It &mdash; I&rsquo;ll Submit Today</button>
    </div>
</div>

<!-- Feedback Revoked Modal -->
<div id="feedbackRevokedOverlay" class="modal-overlay hidden">
    <div class="modal feedback-revoked-modal">
        <button class="modal-close" onclick="document.getElementById('feedbackRevokedOverlay').classList.add('hidden')">&times;</button>
        <div style="font-size:3rem;margin-bottom:12px">&#128532;</div>
        <h2>Founding Spot Released</h2>
        <p>Your founding member spot has been released because daily feedback wasn&rsquo;t submitted for multiple days.</p>
        <p style="margin-top:8px;color:var(--text-secondary);font-size:0.9rem">You now have a <strong>14-day free trial</strong> of all features. After that, choose a plan to continue.</p>
        <button class="btn-primary" onclick="document.getElementById('feedbackRevokedOverlay').classList.add('hidden')" style="margin-top:16px">Continue with Trial</button>
    </div>
</div>

<!-- Waitlist Promotion Congrats Modal -->
<div id="waitlistCongratsOverlay" class="modal-overlay hidden">
    <div class="modal waitlist-congrats-modal">
        <button class="modal-close" onclick="document.getElementById('waitlistCongratsOverlay').classList.add('hidden')">&times;</button>
        <div style="font-size:3rem;margin-bottom:12px">&#127881;&#127775;</div>
        <h2>You Got a Founding Spot!</h2>
        <p>A founding member spot just opened up and <strong>you&rsquo;re in!</strong></p>
        <p style="margin-top:8px;color:var(--text-secondary);font-size:0.9rem">You now have <strong>3&ndash;6 months free</strong> access to everything. Just keep using the app, give daily feedback, and your spot is secure.</p>
        <button class="btn-primary" onclick="document.getElementById('waitlistCongratsOverlay').classList.add('hidden')" style="margin-top:16px">Let&rsquo;s Go! &#128170;</button>
    </div>
</div>
```

**Step 2: Commit**
```bash
git add index.html
git commit -m "feat: add feedback warning, revoked, and waitlist congrats modal overlays"
```

---

### Task 7: Landing Page Pricing Section

**Files:**
- Modify: `index.html` (add pricing section between FAQ and final CTA)

**Step 1: Add pricing section to landing page**

Insert after the closing `</section>` of `.landing-faq` (line 322) and before the final CTA:
```html
<!-- Pricing Section -->
<section class="landing-pricing" id="landingPricing">
    <h2>Simple, Honest Pricing</h2>
    <p class="pricing-lead">Start free. Upgrade when you&rsquo;re ready. Built for ADHD brains on any budget.</p>
    <div class="landing-pricing-cards">
        <div class="landing-price-card">
            <h3>Free</h3>
            <div class="landing-price">$0</div>
            <div class="landing-price-desc">forever</div>
            <ul>
                <li>&#10003; Personal Life Mode</li>
                <li>&#10003; Up to 3 Goals</li>
                <li>&#10003; Daily Focus &amp; Streaks</li>
                <li>&#10003; Core Badges</li>
            </ul>
        </div>
        <div class="landing-price-card popular">
            <div class="popular-tag">Best Value</div>
            <h3>Starter</h3>
            <div class="landing-price">$9.99<span>/mo</span></div>
            <div class="landing-price-desc">or $99/year <strong>(save $21)</strong></div>
            <div class="landing-price-effective">That&rsquo;s $8.25/mo &mdash; less than 2 coffees</div>
            <ul>
                <li>&#10003; Life + Health Modes</li>
                <li>&#10003; Unlimited Goals</li>
                <li>&#10003; All Features &amp; Badges</li>
                <li>&#10003; Focus Timer &amp; Rituals</li>
            </ul>
            <div class="landing-price-anchor">ADHD coaching: $200&ndash;500/mo. You pay $9.99.</div>
        </div>
        <div class="landing-price-card">
            <h3>Pro</h3>
            <div class="landing-price">$19.99<span>/mo</span></div>
            <div class="landing-price-desc">or $179/year <strong>(save $61)</strong></div>
            <div class="landing-price-effective">$14.92/mo &mdash; less than 1 therapy session</div>
            <ul>
                <li>&#10003; All 4 Modes unlocked</li>
                <li>&#10003; Business + Finances</li>
                <li>&#10003; Unlimited Everything</li>
                <li>&#10003; All 4 Life Wheels</li>
            </ul>
            <div class="landing-price-anchor">Just $10 more for double the modes</div>
        </div>
    </div>
    <p class="landing-pricing-note">&#127775; Or become a <strong>Founding Member</strong> &mdash; get everything free for 3&ndash;6 months. Just give daily feedback.</p>
</section>
```

**Step 2: Add landing pricing CSS**

Add to styles.css:
```css
/* ── Landing Pricing Section ──────────── */
.landing-pricing {
    max-width: 860px;
    margin: 0 auto;
    padding: 48px 20px;
    text-align: center;
}
.landing-pricing h2 {
    font-size: 1.8rem;
    margin-bottom: 8px;
}
.pricing-lead {
    color: var(--text-secondary);
    margin-bottom: 32px;
    font-size: 1rem;
}
.landing-pricing-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 24px;
}
.landing-price-card {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: 16px;
    padding: 28px 20px;
    text-align: center;
    position: relative;
}
.landing-price-card.popular {
    border-color: var(--accent-primary);
    transform: scale(1.05);
    box-shadow: 0 4px 24px rgba(108, 92, 231, 0.2);
}
.landing-price-card .popular-tag {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent-primary);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 4px 16px;
    border-radius: 20px;
    text-transform: uppercase;
}
.landing-price-card h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
}
.landing-price {
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--accent-primary);
}
.landing-price span {
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--text-secondary);
}
.landing-price-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 4px;
}
.landing-price-effective {
    font-size: 0.8rem;
    color: var(--accent-green);
    font-weight: 600;
    margin-bottom: 12px;
}
.landing-price-card ul {
    list-style: none;
    padding: 0;
    margin: 12px 0;
    text-align: left;
}
.landing-price-card ul li {
    padding: 4px 0;
    font-size: 0.85rem;
}
.landing-price-anchor {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-style: italic;
    margin-top: 8px;
    border-top: 1px solid var(--border-color);
    padding-top: 8px;
}
.landing-pricing-note {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-top: 16px;
}

@media (max-width: 768px) {
    .landing-pricing-cards {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    .landing-price-card.popular {
        transform: none;
        order: -1;
    }
}
```

**Step 3: Update FAQ to mention pricing tiers**

Update the FAQ item about "What happens after the free period?" (line 314):
```html
<div class="faq-q">What happens after the free period?</div>
<div class="faq-a">Active founding members get locked in at a special grandfather price. Regular users choose between Free (1 mode, 3 goals), Starter at $9.99/mo (Life + Health), or Pro at $19.99/mo (all 4 modes). Annual plans save up to 25%.</div>
```

**Step 4: Commit**
```bash
git add index.html styles.css
git commit -m "feat: add landing page pricing section with Hormozi value anchors"
```

---

### Task 8: Build, Deploy, Verify

**Files:**
- Modify: `index.html:34,1666` (bump cache params to r8)
- Run: `bash build.sh`

**Step 1: Bump cache params**

Change `?v=20260214r7` to `?v=20260214r8` on both lines 34 and 1666.

**Step 2: Build**
```bash
bash build.sh
```

**Step 3: Commit all built files**
```bash
git add app.js app.min.js index.html styles.css styles.min.css sw.js
git commit -m "build: pricing tiers, mode locking, feedback enforcement, waitlist promotion"
```

**Step 4: Push to master**
```bash
git push origin HEAD:master
```

**Step 5: Verify deployment**
- Check https://myhabitmagic.com loads
- Verify pricing section on landing page
- Test mode locking (free user tapping Business should show pricing modal)

---

## Summary of All Tasks

| Task | Description | Files |
|------|-------------|-------|
| 1 | Expand userTier + mode locking | app.js |
| 2 | 3-day feedback enforcement | app.js |
| 3 | Waitlist auto-promotion | app.js |
| 4 | Pricing modal UI (replace old upgrade) | index.html, app.js |
| 5 | Pricing cards CSS | styles.css |
| 6 | New modal overlays HTML | index.html |
| 7 | Landing page pricing section | index.html, styles.css |
| 8 | Build + Deploy | all files |
