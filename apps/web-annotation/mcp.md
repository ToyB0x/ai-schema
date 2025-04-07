---
outline: deep
---

# ai-annotation API リファレンス

このページでは、HTMLアノテーションと対話するためのModel Context Protocol (MCP) サーバー統合に焦点を当てた、`ai-annotation` が提供するAPIについて説明します。

## 1. MCPサーバー統合

`ai-annotation` は、AIエージェントやその他のツールが直接ブラウザアクセスなしでWebページ上のアノテーションをプログラムで読み取り、潜在的に変更できるようにするオプションのMCPサーバーを提供します。

### MCPサーバーのセットアップ

MCP統合を使用するには、`ai-annotation` MCPサーバーを実行し、クライアント（例：VSCode）がそれに接続するように設定する必要があります。

**MCPサーバー設定例（VSCode `settings.json` 内）:**

```json
{
  "mcpServers": {
    "@ai-annotation/mcp": {
      // ai-annotation MCPサーバーを起動するコマンド
      "command": "node",
      "args": ["/path/to/your/ai-annotation-mcp/server.js"],
      // 一般的な読み取り操作を自動的に承認し、その他はプロンプトを表示
      "autoApprove": ["readAnnotations", "findElement"],
      "disabled": false // trueに設定すると無効化
    }
  }
}
```

`/path/to/your/ai-annotation-mcp/server.js` を実際のサーバー実行可能ファイルへのパスに置き換えてください。

## 2. MCPツール

`@ai-annotation/mcp` サーバーは、アノテーション付きWebページと対話するためのツールを提供します。

### `readAnnotations`

Webページ上の指定された要素からアノテーションを読み取ります。

**入力スキーマ:**

```json
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "アクセスするWebページのURL。"
    },
    "selector": {
      "type": "string",
      "description": "特定の要素をターゲットにするCSSセレクター。省略すると、`data-ai-annotation` 属性を持つすべての要素からアノテーションを読み取ります。"
    }
  },
  "required": ["url"],
  "additionalProperties": false
}
```

**出力スキーマ（例）:**

要素のセレクターパスとそのアノテーションコンテンツを含むオブジェクトの配列を返します。

```json
[
  {
    "selector": "body > button:nth-child(2)",
    "annotation": "認証情報を検証した後、ユーザーをログインさせます。"
  },
  {
    "selector": "#password",
    "annotation": {
      "description": "ユーザーパスワード入力フィールド。",
      "validation_rules": ["min_length: 8", "requires_special_char"],
      "security_level": "high"
    }
  }
  // ... その他のアノテーション
]
```

**使用例:**

```xml
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>readAnnotations</tool_name>
  <arguments>
    {
      "url": "http://localhost:8080/login",
      "selector": "button, input[type='password']"
    }
  </arguments>
</use_mcp_tool>
```

### `updateAnnotation`

Webページ上の特定の要素にアノテーションを更新または追加します。（適切な権限/プロンプト承認が必要）。

**入力スキーマ:**

```json
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "変更するWebページのURL。"
    },
    "selector": {
      "type": "string",
      "description": "更新する特定の要素をターゲットにするCSSセレクター。"
    },
    "newAnnotation": {
      "type": ["string", "object", "null"],
      "description": "新しいアノテーションコンテンツ（文字列またはJSONオブジェクト）。アノテーションを削除するにはnullを使用します。"
    }
  },
  "required": ["url", "selector", "newAnnotation"],
  "additionalProperties": false
}
```

**出力スキーマ（例）:**

確認メッセージを返します。

```json
{
  "success": true,
  "message": "セレクター '#username' に一致する要素のアノテーションが正常に更新されました。"
}
```

**使用例:**

```xml
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>updateAnnotation</tool_name>
  <arguments>
    {
      "url": "http://localhost:8080/profile",
      "selector": "#username",
      "newAnnotation": {
        "description": "ユーザーの表示名。",
        "editable": false
      }
    }
  </arguments>
</use_mcp_tool>
```

### `findElement`

アノテーションコンテンツに基づいて要素を検索します。

**入力スキーマ:**

```json
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "検索するWebページのURL。"
    },
    "annotationQuery": {
      "type": "string",
      "description": "アノテーションテキスト内を検索するクエリ文字列。JSONアノテーションの場合は、ドット表記を使用します（例：'security_level:high'）。"
    }
  },
  "required": ["url", "annotationQuery"],
  "additionalProperties": false
}
```

**出力スキーマ（例）:**

クエリに一致するアノテーションを持つ要素のセレクターパスの配列を返します。

```json
[
  "#password",
  "input[name='confirm_password']"
]
```

**使用例:**

```xml
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>findElement</tool_name>
  <arguments>
    {
      "url": "http://localhost:8080/settings",
      "annotationQuery": "security_level:high"
    }
  </arguments>
</use_mcp_tool>
```

## 3. クライアントサイドスクリプトAPI（概念的）

`ai-annotation.js` スクリプトは主にホバー時のアノテーション表示を処理します。将来的には最小限のJavaScript API（例：プログラムでアノテーション表示をトリガーしたり、クライアントサイドからアノテーションにアクセスしたりするため）を公開する可能性がありますが、プログラムによる対話の主要な方法は、MCPサーバーまたは直接のDOM操作を介することを意図しています。

**直接DOM操作の例（JavaScript）:**

```javascript
// 要素からアノテーションを取得
const element = document.getElementById('myButton');
const annotationString = element.getAttribute('data-ai-annotation');

let annotationData;
if (annotationString) {
  try {
    annotationData = JSON.parse(annotationString); // JSONとして解析を試みる
  } catch (e) {
    annotationData = annotationString; // 文字列にフォールバック
  }
  console.log(annotationData);
}

// 要素にアノテーションを設定
const newAnnotation = { purpose: "ダッシュボードに移動", timestamp: Date.now() };
element.setAttribute('data-ai-annotation', JSON.stringify(newAnnotation));
```

---

このAPIリファレンスは、`ai-annotation` との対話の概要を提供します。最新の詳細については、MCPサーバー実装内の特定のツールドキュメントを参照してください。
