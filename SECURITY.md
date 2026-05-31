# ChinaVista 安全策略

## 密钥管理原则

**绝对禁止**将任何真实凭证、密钥、令牌提交到 Git 仓库。这包括但不限于：

- 云服务 AccessKey（阿里云、腾讯云等）
- API 密钥（OpenAI、DeepSeek、Qwen）
- 支付密钥（微信支付、支付宝、银联）
- 数据库密码（MySQL、Redis、Elasticsearch）
- JWT 签名密钥
- 第三方服务凭证（高德地图、百度地图、12306 等）
- SSL/TLS 证书私钥

## 防护措施

### 1. `.gitignore` — 文件级别

- `.env` 及所有变体（`.env.local`, `.env.production` 等）已忽略
- 证书文件（`*.pem`, `*.key`, `*.p12` 等）已忽略
- 密钥文件目录（`secrets/`, `credentials/`）已忽略

### 2. Gitleaks — 内容级别

`gitleaks` 在 pre-commit 时扫描所有 staged 文件，检测以下模式：

| 规则 | 检测目标 |
|------|---------|
| `alibaba-access-key` | 阿里云 AccessKey (LTAI...) |
| `wechat-pay-config` | 微信支付密钥 |
| `alipay-config` | 支付宝应用密钥 |
| `amap-api-key` | 高德地图 API Key |
| `baidu-map-ak` | 百度地图 AK |
| `llm-api-keys` | OpenAI / DeepSeek / Qwen API Keys |
| `db-connection-string` | 含密码的数据库连接串 |
| `jwt-secret-weak` | 弱 JWT 密钥 |
| `generic-api-key-assignment` | 通用 API Key 赋值 |

### 3. Pre-commit Hook — 提交前自动检查

每次 `git commit` 前自动运行，发现密钥即阻止提交。

## 开发人员设置

```bash
# 克隆后运行一次
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit

# 安装 gitleaks（推荐，提供完整扫描）
brew install gitleaks

# 验证防护生效
cp .env.example .env
echo "JWT_SECRET=secret" >> .env     # .env 不会被 git 追踪
echo "LTAI<your-access-key-id>" > test-secret.txt
git add test-secret.txt
git commit -m "test"                  # 应该被阻止
rm test-secret.txt
```

## 误报处理

如果 gitleaks 误报了非敏感内容（如文档中的示例值）：

1. **方案一**：在 `.gitleaks.toml` 的 `[allowlist.regexes]` 中添加正则
2. **方案二**：将示例值替换为明确的占位符（`<your-key>`, `placeholder`）
3. **紧急情况**：`git commit --no-verify` 跳过检查（需团队确认后用）

## 密钥泄露应急响应

如果密钥已被推送到远程仓库：

1. **立即轮换密钥** — 在云平台禁用旧密钥，生成新的
2. **清理 Git 历史** — 使用 `git filter-branch` 或 `BFG Repo-Cleaner`
3. **通知安全负责人** — 评估泄露影响范围
4. **事后复盘** — 更新防护规则，防止同类问题

## 相关文件

- `.gitignore` — 文件忽略规则
- `.gitleaks.toml` — 密钥扫描规则配置
- `.githooks/pre-commit` — 提交前检查脚本
- `.env.example` — 环境变量模板（不含真实值）
