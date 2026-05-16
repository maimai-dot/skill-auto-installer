# I built a meta-skill for Claude Code that auto-installs skills based on natural language intent

**TL;DR:** You say "generate a PDF report" — it automatically finds the `pdf` skill, installs it, and uses it. No `/plugin install` needed. [GitHub](https://github.com/maimai-dot/skill-auto-installer)

## The Problem

Claude Code has a powerful skill system with 17+ specialized skills (PDF generation, Excel analysis, frontend design, MCP building, etc.). But the UX is broken:

1. You need to KNOW a skill exists
2. You need to manually install it (`/plugin install pdf`)
3. Then switch context back to your task

## What I Built

**Skill Auto-Installer** — a meta-skill + hook combo that intercepts your prompts and auto-installs matching skills before Claude processes them.

```
Input:  "Create a PDF report from this data"
Output: A beautiful PDF. Zero manual steps.

Under the hood (all automatic):
  [Intent Analysis] "PDF" detected → pdf skill needed
  [Check] pdf not installed → searching marketplaces
  [Install] cp -r marketplace/pdf → ~/.claude/skills/pdf
  [Execute] invokes pdf skill with your original request
```

## Architecture

**Dual-layer matching** for speed + accuracy:

| Layer | Mechanism | Latency | Accuracy |
|-------|-----------|---------|----------|
| Hook (pre-scan) | Regex keyword matching | ~ms | Medium |
| Skill (deep) | Claude semantic analysis | ~s | High |

The hook pre-installs obvious matches before Claude even sees the prompt. The skill handles ambiguous cases with semantic understanding.

## Supported Intent Domains (17 total)

pdf, xlsx, pptx, docx, frontend-design, algorithmic-art, canvas-design, brand-guidelines, theme-factory, mcp-builder, claude-api, webapp-testing, web-artifacts-builder, slack-gif-creator, internal-comms, doc-coauthoring, skill-creator

## Links

- **GitHub:** https://github.com/maimai-dot/skill-auto-installer
- **PR to anthropics/skills:** https://github.com/anthropics/skills/pull/1146

Would love feedback from the community. What other intent→skill mappings would be useful?
