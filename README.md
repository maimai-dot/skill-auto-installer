# Skill Auto-Installer

**说人话，自动装技能，直接帮你干活。**

[![GitHub stars](https://img.shields.io/github/stars/maimai-dot/skill-auto-installer?style=social)](https://github.com/maimai-dot/skill-auto-installer)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![PR to anthropics/skills](https://img.shields.io/badge/anthropics-skills%20PR%20%231146-blue)](https://github.com/anthropics/skills/pull/1146)

> 如果你也觉得每次手动 `/plugin install xxx` 很烦，给个 ⭐ 支持一下

---

## 效果

```
你说：         "帮我把这份数据生成一个 PDF 报告"

Claude 内部：
  1. [意图分析] 检测到 "PDF" → 需要 pdf 技能
  2. [检查安装] pdf 没装
  3. [市场搜索] 在 marketplace 中找到 pdf/
  4. [自动安装] cp -r ... → ~/.claude/skills/pdf
  5. [调用技能] pdf 技能执行，报告生成完毕

你看到的：     一份 PDF 报告。零手动操作。
```

## 支持什么

你说这句话... | 自动安装 | 然后
---|---|---
"生成 PDF 报告" | `pdf` | 直接出 PDF
"分析这个 Excel" | `xlsx` | 读表、分析、导出
"做一份 PPT" | `pptx` | 生成演示文稿
"写一个 Word 合同" | `docx` | 生成文档
"设计一个登录页面" | `frontend-design` | React/Vue 组件
"画一个 Canvas 海报" | `canvas-design` | 海报输出
"配置品牌配色" | `brand-guidelines` | 配色+风格指南
"搭建 MCP 服务器" | `mcp-builder` | 服务器代码
"写 Claude API 调用" | `claude-api` | SDK 代码
"测试这个网页" | `webapp-testing` | Playwright 测试
"创建自定义技能" | `skill-creator` | 技能模板

**17 个意图域**，一个句式覆盖。

## 架构

```
用户自然语言
      │
      ├─ [Hook] onUserPromptSubmit.js     ← 毫秒级正则预扫，先装明显匹配的
      │
      └─ [Skill] SKILL.md                 ← 深度语义分析，精确匹配后调用技能
```

双层匹配 = Hook 速度 + Skill 精度。

## 安装（3 种方式）

### 方式一：Marketplace（推荐）

```bash
/plugin marketplace add maimai-dot/skill-auto-installer
/plugin install skill-auto-installer
```

### 方式二：Git Clone

```bash
git clone https://github.com/maimai-dot/skill-auto-installer.git
mkdir -p ~/.claude/skills/skill-auto-installer
cp skill-auto-installer/skills/skill-auto-installer/SKILL.md ~/.claude/skills/skill-auto-installer/
```

### 方式三：Hook 增强（获得毫秒预扫）

在 `.claude/settings.json` 中添加：

```json
{
  "hooks": {
    "onUserPromptSubmit": [{
      "command": "node /path/to/skill-auto-installer/.claude/hooks/onUserPromptSubmit.js"
    }]
  }
}
```

## 前置条件

至少注册了一个 skills marketplace：

```bash
/plugin marketplace add anthropics/skills
```

## 社区

- 掘金：[Claude Code 神技：说人话就能自动安装技能](https://juejin.cn/post/7640257851873345582)
- 知乎：[Claude Code 神技：说人话就能自动安装技能](https://zhuanlan.zhihu.com/p/2039087673802019787)
- GitHub：[maimai-dot/skill-auto-installer](https://github.com/maimai-dot/skill-auto-installer)
- PR：[anthropics/skills#1146](https://github.com/anthropics/skills/pull/1146)

---

**⭐ 如果这个项目帮你省了 `/plugin install` 的麻烦，点个 Star 让更多人看到。**
