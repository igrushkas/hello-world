# Daily Workflow — Irina's Executive OS

## Morning (15-20 min)

1. **Read the Daily Brief** (when n8n AIOS is live)
   - Open Telegram or email for "Daily Irina Brief"
   - Note: Legal/admin updates, money snapshot, AiAnswerNow leads, top 5 actions

2. **Open this Claude Code project**
   - Claude auto-loads CLAUDE.md and knows your full context
   - Say: "Good morning. What's my top priority today?"
   - Claude will read `claude/context/current-priorities.md` and relevant project READMEs
   - Confirm or adjust today's focus

3. **Set your 3 non-negotiables for today**
   - One revenue action (AiAnswerNow or Habit Magic)
   - One legal/financial action (Schwab, Belka, dentist, options, retirement)
   - One build/technical action (any repo)

4. **Wealth check** (2 min)
   - Is the monthly DCA still running? (Schwab auto-invest)
   - Any market drop >5%? → consider accelerating next purchase from dip reserve
   - Intelligence brief in email? → read it, note the signal

---

## During the day

**When you have new information on any case or project:**
> "Add this to [project]: [paste email/note/info]"
- Claude uses the evidence-organizer skill and updates evidence.md + README

**When you need legal/admin research:**
> "Use the legal-research skill for [project]: [question]"

**When you need content for AiAnswerNow:**
> "Use the content-campaign skill for aianswernow: [request]"

**When you need financial modeling:**
> "Use the financial-modeling skill for retirement/options: [inputs]"

**For any project update:**
> "Update the [project] README: [what changed]"

---

## Evening (10-15 min)

1. **Update project statuses**
   - For each project touched today, update the README "Current status" and "Next actions"
   - Command: "Update [project] status: [what happened today, what's next]"

2. **Log decisions**
   - Any significant choice made today goes in `claude/decisions/decision-log.md`
   - Command: "Log a decision for [project]: [decision and rationale]"

3. **Update current-priorities.md**
   - Did anything change in priority? New blockers?
   - Command: "Update current-priorities.md: [changes]"

4. **Quick tomorrow prep**
   - End with: "What should I focus on tomorrow given what happened today?"
   - Claude reads the updated files and gives a focused answer

---

## Daily Wealth Check (5 min, morning — non-negotiable)

**Retirement intelligence brief** (once live, auto-delivered to email):
- Market signal: BUY / HOLD / WATCH (smart money activity)
- Historical pattern match: what does today look like in history?
- Action: anything to buy/sell/move today?
- DCA check: is the 15th auto-invest set and running?

**Intelligence brief is now LIVE** — auto-delivered to ereana.swan@gmail.com at 7am, 12pm, 6pm ET.

**When you see the email and want to go deeper:**
> "Run market intel" — Claude does live web search and gives you deeper demand signal analysis

**To manually trigger a check anytime:**
> "Market check" or "Retirement intel check"

---

## Weekly (Friday, 30 min)

1. Review each project README — are statuses current?
2. Review decision-log.md — anything that needs follow-up?
3. AiAnswerNow: review content calendar and pipeline numbers
4. **Retirement (every Friday):**
   - Are DCA auto-purchases running? ($14,500/mo in LLC, $5K/mo from Marcus until done)
   - Any market event that triggers the "Buy the Dip" reserve? (deploy if -10%+)
   - Rebalance check: any fund drifted >5% from 25%?
5. Options trades: log every trade in Selling Options LLC tracker

---

## How to use skills

| Command | Skill invoked |
|---------|--------------|
| "Legal research for [project]: [question]" | legal-research |
| "Organize this evidence for [project]: [text]" | evidence-organizer |
| "Model my retirement with [inputs]" | financial-modeling |
| "Model options milestone with [inputs]" | financial-modeling |
| "Create content for AiAnswerNow: [request]" | content-campaign |
