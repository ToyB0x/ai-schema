# ai-schema 実装ガイド

このページでは、ai-schemaを使用してAI駆動開発を安全に推進するための実装ガイドを提供します。ai-schemaは、AIが間違いを犯しても安全性を担保するガードレールとスキーマ定義を提供するプラットフォームです。

## スキーマ定義の基本

ai-schemaでは、GraphQLスキーマを中心としたスキーマ定義を活用します。これにより、AIに明確なガイドラインを提供し、フロントエンドとバックエンドの整合性を確保します。

::: info
スキーマ定義の例：

```graphql
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

type Query {
  user(id: ID!): User
  users: [User!]!
}

type Mutation {
  createUser(name: String!, email: String!, role: UserRole!): User!
  updateUser(id: ID!, name: String, email: String, role: UserRole): User!
  deleteUser(id: ID!): Boolean!
}
```

このスキーマ定義により、AIはユーザー関連の機能を実装する際に、必要なフィールドや型情報を正確に把握できます。
:::

## ガードレールの設定

ai-schemaでは、AIが間違いを犯しても安全性を担保するためのガードレールを設定できます。ガードレールは、以下のような要素で構成されます：

::: tip
ガードレールは、AIの間違いを許容しつつも、重大な問題を防ぐための仕組みです。
:::

| ガードレール要素 | 説明 |
|------------|------|
| **バリデーションルール** | ユーザー入力やAIの出力を検証するルール |
| **型チェック** | GraphQLスキーマに基づいた型チェック |
| **セキュリティポリシー** | セキュリティ上の制約やポリシー |
| **パフォーマンス制約** | パフォーマンスに関する制約 |

## GraphQLスキーマの活用

GraphQLスキーマは、フロントエンドとバックエンドの間のインターフェースを明確に定義します。ai-schemaでは、GraphQLスキーマを活用して以下のような機能を実現します：

### 型安全なクエリとミューテーション

```typescript{1,6-7}
// GraphQLクエリの例
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name  # ハイライト: スキーマで定義されたフィールド
      email  # ハイライト: スキーマで定義されたフィールド
      role
    }
  }
`;

// クエリの実行
const { data, loading, error } = useQuery(GET_USER, {
  variables: { id: userId }
});
```

### スキーマから自動生成されるTypeScript型

```typescript
// GraphQLスキーマから自動生成された型
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

// 型安全な関数
function formatUserName(user: User): string {
  return `${user.name} (${user.role.toLowerCase()})`;
}
```

## OpenAI APIの活用

ai-schemaでは、OpenAI APIを活用してユーザー入力の検証やコンテンツの生成を安全に行うことができます。

### ユーザー入力の検証

```typescript
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ユーザー入力の検証
async function validateUserInput(input: string): Promise<boolean> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'あなたはユーザー入力を検証するアシスタントです。' },
      { role: 'user', content: `以下の入力が安全かどうか判断してください: ${input}` }
    ],
    temperature: 0,
  });
  
  return response.choices[0].message.content?.toLowerCase().includes('safe') ?? false;
}
```

### コンテンツの生成

```typescript
// コンテンツの生成
async function generateDescription(product: Product): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'あなたは商品説明を生成するアシスタントです。' },
      { role: 'user', content: `以下の商品の説明を生成してください: ${JSON.stringify(product)}` }
    ],
    temperature: 0.7,
  });
  
  return response.choices[0].message.content ?? '商品説明がありません';
}
```

## Vibe Codingの実践

Vibe Codingは、開発者がAIに大まかな指示を出し、AIがコードを生成するという新しい開発手法です。ai-schemaを活用することで、Vibe Codingを安全かつ効率的に実践できます。

::: warning
Vibe Codingは強力ですが、適切なガードレールなしでは予期しない結果を招く可能性があります。
:::

### Vibe Codingの基本ステップ

1. **スキーマ定義**: GraphQLスキーマなどを使用して、システムの構造を定義します
2. **大まかな指示**: AIに大まかな指示を出します
3. **コード生成**: AIがコードを生成します
4. **レビューと修正**: 生成されたコードをレビューし、必要に応じて修正します
5. **反復**: 必要に応じてステップ2〜4を繰り返します

### Vibe Codingの例

::: details 対話例
```
開発者: GraphQLスキーマに基づいたユーザー編集フォームを作成してください

