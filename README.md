# 🏮 华景中国 · ChinaVista

> 中国一站式 AI 智慧旅游平台 — 从搜索灵感到完成预订，AI 全程旅行管家。
>
> One-stop AI-powered smart travel platform for China — from inspiration to booking, your AI travel companion.

---

## 📖 目录 · Table of Contents

- [项目简介 · Overview](#项目简介--overview)
- [技术架构 · Tech Stack](#技术架构--tech-stack)
- [功能模块 · Features](#功能模块--features)
- [项目结构 · Project Structure](#项目结构--project-structure)
- [快速开始 · Quick Start](#快速开始--quick-start)
- [API 文档 · API Documentation](#api-文档--api-documentation)
- [安全策略 · Security](#安全策略--security)
- [许可证 · License](#许可证--license)

---

## 项目简介 · Overview

**ChinaVista（华景中国）** 以 AI + 数据 + 内容 + 交易为核心理念，将行程规划、智能推荐、实时预订整合在同一平台。AI 不仅是客服，而是覆盖「搜索灵感 → AI 规划 → 一键预订」全程的旅行管家。

**ChinaVista** is an AI-powered travel platform integrating itinerary planning, intelligent recommendations, and real-time booking. AI acts as your full-journey travel companion — from inspiration search to one-click booking.

| 维度 | 覆盖范围 |
|------|---------|
| 🎯 目标用户 | 国内游客、入境游客、自由行、商务出行、家庭出游、高端定制 |
| 🗺️ 目的地 | 九寨沟、张家界、桂林、黄山、西湖、敦煌等热门景点 |
| 🤖 AI 能力 | 行程规划、智能问答、个性化推荐、实时翻译 |
| 💳 支付 | 微信支付 · 支付宝 · 银联 · Apple Pay |
| 🌐 语言 | 中文 · English · 日本語 · 한국어 · Français |

---

## 技术架构 · Tech Stack

| 层级 · Layer | 技术 · Technology |
|-------------|------------------|
| 🖥️ **前端 · Frontend** | Next.js 15, React 19, TailwindCSS, Framer Motion, Zustand |
| ⚙️ **后端 · Backend** | NestJS 10, TypeScript, Prisma ORM, RxJS |
| 🗄️ **数据库 · Database** | MySQL 8, Redis 7, Elasticsearch 8 |
| 🤖 **AI · LLM** | OpenAI GPT-4o, DeepSeek, Qwen（通义千问） |
| 🗺️ **地图 · Maps** | 高德地图 (AMap), 百度地图 (Baidu Map) |
| ☁️ **基础设施 · Infra** | Docker, GitHub Actions CI/CD, 阿里云 OSS/CDN |
| 📦 **包管理 · Monorepo** | pnpm workspaces, Turborepo |

---

## 功能模块 · Features

### ✅ 已实现 · Implemented

| 模块 · Module | 路由 · Route | 说明 · Description |
|-------------|-------------|-------------------|
| 🏠 **首页** | `/` | 全屏视频轮播、AI 搜索框、热门目的地、天气预览、攻略推荐 |
| 🤖 **AI 规划** | `/ai-planner` | 预算/人数/偏好 → AI 生成完整行程（每日活动、酒店、交通、天气、预算） |
| 💬 **AI 对话** | `POST /api/ai/chat` | SSE 流式对话，支持旅行问答、攻略建议、实时翻译 |
| 🏔️ **景点** | `/scenic`, `/scenic/[slug]` | 列表搜索筛选、详情页（画廊、AI 总结、地图 POI、门票、攻略） |
| 🏨 **酒店** | `/hotel`, `/hotel/[slug]` | 星级/民宿筛选、详情（房型、设施、价格、AI 推荐） |
| ✈️ **机票** | `/flight` | 城市搜索、航司筛选、直飞/经停、实时价格 |
| 🚄 **高铁** | `/train` | 车站搜索、车次筛选、座位等级 + 余票展示 |
| 🚗 **租车** | `/car-rental` | 城市/车型筛选、神州/一嗨双平台 |
| 🌤️ **天气** | `/weather` | 8城7天预报、温度/风速/紫外线/降水概率 |

### 🔜 计划中 · Planned

会员体系、旅游社区、短视频频道、商家后台、支付集成、国际版多语言

---

## 项目结构 · Project Structure

```
chinavista/
├── apps/
│   ├── web/                         # Next.js 前端
│   │   ├── src/
│   │   │   ├── app/                 # App Router 页面
│   │   │   │   ├── page.tsx         # 首页
│   │   │   │   ├── ai-planner/      # AI 行程规划
│   │   │   │   ├── scenic/          # 景点列表 + 详情
│   │   │   │   ├── hotel/           # 酒店列表 + 详情
│   │   │   │   ├── flight/          # 机票搜索
│   │   │   │   ├── train/           # 高铁搜索
│   │   │   │   ├── car-rental/      # 租车搜索
│   │   │   │   └── weather/         # 天气预报
│   │   │   ├── components/          # UI 组件
│   │   │   │   ├── hero/            # Hero 轮播、搜索框
│   │   │   │   ├── home/            # 首页板块组件
│   │   │   │   ├── ai/              # AI 对话、行程表单
│   │   │   │   ├── scenic/          # 景区地图
│   │   │   │   └── layout/          # 页头、页脚
│   │   │   └── lib/                 # 工具函数、API 客户端
│   │   └── tailwind.config.ts       # ChinaVista 设计系统
│   │
│   └── api/                         # NestJS 后端
│       ├── src/
│       │   ├── modules/
│       │   │   ├── ai/              # AI 服务（规划 + 对话）
│       │   │   ├── scenic/          # 景点 CRUD
│       │   │   ├── hotel/           # 酒店 CRUD
│       │   │   ├── flight/          # 机票搜索
│       │   │   ├── train/           # 高铁搜索
│       │   │   ├── car-rental/      # 租车搜索
│       │   │   └── weather/         # 天气预报
│       │   ├── common/              # 过滤器、拦截器
│       │   ├── config/              # 环境配置
│       │   └── prisma/              # 数据库服务
│       └── prisma/
│           ├── schema.prisma        # 数据模型（8 张表）
│           └── seed.ts              # 种子数据
│
├── packages/
│   ├── shared/src/types.ts          # 前后端共享类型（40+ 接口）
│   ├── tsconfig/                    # 分层 TypeScript 配置
│   └── eslint-config/               # 统一 ESLint 规则
│
├── docker/
│   └── docker-compose.yml           # MySQL + Redis + Elasticsearch
├── .github/workflows/ci.yml         # CI/CD 流水线
├── .gitleaks.toml                   # 密钥扫描规则
├── .githooks/pre-commit             # 提交前安全检查
├── PLAN.md                          # 项目方案文档
└── SECURITY.md                      # 安全策略文档
```

---

## 快速开始 · Quick Start

### 前置要求 · Prerequisites

- **Node.js** ≥ 20.0.0
- **pnpm** ≥ 9.0.0
- **Docker**（用于数据库 · for database）
- **MySQL** 8, **Redis** 7, **Elasticsearch** 8（通过 Docker 自动提供 · provided via Docker）

### 1. 克隆项目 · Clone

```bash
git clone <repository-url>
cd 中国旅游网页
```

### 2. 配置环境变量 · Environment

```bash
cp .env.example .env
# 编辑 .env 填入真实的 API 密钥等配置
# Edit .env with your actual API keys and configuration
```

必需配置项 · Required:

| 变量 | 说明 |
|------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥（默认 AI provider） |
| `OPENAI_API_KEY` | OpenAI API 密钥（可选） |
| `DATABASE_URL` | MySQL 连接字符串（格式: `mysql://user:pass@host:3306/chinavista`） |

### 3. 安装依赖 · Install

```bash
pnpm install
```

### 4. 启动数据库 · Start Database

```bash
pnpm docker:up
```

### 5. 初始化数据库 · Initialize Database

```bash
cd apps/api
pnpm db:migrate    # 运行数据库迁移 · Run migrations
pnpm db:seed       # 导入种子数据 · Seed sample data
cd ../..
```

### 6. 启动开发服务器 · Start Dev Server

```bash
# 同时启动前后端 · Start both frontend and backend
pnpm dev

# 或者分别启动 · Or start separately
pnpm dev:web      # Next.js → http://localhost:3000
pnpm dev:api      # NestJS  → http://localhost:4000
```

### 7. 配置 Git Hooks（安全扫描）· Setup Security Hooks

```bash
bash scripts/setup-hooks.sh
```

### 8. 验证 · Verify

```bash
pnpm type-check   # TypeScript 类型检查
pnpm lint         # ESLint 检查
pnpm build        # 生产构建 · Production build
```

---

## API 文档 · API Documentation

启动后端后访问 Swagger 文档：

After starting the backend, visit Swagger docs:

```
http://localhost:4000/api/docs
```

### 主要端点 · Key Endpoints

| 方法 · Method | 端点 · Endpoint | 说明 · Description |
|-------------|----------------|-------------------|
| `GET` | `/api/health` | 健康检查 · Health check |
| `POST` | `/api/ai/plan` | AI 行程规划 · AI itinerary planning |
| `POST` | `/api/ai/chat` | AI 对话（SSE 流式）· AI chat (streaming) |
| `GET` | `/api/scenic` | 景点列表 · Scenic spots list |
| `GET` | `/api/scenic/:slug` | 景点详情 · Scenic spot detail |
| `GET` | `/api/hotel` | 酒店列表 · Hotels list |
| `GET` | `/api/hotel/:slug` | 酒店详情 · Hotel detail |
| `GET` | `/api/flight` | 机票搜索 · Flight search |
| `GET` | `/api/train` | 高铁搜索 · Train search |
| `GET` | `/api/car-rental` | 租车列表 · Car rental list |
| `GET` | `/api/weather/:city` | 城市天气 · City weather |

### 统一响应格式 · Response Format

```json
{
  "success": true,
  "data": { /* ... */ },
  "error": null
}
```

---

## 安全策略 · Security

- 🔐 **Pre-commit 密钥扫描** — gitleaks 自动检测 API Key、AccessKey 等敏感信息
- 🛡️ **Prompt 注入防护** — 12 种注入模式检测 + 输入长度限制
- ⏱️ **速率限制** — AI 端点 10-20 req/min，全局 100 req/min
- 🔒 **安全头** — Helmet, CSP, HSTS, X-Frame-Options
- 📝 **详细文档** — 参见 [SECURITY.md](./SECURITY.md)

---

## 设计系统 · Design System

ChinaVista 使用自定义设计系统，基于 TailwindCSS 扩展：

- **色彩** — 中国红 (oklch 62% 0.19 25) + 玉青 (oklch 52% 0.08 165)
- **字体** — Noto Serif SC（标题）+ Noto Sans SC（正文）
- **组件** — surface-card（悬浮阴影）、glass-surface（毛玻璃）、text-gradient
- **动效** — 入场动画（slide-up, fade-in）+ Hover 效果
- **响应式** — 320px–1920px 全覆盖

---

## 许可证 · License

MIT

---

<p align="center">
  <strong>🏮 华景中国 · ChinaVista</strong><br>
  Made with ❤️ for travelers exploring China
</p>
