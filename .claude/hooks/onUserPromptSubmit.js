const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Skill Auto-Installer — PrePrompt Hook
 *
 * Fast-path keyword matching before Claude processes the prompt.
 * Handles obvious cases so the skill is installed by the time
 * Claude reads the skill-auto-installer instructions.
 */

const HOME = process.env.HOME || require("os").homedir();
const CLAUDE_DIR = path.join(HOME, ".claude");
const SKILLS_DIR = path.join(CLAUDE_DIR, "skills");
const MARKETPLACES_DIR = path.join(CLAUDE_DIR, "plugins", "marketplaces");
const LOG_FILE = path.join(CLAUDE_DIR, "skill-auto-installer.log");

// Keyword → skill mapping for fast pre-match
const INTENT_MAP = [
  { kw: /\b(pdf|export.*pdf|生成.*pdf|pdf.*报告|打印.*pdf|转.*pdf)\b/i, skill: "pdf" },
  { kw: /\b(excel|xlsx|电子表格|表格|数据.*导出|csv|sheet)\b/i, skill: "xlsx" },
  { kw: /\b(ppt|pptx|演示|幻灯片|presentation|slides)\b/i, skill: "pptx" },
  { kw: /\b(docx|doc\b|word|合同|简历|文档.*生成|模板)\b/i, skill: "docx" },
  { kw: /\b(前端|页面|UI|组件|landing|hero|界面.*设计|网页.*设计)\b/i, skill: "frontend-design" },
  { kw: /\b(算法.*艺术|分形|generative.*art|creative.*coding|p5|processing)\b/i, skill: "algorithmic-art" },
  { kw: /\b(canvas|海报|视觉|图形.*设计|design.*canvas)\b/i, skill: "canvas-design" },
  { kw: /\b(品牌|logo|配色|风格.*指南|brand|guideline)\b/i, skill: "brand-guidelines" },
  { kw: /\b(主题|暗色.*模式|dark.*mode|theme|样式.*变量|CSS.*token)\b/i, skill: "theme-factory" },
  { kw: /\b(mcp|server.*工具|model.*context.*protocol)\b/i, skill: "mcp-builder" },
  { kw: /\b(claude.*api|anthropic.*sdk|模型.*调用|prompt.*cach)\b/i, skill: "claude-api" },
  { kw: /\b(e2e|playwright|浏览器.*测试|webapp.*test|自动化.*测试)\b/i, skill: "webapp-testing" },
  { kw: /\b(artifact|web.*构件|交互.*组件|沙箱)\b/i, skill: "web-artifacts-builder" },
  { kw: /\b(slack|gif|动图|表情)\b/i, skill: "slack-gif-creator" },
  { kw: /\b(内部.*通讯|公告|通知|status.*report)\b/i, skill: "internal-comms" },
  { kw: /\b(文档.*协作|写作.*助手|coauthor)\b/i, skill: "doc-coauthoring" },
  { kw: /\b(创建.*技能|custom.*skill|skill.*creator)\b/i, skill: "skill-creator" },
];

function getInstalledSkills() {
  try {
    return new Set(fs.readdirSync(SKILLS_DIR));
  } catch {
    return new Set();
  }
}

function findSkillInMarketplaces(skillName) {
  try {
    const marketplaces = fs.readdirSync(MARKETPLACES_DIR);
    for (const mp of marketplaces) {
      const mpPath = path.join(MARKETPLACES_DIR, mp);
      if (!fs.statSync(mpPath).isDirectory()) continue;
      // Search up to 3 levels deep
      const cmd = `find "${mpPath}" -maxdepth 3 -type d -name "${skillName}" 2>/dev/null`;
      try {
        const result = execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
        if (result) return result.split("\n")[0];
      } catch {
        // find failed or no match
      }
    }
  } catch {
    // no marketplaces
  }
  return null;
}

function installSkill(skillName, sourcePath) {
  const dest = path.join(SKILLS_DIR, skillName);
  if (fs.existsSync(dest)) return { already: true };
  execSync(`cp -r "${sourcePath}" "${dest}"`, { stdio: "pipe" });
  return { installed: true };
}

function log(skillName, keyword) {
  const ts = new Date().toISOString().replace("T", " ").slice(0, 16);
  const line = `[${ts}] ${skillName} — trigger: "${keyword}"\n`;
  try {
    fs.appendFileSync(LOG_FILE, line, "utf8");
  } catch {
    // log dir not writable, ignore
  }
}

module.exports = async function onUserPromptSubmit(input) {
  const prompt = typeof input === "string" ? input : input?.prompt || input?.text || "";
  if (typeof prompt !== "string" || !prompt.trim()) return { prompt };

  const installed = getInstalledSkills();
  const matched = [];

  for (const { kw, skill } of INTENT_MAP) {
    if (kw.test(prompt) && !installed.has(skill)) {
      const source = findSkillInMarketplaces(skill);
      if (source) {
        const result = installSkill(skill, source);
        if (result.installed) {
          matched.push(skill);
          log(skill, prompt.slice(0, 60));
        }
      }
    }
  }

  if (matched.length > 0) {
    console.error(`[skill-auto-installer] Pre-installed: ${matched.join(", ")}`);
  }

  return { prompt };
};
