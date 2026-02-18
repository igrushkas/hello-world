# ADHD-Friendly App Design Principles
## Research-Backed Recommendations for HabitMagic
### Compiled: 2026-02-18

---

## 1. CHOICES & COGNITIVE LOAD

### How many options on screen at once?
- **3-4 options maximum** per decision point (Hick's Law). More causes decision paralysis.
- **3 priority tasks per day** ("Three Things" system) -- not 5, not 10. Forces prioritization.
- **3-5 bottom tab bar items** for navigation. This is the sweet spot.
- **Fewer than 5 form fields** per screen yields highest completion rates.
- **5-7 colors maximum** in any color-coding system to prevent cognitive overload.

### Progressive Disclosure
- Only show what's needed NOW. Hide advanced options behind "more" or expandable sections.
- Each "next" button tap gives a small dopamine boost -- breaking flows into steps feels like progress.
- Reveal additional form fields only based on prior user input.

### What to keep visible vs. hide
- **Always visible:** Primary CTA, current task, navigation, progress indicators.
- **Hidden but accessible:** Settings, advanced options, historical data.
- **Critical rule:** For ADHD brains, out of sight = out of mind. Important actions must stay visible.

---

## 2. GAMIFICATION: WHAT WORKS VS. WHAT OVERWHELMS

### What Works
- **Immediate, frequent rewards** -- points, XP, visual feedback the MOMENT a task is completed (not delayed).
- **Multiple reward types** -- completion rewards, progress rewards, discovery rewards, social rewards. Variety prevents habituation.
- **Variable reinforcement** -- unpredictable but frequent rewards (like video games). Most powerful behavioral conditioning.
- **Visual progress** -- streak counters, level-up systems, progress bars that transform abstract goals into concrete visuals.
- **"Safe urgency"** -- time-based incentives that create just enough pressure to activate attention without triggering shutdown.
- **Care-based metaphors** (Finch model) -- motivation through affection/care rather than fear of losing streaks.
- **Social accountability** (Habitica parties) -- ADHD brains often respond better to helping others than helping themselves.

### What Overwhelms / Fails
- **Punishment mechanics** (red marks, lost streaks, health damage) -- causes anxiety and app abandonment.
- **Novelty-dependent systems** -- pure RPG mechanics (Habitica) lose their dopamine hit once novelty fades. One ADHD user: "one system works for 2 days, 2 weeks, 2 months, then I fall off."
- **Excessive visual/audio feedback** -- flashing, constant alerts overwhelm ADHD sensory sensitivity.
- **Streak-anxiety** -- apps that make you feel terrible for missing a day cause complete abandonment.
- **Extrinsic-only motivation** -- if rewards don't connect to intrinsic meaning, engagement collapses.
- **Creating tasks just to earn points** -- shifts focus from real productivity to gaming the system.

### The Right Balance
- Gamification should create an environment where the brain feels safe and motivated enough to BEGIN, not trick users.
- The metaphor must align with the app's purpose (Finch: care for bird = care for self; Habitica: fight monsters =/= build habits).
- Non-punitive design: nothing turns red, nothing gets marked as "failed" (Tiimo's approach).
- Reward consistent effort, not overuse. Limit session lengths, promote breaks.

---

## 3. ONBOARDING

### Core Principles
- **One task at a time** -- walk users through first steps before giving full dashboard access.
- **Progressive onboarding** -- start with basics, introduce complexity later in the user journey.
- **Maximum 3 features highlighted** initially, even if the app has many more.
- **Allow skipping** -- mandatory lengthy flows feel trapping to ADHD users.
- **Personalization quiz early** -- collect preferences to tailor experience (Tiimo does this well).
- **Checklists** -- break onboarding into short steps. Users who complete onboarding checklists convert 3x more.
- **Progress indicators** -- show how far along they are to manage expectations.

### Key Insight
From 80k ADHD coaching sessions (Shimmer/Indy): "Knowing what to do is rarely the problem -- the harder problem is actually doing it consistently over time." Onboarding should lead to sustainable engagement, not just initial understanding.

### What NOT to do
- Don't dump all features at once.
- Don't require lengthy setup before any value is delivered.
- Don't use jargon or complex explanations.
- Don't autoplay tutorial videos.

---

## 4. NAVIGATION PATTERNS

### Bottom Tab Bar (Best Choice)
- **3-5 tabs** for core features -- always visible, always accessible.
- Persistent visibility helps users with working memory challenges know where they are.
- Simple, recognizable icons WITH text labels (icons alone are ambiguous).
- Large touch targets in the thumb-friendly zone (bottom of screen).
- Consistent across all screens so users always know where they are.

### Why NOT Hamburger Menus
- "Out of sight, out of mind" -- hidden navigation increases cognitive load.
- ADHD users need constant visual cues for orientation.
- Hamburger menus require extra taps and working memory.

### Navigation Rules
- **Consistent, predictable layouts** -- avoid sudden layout changes or unexpected pop-ups.
- **Clear, logical pathways** -- avoid unnecessary clicks.
- **Never bury important actions** in submenus or tooltips.

---

## 5. FORMS & INPUT

### Reduce Friction
- **Minimize typing** -- use selections, toggles, sliders, voice input where possible.
- **Fewer than 5 fields** per form.
- **Single-column layout** -- easier to scan and complete.
- **Labels above fields** (not inside) -- context remains visible when typing.
- **Auto-save everything** -- ADHD users get distracted mid-form; progress must not be lost.
- **Smart defaults and autofill** -- reduce decisions and typing.
- **Appropriate mobile keyboards** -- numeric for numbers, email for email, etc.

### Validation
- **Inline, real-time validation** -- don't wait until form submission.
- **Error messages next to the relevant field** -- not at the top of the page.
- **Touch targets minimum 44px** for easy tapping.

### ADHD-Specific
- **Prefill values** when possible -- reduce the cognitive burden of recall.
- **Focus mode** during forms -- minimize non-essential elements.
- **Progress indicators** for multi-step forms.
- **Allow saving partial progress** and resuming later.

---

## 6. VISUAL DESIGN

### Color
- **Soft hues, minimal saturation** for backgrounds -- avoid overstimulation.
- **5-7 color palette maximum** for any coding/categorization system.
- **Neutral backgrounds with strategic color accents** -- visual interest without overwhelm.
- **Avoid large areas of red/orange/yellow** -- can increase agitation/hyperactivity.
- **Always offer dark mode** -- reduces light sensitivity and visual strain.
- **High-contrast mode option** for accessibility.
- **Consistent palette throughout** -- sudden color changes are distracting.
- **Color-coding is powerful** -- Tiimo uses 3,000+ colors with custom icons for personalization.

### Typography
- **Sans-serif fonts**: Arial, Verdana, Lexend, or similar clean typefaces.
- **16px minimum** for body text; 18-20px preferred for reduced cognitive load.
- **1.4-1.6x line height** (line spacing relative to font size).
- **Maximum 70 characters per line**.
- **1-2 font families maximum** throughout the app.
- **Medium weight** -- not too bold, not too light.
- **No italics or underlines** for emphasis -- use bold or color instead.
- **Generous letter and word spacing**.
- **Offer OpenDyslexic font option** (Tiimo does this).

### Spacing & Layout
- **Generous white space** -- gives eyes room to rest and reduces visual overwhelm.
- **Short paragraphs, bullet points, subheadings** -- chunk content into digestible pieces.
- **Consistent grid alignment** -- predictable structure reduces cognitive load.
- **Clear visual hierarchy** -- primary actions are immediately obvious.
- **Collapsible sections** for optional detail.

### Animation & Motion
- **Subtle and purposeful only** -- avoid autoplay, flashing, constant movement.
- **Provide "reduce motion" option**.
- **No autoplay videos or pop-ups**.
- **Small celebratory moments** are okay (Tiimo's confetti on task creation) -- but brief and contained.

---

## 7. TASK PRIORITIZATION & "JUST START" MECHANISMS

### Task Prioritization
- **"Three Things" system** -- show maximum 3 priority tasks for today, not the full backlog.
- **AI auto-prioritization** -- analyze deadlines, importance, and user parameters to surface the most critical task. Remove the "what should I do?" decision.
- **Single next action visible** -- "Here's what to do next" is more powerful than "Here are 47 things to do."
- **Context-rich task names** -- "Write introduction paragraph for quarterly report" not "Work on report."
- **Smart defaults** with a "recommended" badge on the suggested next action.

### "Just Start" Mechanisms
- **Micro-starts over full completion** -- the goal is to BEGIN, not finish. "Just do 2 minutes" lowers the barrier.
- **AI task breakdown** -- convert overwhelming tasks into tiny, actionable steps (Goblin Tools' "Magic ToDo" with adjustable granularity/"spiciness").
- **Artificial urgency** -- Pomodoro timers create psychological pressure that jumpstarts the dopamine system.
- **Remove the blank page** -- show what comes next rather than an empty list. Tiimo's visual timeline does this: instead of a long list, it shows the next thing.
- **Body regulation prompts** -- "Take 3 deep breaths before starting" or "Stand up and stretch" because if the body is dysregulated, the brain resists starting.
- **Pleasure pairing** -- allow users to pair unpleasant tasks with enjoyable activities (e.g., "Listen to your favorite podcast while doing dishes").
- **Externalize thinking** -- get tasks out of the brain and into the world. Reduces working memory overload so executive function can actually work.

### What NOT to Do
- Don't rely on willpower -- "just start" as a message doesn't work. It's like telling someone with a broken ankle to walk it off.
- Don't show the full backlog -- overwhelming task lists cause paralysis.
- Don't make planning itself a cognitively expensive task.

---

## 8. TIME BLINDNESS & TIME MANAGEMENT

### Design Patterns
- **Visual timelines** (Tiimo, Structured) -- show time as spatial blocks, not abstract lists.
- **Visual countdown timers** -- make time passage concrete and visible.
- **Concrete time references** -- "15 minutes" not "soon" or "later." Vague time words are meaningless for ADHD.
- **Duration estimates on tasks** -- help users understand how long things actually take.
- **Transition support** -- visual/audio cues that signal "time to switch to the next thing."
- **Live Activities / widgets** -- keep time awareness persistent even outside the app (Tiimo uses Dynamic Island).

---

## 9. WHAT TOP APPS DO WELL (Competitive Landscape)

### Tiimo (2025 iPhone App of the Year)
- Visual color-coded timeline (not a list)
- Non-punitive: nothing turns red or "fails"
- AI task breakdown into micro-steps
- 3,000+ colors and custom icons for personalization
- Visual focus timers
- OpenDyslexic font option
- Mood tracking alongside tasks
- Confetti micro-interactions for delight
- Scandinavian minimalist design
- **Weakness:** Not for complex project management; early hard paywall

### Habitica
- RPG gamification (XP, gold, pets, mounts, quests)
- Social accountability (parties, team health)
- Difficulty levels on tasks for proportional rewards
- **Weakness:** Novelty fades; RPG metaphor misaligned with habit-building; can feel punitive (health loss)

### Finch
- Care-based gamification (nurture a bird)
- No streak anxiety -- motivation through affection, not obligation
- Very low-pressure, simple tasks ("Drink water," "Step outside")
- Gamification aligned with core purpose (care for bird = care for self)
- **Weakness:** Only for self-care, not work/complex tasks

### Goblin Tools
- AI task breakdown with adjustable granularity ("spiciness" slider)
- Brilliant for task initiation/paralysis
- **Weakness:** Standalone tool -- context switching to/from it is an ADHD trap

### Structured
- Visual day timeline fighting time blindness
- Clear transition cues
- **Weakness:** Less flexible for non-routine tasks

### Inflow
- Built by people with ADHD
- Teaches strategies, not just tools
- Focuses on understanding your own brain
- **Weakness:** More educational than operational

---

## 10. DESIGN PRINCIPLES SUMMARY (The HabitMagic Playbook)

1. **Fewer choices, smarter defaults.** 3 priority tasks. 3-5 nav items. 5 form fields max.
2. **Show the next thing, not everything.** Single next action > full backlog.
3. **Reward immediately and variably.** Points on completion, surprise bonuses, visual progress.
4. **Never punish.** No red marks, no streak death, no failure states. Missed a day? Welcome back.
5. **Break it down automatically.** AI micro-step generation with adjustable granularity.
6. **Make time visible.** Visual timelines, countdown timers, duration estimates. No vague words.
7. **Minimize input friction.** Auto-save, smart defaults, voice input, minimal typing.
8. **Keep navigation visible and simple.** Bottom tab bar, 3-5 items, icons + labels.
9. **Onboard progressively.** One feature at a time, allow skipping, personalize early.
10. **Calm visual design.** Soft colors, generous spacing, sans-serif fonts, optional dark mode.
11. **Support the body, not just the mind.** Regulation prompts before task initiation.
12. **Align gamification metaphor with purpose.** The reward system must feel meaningful, not gimmicky.
13. **Personalize everything possible.** Colors, themes, density, font, notification preferences.
14. **Design for re-engagement, not retention.** Users will leave. Make coming back feel safe, not shameful.

---

## Sources

- [Software Accessibility for ADHD Users](https://www.carlociccarelli.com/post/software-accessibility-for-users-with-attention-deficit-disorder)
- [Neurodiversity in UX - Inclusive Design Principles](https://www.aufaitux.com/blog/neuro-inclusive-ux-design/)
- [UX Design for ADHD: When Focus Becomes a Challenge](https://medium.com/design-bootcamp/ux-design-for-adhd-when-focus-becomes-a-challenge-afe160804d94)
- [UXPA: Designing for ADHD in UX](https://uxpa.org/designing-for-adhd-in-ux/)
- [UI/UX for ADHD: Designing Interfaces That Help Students](https://din-studio.com/ui-ux-for-adhd-designing-interfaces-that-actually-help-students/)
- [Software Accessibility for ADHD - UX Collective](https://uxdesign.cc/software-accessibility-for-users-with-attention-deficit-disorder-adhd-f32226e6037c)
- [Inclusive UX/UI for Neurodivergent Users](https://medium.com/design-bootcamp/inclusive-ux-ui-for-neurodivergent-users-best-practices-and-challenges-488677ed2c6e)
- [Tiimo: Best ADHD Apps 2025](https://www.tiimoapp.com/resource-hub/best-adhd-apps-2025)
- [Saner.ai: ADHD Organization Tools 2026](https://blog.saner.ai/adhd-organization-tools-for-adults/)
- [Saner.ai: Best ADHD Task Management Apps](https://blog.saner.ai/best-adhd-task-management-apps/)
- [Morgen: ADHD Productivity Apps 2026](https://www.morgen.so/blog-posts/adhd-productivity-apps)
- [Inflow: Best Apps for ADHD 2025](https://www.getinflow.io/post/best-apps-for-adhd)
- [Tiimo: Gamification and ADHD](https://www.tiimoapp.com/resource-hub/gamification-adhd)
- [Imaginovation: Gamification in ADHD Apps](https://imaginovation.net/blog/gamification-adhd-apps-user-retention/)
- [Edge Foundation: ADHD and Gamification](https://edgefoundation.org/when-you-have-adhd-and-need-motivation-turn-your-life-into-a-game/)
- [AFFiNE: Gamified To-Do List Apps for ADHD](https://affine.pro/blog/gamified-to-do-list-apps-adhd)
- [MagicTask: Gamified Task Management for ADHD](https://magictask.io/blog/gamified-task-management-adhd-focus-productivity/)
- [Dopamine-Driven Marketing: ADHD Reward Systems](https://winsomemarketing.com/marketing-and-autism/dopamine-driven-marketing-understanding-adhd-reward-systems/)
- [ADHD Centre: Gamification and Focus](https://www.adhdcentre.co.uk/adhd-gamification-and-its-role-in-boosting-focus-and-learning/)
- [FocusBear: ADHD Accessibility in App Design](https://www.focusbear.io/blog-post/adhd-accessibility-designing-apps-for-focus)
- [LinkedIn: Mobile App Design Tips for ADHD](https://www.linkedin.com/advice/1/what-some-design-tips-mobile-apps-optimized-adhd-bptrf)
- [CHADD: Apps for Executive Function Challenges](https://chadd.org/wp-content/uploads/2018/06/ATTN_12_14_APPSforEFChallenges.pdf)
- [iubenda: Best Fonts for ADHD](https://www.iubenda.com/en/help/184233-adhd-font/)
- [AudioEye: Best Fonts for ADHD](https://www.audioeye.com/post/best-fonts-for-adhd/)
- [Well Built Places: Color Design for ADHD](https://wellbuiltplaces.org/2024/08/03/best-practices-for-design-and-use-of-colour-focus-on-adhd/)
- [AFFiNE: Color Coding for ADHD Planners](https://affine.pro/blog/color-coding-system-for-adhd-planners)
- [SaskADHD: Task Initiation Strategies](https://saskadhd.com/adhd-task-initiation-evidence-based-strategies-that-actually-work/)
- [Executive Function Toolkit: Task Initiation](https://executivefunctiontoolkit.com/2025/12/18/3-task-initiation-strategies-adhd-task-paralysis-worksheet/)
- [Naavik: New Horizons in Habit-Building Gamification](https://naavik.co/deep-dives/deep-dives-new-horizons-in-gamification/)
- [Gamification+: Best Gamified Habit App 2026](https://gamificationplus.uk/which-gamified-habit-building-app-do-i-think-is-best-in-2026/)
- [Choosing Therapy: Habitica Review](https://www.choosingtherapy.com/habitica-app-review/)
- [Shortcut.io: Tab Bar Navigation](https://shortcut.io/tech/app-navigation-the-tab-bar-is-probably-the-best-choice/)
- [Tiimo Product Page](https://www.tiimoapp.com/product)
- [ScreensDesign: Tiimo Showcase](https://screensdesign.com/showcase/tiimo-ai-plan-focus-to-do)
- [Skipper: Tab Management for ADHD](https://www.skipper.co/)
