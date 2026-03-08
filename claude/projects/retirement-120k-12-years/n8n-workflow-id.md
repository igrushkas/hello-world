# Retirement Intelligence Brief — n8n Workflow

Workflow ID: p3kTzRpXQCgXr1jZ
URL: https://habits.app.n8n.cloud/workflow/p3kTzRpXQCgXr1jZ
Schedule: 7am, 12pm, 6pm (America/New_York)
Status: Active

## One-time setup required

**Add Anthropic API credential in n8n:**
1. Go to https://habits.app.n8n.cloud/credentials
2. Click "Add credential" → search "Header Auth"
3. Name: `Anthropic API Key`
4. Name field: `x-api-key`
5. Value: your Anthropic API key (from ~/.claude.json)
6. Save → open the workflow → click "Claude API Analysis" node → assign this credential

## Nodes
1. Schedule Trigger — fires 7am, 12pm, 6pm ET
2. Fetch Reuters RSS — business headlines
3. Fetch CNBC RSS — markets headlines
4. Fetch Yahoo Finance RSS — finance headlines
5. Merge Reuters CNBC — combines feeds 1+2
6. Merge All RSS — combines all 3 feeds
7. Parse Headlines and Build Prompt — extracts titles, builds Claude prompt (morning run adds TOP PERFORMERS section)
8. Claude API Analysis — claude-sonnet-4-6 demand signal analysis
9. Send Retirement Brief — sends to ereana.swan@gmail.com

## Debug
- n8n → Executions → filter "Retirement Intelligence Brief"
- If Claude API fails: check Anthropic credential is attached to node 8
- If Gmail fails: Gmail account 4 (id: 4zVzKv1QhR3JbaeX) should already be working
