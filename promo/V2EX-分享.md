# 分享一个 Claude Code 效率工具：说人话自动安装技能

用 Claude Code 的朋友遇到过这个痛点吗——

你想让 Claude 帮你生成 PDF，但它需要先用 `/plugin install pdf` 手动装技能。你得先知道有 pdf 这个技能名，再去手动装。

我写了个开源工具解决这个问题：

**Skill Auto-Installer** — 双层匹配架构（Hook 正则预扫 + Claude 语义分析），你只需要说"帮我生成一份 PDF 报告"，它自动：
1. 分析意图 → 匹配到 pdf 技能
2. 检查本地 → 发现没装
3. 搜索市场 → 找到并自动安装
4. 调用技能 → 完成你的任务

全程零手动。支持 17 种意图域（PDF/Excel/PPT/Word/前端设计/Canvas/品牌设计/MCP开发 等）。

GitHub: https://github.com/maimai-dot/skill-auto-installer

已经提了 PR 到 Anthropic 官方技能市场，求 star 和反馈 🙏
