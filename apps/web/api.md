---
outline: deep
---

# ai-schema API リファレンス

このページでは、ai-schemaが提供するAPIと統合機能について説明します。ai-schemaは、AI駆動開発を安全に推進するためのガードレールとスキーマ定義を提供するプラットフォームです。

## MCP サーバー統合

ai-schemaはModel Context Protocol (MCP) サーバーを通じてAIツールと統合されます。この統合により、AIアシスタントはスキーマ定義に基づいたコード生成やガードレールの適用を自動的に行うことができます。

```typescript
// MCP サーバーの基本実装例
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

class AiSchemaServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'ai-schema-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // エラーハンドリング
    this.server.onerror = (error) => console.error('[MCP Error]', error);
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('ai-schema MCP server running on stdio');
  }
}
```

## コア API

ai-schemaは、AI駆動開発を安全に推進するための包括的なAPIを提供します。

### GuardRail インターフェース

すべてのガードレールは以下のインターフェースを実装します：

```typescript
interface GuardRail {
  id: string;
  validate(input: any, context?: ValidationContext): ValidationResult;
}

interface ValidationContext {
  schema?: GraphQLSchema;
  options?: Record<string, any>;
}

interface ValidationResult {
  valid: boolean;
  violations: string[];
  suggestions?: string[];
}
```

### ガードレール実装例

```typescript{4-5}
// ユーザー入力ガードレールの実装例
import { GuardRail, ValidationResult } from '@ai-schema/core';

export class UserInputGuardRail implements GuardRail {
  id = 'user-input';  // ハイライト: ガードレールの一意識別子
  
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

## GraphQL 統合 API

ai-schemaは、GraphQLスキーマを活用したガードレールとスキーマ定義を提供します。

### GraphQLSchema インターフェース

```typescript
interface GraphQLSchemaProvider {
  getSchema(): GraphQLSchema;
  validateQuery(query: string): ValidationResult;
  validateMutation(mutation: string): ValidationResult;
}
```

### GraphQLSchema 実装例

```typescript
import { GraphQLSchemaProvider, ValidationResult } from '@ai-schema/core';
import { buildSchema, GraphQLSchema, validate } from 'graphql';

export class UserGraphQLSchemaProvider implements GraphQLSchemaProvider {
  private schema: GraphQLSchema;
  
  constructor() {
    // GraphQLスキーマの定義
    const typeDefs = `
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
    `;
    
    this.schema = buildSchema(typeDefs);
  }
  
  getSchema(): GraphQLSchema {
    return this.schema;
  }
  
  validateQuery(query: string): ValidationResult {
    const errors = validate(this.schema, query);
    
    return {
      valid: errors.length === 0,
      violations: errors.map(error => error.message)
    };
  }
  
  validateMutation(mutation: string): ValidationResult {
    return this.validateQuery(mutation);
  }
}
```

## OpenAI 統合 API

ai-schemaは、OpenAI APIを活用したガードレールとコンテンツ生成機能を提供します。

::: info
OpenAI APIを使用するには、OpenAI APIキーが必要です。
:::

### OpenAIValidator インターフェース

```typescript
interface OpenAIValidator {
  validateInput(input: string): Promise<ValidationResult>;
  generateContent(prompt: string, options?: GenerationOptions): Promise<string>;
}

interface GenerationOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}
```

### OpenAIValidator 実装例

```typescript
import { OpenAIValidator, ValidationResult, GenerationOptions } from '@ai-schema/core';
import { OpenAI } from 'openai';

export class DefaultOpenAIValidator implements OpenAIValidator {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey
    });
  }
  
  async validateInput(input: string): Promise<ValidationResult> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'あなたはユーザー入力を検証するアシスタントです。' },
        { role: 'user', content: `以下の入力が安全かどうか判断してください: ${input}` }
      ],
      temperature: 0,
    });
    
    const content = response.choices[0].message.content ?? '';
    const valid = content.toLowerCase().includes('safe');
    
    return {
      valid,
      violations: valid ? [] : ['入力が安全ではありません']
    };
  }
  
  async generateContent(prompt: string, options: GenerationOptions = {}): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: options.model ?? 'gpt-4',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens,
    });
    
    return response.choices[0].message.content ?? '';
  }
}
```

## ツール API

ai-schemaは、以下のようなツールAPIを提供します：

::: info
これらのAPIは、MCPサーバーを通じてAIアシスタントに公開されます。
:::

| ツール名 | 説明 |
|---------|------|
| `validate-schema` | GraphQLスキーマの検証を行います |
| `validate-input` | ユーザー入力の検証を行います |
| `generate-component` | スキーマに基づいたUIコンポーネントを生成します |
| `generate-query` | スキーマに基づいたGraphQLクエリを生成します |
| `generate-mutation` | スキーマに基づいたGraphQLミューテーションを生成します |
| `apply-guardrail` | ガードレールを適用します |
| `load-schema` | GraphQLスキーマを読み込みます |
| `validate-code` | 生成されたコードの検証を行います |

## 設定例

ai-schemaの設定ファイル（`ai-schema.config.json`）の例：

```json
{
  "graphql": {
    "schemaPath": "./schema.graphql",
    "endpoint": "https://api.example.com/graphql"
  },
  "openai": {
    "apiKey": "${OPENAI_API_KEY}",
    "model": "gpt-4"
  },
  "guardrails": {
    "userInput": {
      "enabled": true,
      "options": {
        "maxLength": 1000,
        "forbiddenWords": ["パスワード", "クレジットカード", "秘密"]
      }
    },
    "codeGeneration": {
      "enabled": true,
      "options": {
        "framework": "react",
        "typescript": true,
        "styling": "css-modules"
      }
    }
  }
}
```

## クライアント統合例

ai-schemaをReactアプリケーションに統合する例：

```tsx
import React, { useState } from 'react';
import { AiSchema, GuardRail } from '@ai-schema/react';
import { UserInputGuardRail } from './guardrails/UserInputGuardRail';

// ガードレールの設定
const guardrails: GuardRail[] = [
  new UserInputGuardRail()
];

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [violations, setViolations] = useState<string[]>([]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ガードレールの適用
    const validationResult = await AiSchema.validateInput(input, guardrails);
    
    if (validationResult.valid) {
      // 安全な入力の処理
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input })
      });
      
      const data = await response.json();
      setResult(data.result);
      setViolations([]);
    } else {
      // 違反の表示
      setViolations(validationResult.violations);
      setResult(null);
    }
  };
  
  return (
    <div>
      <h1>AI駆動アプリケーション</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input">入力:</label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            cols={50}
          />
        </div>
        
        {violations.length > 0 && (
          <div className="violations">
            <h3>入力エラー:</h3>
            <ul>
              {violations.map((violation, index) => (
                <li key={index}>{violation}</li>
              ))}
            </ul>
          </div>
        )}
        
        <button type="submit">送信</button>
      </form>
      
      {result && (
        <div className="result">
          <h3>結果:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

## 詳細情報

ai-schemaのAPIと統合機能の詳細については、[GitHub リポジトリ](https://github.com/ToyB0x/ai-schema)を参照してください。
