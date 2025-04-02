---
layout: home

hero:
  name: "ai-schema"
  text: "AIとのコラボレーションを安全かつ効果的に実現するスキーマ定義プラットフォーム"
  tagline: "AI駆動開発を加速させるガードレールとスキーマ定義で、フロントエンド開発を革新する"
  image:
    src: /logo.svg
    alt: ai-schema Logo
  actions:
    - theme: brand
      text: はじめる
      link: /concept
    - theme: alt
      text: GitHub
      link: https://github.com/ToyB0x/ai-schema
    - theme: alt
      text: API例
      link: /api

features:
  - title: AI駆動開発の促進
    details: Vibe Codingなどの手法を活用し、AIとのコラボレーションによる開発プロセスを加速します。
    icon: 🚀
  - title: フロントエンド特化
    details: UI領域でのAI駆動開発を特に強化し、少々の不都合があっても大きな効果を発揮します。
    icon: 🎨
  - title: 安全なガードレール
    details: AIが間違いを犯しても安全を担保する仕組みを提供し、開発リスクを最小限に抑えます。
    icon: 🛡️
  - title: GraphQL統合
    details: バックエンドサービスとのシームレスな連携により、堅牢なスキーマ定義とガードレールを実現します。
    icon: 🔌
  - title: OpenAI連携
    details: OpenAIのAPIと連携し、AIモデルに適切なガイダンスとスキーマを提供します。
    icon: 🤖
  - title: 人間とAIの共存
    details: AIにも人間にも優しいインターフェースで、効果的なコラボレーションを実現します。
    icon: 🤝

footer: MIT Licensed | Copyright © 2025 ai-schema Contributors
---

# AI駆動開発の未来を切り拓く

ai-schemaは、AI駆動開発を安全かつ効率的に推進するためのガードレールとスキーマ定義を提供するプラットフォームです。特にフロントエンド開発において、AIが間違いを犯しても安全性を担保し、開発者とAIのコラボレーションを促進します。

## 概要

今後のITビジネスでは、Vibe Codingなどの手法によるAI駆動開発が欠かせません。特にUI領域では、AIによる開発が少々の不都合があっても大きな効果を発揮します。ai-schemaは、そのようなAI駆動開発を安全に推進するためのガードレールとスキーマ定義を提供します。

```bash
# クイックインストール
git clone https://github.com/ToyB0x/ai-schema.git
cd ai-schema
pnpm install && pnpm build
```

::: code-group

```json [設定]
{
  "mcpServers": {
    "@ai-schema/mcp": {
      "command": "node",
      "args": [
        "/PATH/TO/YOUR_DIR/ai-schema/apps/mcp/dist/index.js"
      ],
      "autoApprove": [],
      "disabled": false
    }
  }
}
```

```markdown [使用例]
AIアシスタントへの指示：

- GraphQLスキーマに基づいたUIコンポーネントを生成してください
- スキーマ定義に従って、フォームのバリデーションを実装してください
- OpenAIのAPIを使用して、ユーザー入力を検証してください
```

```typescript [スキーマ例]
// GraphQLスキーマ定義
const userSchema = `
  type User {
    id: ID!
    name: String!
    email: String!
    role: UserRole!
  }
  
  enum UserRole {
    ADMIN
    USER
    GUEST
  }
`;

// このスキーマに基づいてAIがUIコンポーネントを生成
```

:::