AI: スキーマ情報を確認しました。以下のReactコンポーネントを生成します：

import React, { useState } from 'react';

type UserRole = 'ADMIN' | 'USER' | 'GUEST';

interface UserFormProps {
  onSubmit: (user: {
    name: string;
    email: string;
    role: UserRole;
  }) => void;
  initialValues?: {
    name?: string;
    email?: string;
    role?: UserRole;
  };
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialValues = {}
}) => {
  const [name, setName] = useState(initialValues.name || '');
  const [email, setEmail] = useState(initialValues.email || '');
  const [role, setRole] = useState<UserRole>(initialValues.role || 'USER');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // バリデーション関数
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = '名前は必須です';
    }
    
    if (!email.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({ name, email, role });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">名前</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="role">ロール</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="ADMIN">管理者</option>
          <option value="USER">ユーザー</option>
          <option value="GUEST">ゲスト</option>
        </select>
      </div>
      
      <button type="submit">送信</button>
    </form>
  );
};
```
:::

## カスタムガードレールの作成

ai-schemaでは、プロジェクトや組織に合わせたカスタムガードレールを作成できます。カスタムガードレールは、以下のような構造で定義できます：

```typescript
// カスタムガードレールの定義
import { GuardRail, ValidationResult } from '@ai-schema/core';

export class UserInputGuardRail implements GuardRail {
  id = 'user-input';
  
  validate(input: string): ValidationResult {
    const violations: string[] = [];
    
    // 入力が空でないことを確認
    if (!input.trim()) {
      violations.push('入力が空です');
    }
    
    // 入力が長すぎないことを確認
    if (input.length > 1000) {
      violations.push('入力が長すぎます（最大1000文字）');
    }
    
    // 禁止語句が含まれていないことを確認
    const forbiddenWords = ['パスワード', 'クレジットカード', '秘密'];
    for (const word of forbiddenWords) {
      if (input.toLowerCase().includes(word.toLowerCase())) {
        violations.push(`禁止語句「${word}」が含まれています`);
      }
    }
    
    return {
      valid: violations.length === 0,
      violations
    };
  }
}
```

## シンタックスハイライト

ai-schemaのドキュメントでは、コードブロックでシンタックスハイライトを活用できます：

```typescript{4,8-10}
// GraphQLクライアントの設定例
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({  // ハイライト: クライアントの初期化
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {  // ハイライト: クエリオプションの設定
      fetchPolicy: 'cache-and-network',  // ハイライト: フェッチポリシーの設定
      errorPolicy: 'all',  // ハイライト: エラーポリシーの設定
    },
  },
});
```

## カスタムコンテナの活用

ai-schemaのドキュメントでは、情報を効果的に伝えるためにカスタムコンテナを活用できます：

::: info
ai-schemaは、AI駆動開発を安全に推進するための強力なツールです。
:::

::: tip
複数のプロジェクト間で一貫したスキーマ定義を維持するには、共有リポジトリを使用してください。
:::

::: warning
AIの出力は常に検証してください。ai-schemaはガードレールを提供しますが、最終的な責任は開発者にあります。
:::

::: danger
本番環境では、適切なセキュリティ対策を講じてください。特に、ユーザー入力の検証は重要です。
:::

::: details ai-schemaの内部動作
ai-schemaは、GraphQLスキーマやOpenAI APIなどのバックエンドサービスと連携し、AIが間違いを犯しても安全性を担保するガードレールを提供します。スキーマ定義に基づいて型チェックを行い、AIの出力が常にバックエンドと互換性を持つことを保証します。
:::

## 詳細情報

ai-schemaの詳細については、[GitHub リポジトリ](https://github.com/ToyB0x/ai-schema)を参照してください。
