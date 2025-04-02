---
outline: deep
---

# ai-schema API リファレンス

このページでは、ai-schemaが提供するAPIと統合機能について説明します。ai-schemaは柔軟なAPIを通じて、ドキュメントの標準化とルールベースのリンティングを実現します。

## MCP サーバー統合

ai-schemaはModel Context Protocol (MCP) サーバーを通じてAIツールと統合されます。この統合により、AIアシスタントはドキュメントのリンティングと修正を自動的に行うことができます。

```typescript
// MCP サーバーの基本実装例
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

class AiLintServer {
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

ai-schemaは、ドキュメントのリンティングと修正のための包括的なAPIを提供します。

### Rule インターフェース

すべてのルールは以下のインターフェースを実装します：

```typescript
interface Rule {
  id: string;
  validate(context: RuleContext): RuleViolation[];
}

interface RuleContext {
  document: Document;
  options: Record<string, any>;
}

interface RuleViolation {
  rule: string;
  message: string;
  location: { line: number, column: number };
  severity: 'error' | 'warning' | 'info';
  fix?: () => void;
}
```

### ルール実装例

```typescript{4-5}
// 見出しルールの実装例
import { Rule, RuleContext, RuleViolation } from '@ai-schema/core';

export class HeadingRule implements Rule {
  id = 'headings';  // ハイライト: ルールの一意識別子
  
  validate(context: RuleContext): RuleViolation[] {
    const violations: RuleViolation[] = [];
    const { document, options } = context;
    
    // H1が存在するかチェック
    if (options.requireH1 && !document.hasH1()) {
      violations.push({
        rule: this.id,
        message: 'ドキュメントにはH1見出しが必要です',
        location: { line: 1, column: 1 },
        severity: 'error',
        fix: () => document.prependHeading('# ドキュメントタイトル', 1)
      });
    }
    
    return violations;
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
| `lint-document` | 指定されたルールに対してドキュメントをリンティングします |
| `auto-fix` | リンティングエラーを自動修正します |
| `summarize-rules` | 現在のルールをまとめます |
| `debug-rule` | ルールの適用をデバッグします |
| `load-local-rule` | ローカルルールを読み込みます |
| `load-remote-rule` | リモートリポジトリからルールを読み込みます |
| `pack-rules` | パフォーマンス向上のためにルールをパッキングします |
| `cache-remote-rules` | リモートルールをキャッシュします |

## 設定例

ai-schemaの設定ファイル（`ai-schema.config.json`）の例：

```json
{
  "rules": {
    "headings": {
      "enabled": true,
      "options": {
        "requireH1": true,
        "maxDepth": 3
      }
    },
    "spelling": {
      "enabled": true,
      "options": {
        "language": "ja-JP",
        "ignoreWords": ["ai-schema", "MCP"]
      }
    },
    "changelog": {
      "enabled": true,
      "options": {
        "dateFormat": "YYYY/MM/DD",
        "requireChangelog": true
      }
    }
  }
}
```

## 詳細情報

ai-schemaのAPIと統合機能の詳細については、[GitHub リポジトリ](https://github.com/ToyB0x/ai-schema)を参照してください。
