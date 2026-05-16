# Skill Auto-Installer

**自然语言意图分析 → 技能推荐 → 自动安装**

让 Claude Code 听懂你的需求，自动找到并安装对应技能，然后直接帮你完成任务。

## 效果演示

```
用户: "帮我把这份数据生成一个 PDF 报告"

Claude 内部流程:
  1. [意图分析] 检测到 "PDF" 关键词 → 需要 pdf 技能
  2. [安装检查] pdf 技能未安装
  3. [市场搜索] 在 anthropic-agent-skills 市场中找到 pdf/
  4. [自动安装] cp -r marketplace/pdf ~/.claude/skills/pdf
  5. [调用技能] 使用 pdf 技能生成报告
```

## 安装

### 方式一：作为项目技能

```bash
git clone https://github.com/maimai-dot/skill-auto-installer.git
cp -r skill-auto-installer/.claude/skills/skill-auto-installer.md ~/.claude/skills/
```

### 方式二：配合 Hook 使用（推荐）

在 `.claude/settings.json` 中添加：

```json
{
  "hooks": {
    "onUserPromptSubmit": [
      {
        "command": "node /path/to/skill-auto-installer/.claude/hooks/onUserPromptSubmit.js",
        "description": "Skill Auto-Installer pre-scan"
      }
    ]
  }
}
```

## 架构

```
用户自然语言输入
       │
       ├──→ [Hook] onUserPromptSubmit.js
       │     关键字快速匹配，预安装明显匹配的技能
       │
       └──→ [Skill] skill-auto-installer.md
             Claude 深度分析意图，精确匹配并安装，
             然后调用技能完成用户任务
```

### 双层匹配策略

| 层级 | 机制 | 速度 | 精度 |
|------|------|------|------|
| Hook (预扫描) | 正则关键词匹配 | 毫秒级 | 中 |
| Skill (深度分析) | Claude 语义理解 | 秒级 | 高 |

## 支持的意图 → 技能映射

| 你说... | 自动安装 |
|---------|---------|
| "生成 PDF 报告" | `pdf` |
| "分析这个 Excel" | `xlsx` |
| "做一份 PPT" | `pptx` |
| "写一个 Word 合同" | `docx` |
| "设计一个登录页面" | `frontend-design` |
| "画一个算法艺术作品" | `algorithmic-art` |
| "做一个 Canvas 海报" | `canvas-design` |
| "配置品牌配色方案" | `brand-guidelines` |
| "搭建 MCP 服务器" | `mcp-builder` |
| "写 Claude API 调用代码" | `claude-api` |
| "测试这个网页" | `webapp-testing` |
| "创建一个自定义技能" | `skill-creator` |

## 前置条件

- 已安装 Claude Code
- 至少注册了一个 marketplace（如 `anthropics/skills`）：

```bash
/plugin marketplace add anthropics/skills
```

## License

MIT
