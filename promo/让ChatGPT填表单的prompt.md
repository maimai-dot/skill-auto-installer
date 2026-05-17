帮我填一个表单。表单地址是：https://claude.ai/settings/plugins/submit

打开这个页面后，按以下内容填写每个字段：

---

## 插件名称
skill-auto-installer

## 简介（Description）
Natural language intent analysis → skill recommendation → auto-install. Claude analyzes what you want, discovers matching skills from marketplaces, and installs them silently so they're ready to use immediately. Supports 17 intent domains including PDF, Excel, PPT, Word, frontend design, MCP builder, Claude API, and more.

## 仓库地址（Repository URL）
https://github.com/maimai-dot/skill-auto-installer

## 作者（Author）
QM152

## License
MIT

## 关键词/标签（Keywords/Tags，如果有的话）
claude-code, skill, auto-install, intent-analysis, meta-skill, marketplace, natural-language

## 功能亮点（Features）
- Natural language intent analysis across 17 domains
- Dual-layer matching: Hook (regex, ~ms) + Skill (semantic, ~s)
- Silent background install from registered marketplaces
- Batch install support — one sentence can trigger multiple skills
- Zero configuration required after install

## 使用演示（Usage Demo）
User says: "Help me generate a PDF report from this data"

How it works:
1. [Intent Analysis] detects "PDF" keyword → pdf skill needed
2. [Install Check] pdf skill not installed
3. [Marketplace Search] found pdf/ in marketplace
4. [Auto Install] installs pdf skill silently
5. [Skill Invocation] pdf skill generates the report

The user sees: A completed PDF. Zero manual steps.
