#!/usr/bin/env bash
# ============================================================
# ChinaVista 开发环境设置
# 运行一次即可配置 git hooks 和本地开发依赖
# Usage: bash scripts/setup-hooks.sh
# ============================================================
set -euo pipefail

echo "🏗️  ChinaVista 开发环境设置"
echo ""

# 1. Git hooks
echo "→ 配置 Git hooks..."
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
echo "  ✅ hooksPath = .githooks"

# 2. Gitleaks check
if command -v gitleaks &>/dev/null; then
  echo "  ✅ gitleaks $(gitleaks version 2>&1 | head -1)"
else
  echo "  ⚠️  gitleaks 未安装。建议执行: brew install gitleaks"
  echo "     不使用 gitleaks 时，将使用基础模式扫描密钥（覆盖范围有限）"
fi

# 3. .env check
if [ ! -f .env ]; then
  cp .env.example .env
  echo "  ✅ .env 已从 .env.example 创建（请填入真实值）"
else
  echo "  ✅ .env 已存在"
fi

echo ""
echo "✅ 设置完成！"
echo ""
echo "验证: 尝试提交一个包含假密钥的文件，应该被阻止。"
