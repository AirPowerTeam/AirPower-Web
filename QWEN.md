# AirPower-Web 项目指南

## 项目概述

AirPower-Web 是一个基于 Vue3、Element Plus 和 TypeScript 的快速开发脚手架。该项目提供了一套完整的前端解决方案，包括装饰器驱动的模型定义、通用的 CRUD 组件、权限管理、国际化支持等功能。

### 核心技术栈
- Vue 3 (Composition API)
- TypeScript
- Element Plus (UI 组件库)
- Vite (构建工具)
- Axios (HTTP 客户端)
- AirPower-Transformer (装饰器支持)

### 项目结构
```
src/
├── assets/           # 静态资源
├── components/       # 通用组件
├── config/           # 配置文件
├── decorator/        # 装饰器定义
├── dialog/           # 弹窗工具
├── enum/             # 枚举定义
├── feedback/         # 反馈组件
├── file/             # 文件处理工具
├── hooks/            # Vue Hooks
├── http/             # HTTP 请求封装
├── i18n/             # 国际化
├── interface/        # 接口定义
├── model/            # 数据模型
├── permission/       # 权限管理
├── router/           # 路由
├── service/          # 服务层
├── shared/           # 共享工具
├── type/             # 类型定义
├── util/             # 工具函数
├── validator/        # 验证器
├── index.ts          # 主入口文件
└── vue.d.ts          # Vue 类型定义
```

## 核心功能

### 1. 装饰器系统
AirPower-Web 提供了一套装饰器来简化开发：
- `@Model`: 定义模型基本信息
- `@Field`: 定义字段基本信息
- `@Form`: 定义字段在表单中的表现
- `@Table`: 定义字段在表格中的表现
- `@Search`: 定义字段在搜索表单中的表现

### 2. 通用组件
- `AButton`: 支持权限控制的按钮组件
- `ATable`: 功能丰富的表格组件（支持分页、搜索、导出等）
- `AForm`: 基于装饰器自动生成的表单组件
- `ADialog`: 弹窗组件
- `APage`: 分页组件

### 3. 服务层抽象
- `AbstractService`: 基础服务类
- `AbstractCurdService`: 提供标准的 CRUD 操作

### 4. 权限管理
- 基于角色的权限控制
- 组件级别的权限控制
- 自动权限前缀处理

### 5. 国际化支持
- 多语言支持
- 动态切换语言

## 配置说明

### WebConfig 全局配置
```typescript
import { WebConfig } from '@airpower/web'

// 修改全局配置
WebConfig.apiUrl = 'https://api.hamm.cn/'
WebConfig.timeout = 10000
WebConfig.pageSizes = [5, 10, 20, 50]
```

## 构建和运行

### 安装依赖
```bash
npm install @airpower/web
# or
yarn add @airpower/web
```

### 开发约定

1. **模型定义**：使用装饰器定义模型和字段
2. **服务层**：继承 AbstractCurdService 实现业务逻辑
3. **组件使用**：优先使用 AirPower-Web 提供的通用组件
4. **权限控制**：通过 permission 属性控制组件访问权限
5. **国际化**：使用 WebI18n 进行文本国际化

### API 规范
- 使用 POST 请求，数据类型统一为 JSON
- HTTP 状态码固定为 200
- 成功状态码为 200，需要登录为 401，无权限为 403
- 返回格式：`{code: number, message: string, data: any}`

## 项目特点

1. **装饰器驱动**：通过装饰器定义模型行为，减少重复代码
2. **类型安全**：基于 TypeScript，提供完整的类型定义
3. **组件丰富**：提供一系列开箱即用的业务组件
4. **权限集成**：内置权限控制系统
5. **国际化支持**：内置多语言支持
6. **可扩展性**：易于扩展和定制

## 依赖库

AirPower-Web 依赖以下 AirPower 工具库：
- [AirPower-Transformer](https://github.com/AirPowerTeam/AirPower-Transformer)
- [AirPower-Enum](https://github.com/AirPowerTeam/AirPower-Enum)
- [AirPower-i18n](https://github.com/AirPowerTeam/AirPower-i18n)
- [AirPower-Util](https://github.com/AirPowerTeam/AirPower-Util)

## 版本发布自动化流程

- 使用 `eslint --fix` 修复项目中可能出现的问题
- 更新 `package.json` 中的版本号
- 使用 `yarn build` 构建项目
- 使用 `npm publish` 发布包
- 使用 `git add/commit/push` 将本地所有变更的文件推送到 Github
- 根据当前版本创建 `git tag` 并推送到Github，格式例如 `v1.2.3`
