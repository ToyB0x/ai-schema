# ai-annotation 実装ガイド

`ai-annotation` 実装ガイドへようこそ！このガイドでは、`ai-annotation` をセットアップし、HTML内で直接人間とAIの協調を促進するために使用する方法を説明します。

## 1. クイックスタート: アノテーションの追加

`ai-annotation` の開始は、信じられないほどシンプルになるように設計されています。

### ステップ1: スクリプトタグを含める

以下のスクリプトタグをHTMLファイルの `<head>` または `<body>` に追加します。このスクリプトは、ブラウザでコアなアノテーション機能を有効にします。

```html
<script src="https://cdn.example.com/ai-annotation.js" defer></script>
<!-- 利用可能になったら実際のスクリプトURLに置き換えてください -->
```

### ステップ2: 最初のアノテーションを追加する

アノテーションを付けたい任意のHTML要素に `data-ai-annotation` 属性を追加します。

```html
<body>
  <h1>アプリへようこそ</h1>

  <button data-ai-annotation="認証情報を検証した後、ユーザーをログインさせます。">
    ログイン
  </button>

  <p data-ai-annotation="ログインしたユーザーにウェルカムメッセージを表示します。">
    こんにちは、ユーザー！
  </p>
</body>
```

### ステップ3: ブラウザで表示する

HTMLファイルをWebブラウザで開きます。これで、「ログイン」ボタンまたは段落にマウスカーソルを合わせると、それぞれのアノテーションが表示されるはずです（例：ツールチップとして）。

## 2. 効果的なアノテーションの記述

アノテーションはコミュニケーションの架け橋として機能します。人間とAIの両方にとって明確で情報価値のあるものにしましょう。

### シンプルなテキストアノテーション

簡単な説明には、単純な文字列で十分です。

```html
<img src="logo.png" alt="会社ロゴ" data-ai-annotation="公式の会社ロゴ。">
```

### 構造化されたJSONアノテーション

より複雑な情報には、属性内にJSON文字列を使用します。これにより、よりリッチでクエリ可能なデータが可能になります。

```html
<input
  type="password"
  id="password"
  data-ai-annotation='{
    "description": "ユーザーパスワード入力フィールド。",
    "validation_rules": ["min_length: 8", "requires_special_char"],
    "security_level": "high",
    "related_component": "login-form"
  }'
/>
```

**一般的なJSONフィールド:**

*   `description`: (String) 要素が何であるか、または何をするか。
*   `purpose`: (String) 要素に関連する目標またはユーザータスク。
*   `state`: (String) 現在の視覚的または機能的な状態（例: "disabled", "active", "error"）。
*   `expected_input`: (String) 入力フィールドの場合、期待されるデータ形式または制約を記述します。
*   `test_id`: (String) 自動テストフレームワーク用の識別子。
*   `accessibility_notes`: (String) ARIA属性またはキーボードナビゲーションに関連する情報。
*   `responsible_team`: (String) このコンポーネントを所有するチーム。

特定のコラボレーションニーズに最も価値を提供するフィールドを選択してください。

## 3. ブラウザインタラクション

含まれているスクリプトは、基本的なブラウザインタラクションを提供します。

*   **ホバーして表示:** アノテーション付き要素の上にマウスカーソルを移動すると、その内容が表示されます。
*   **(将来) 編集:** 将来のバージョンでは、専用のUIパネルまたはコンテキストメニューを介して、ブラウザ内でアノテーションを直接編集できる可能性があります。

## 4. アノテーションのレンダリングとカスタマイズ

`data-ai-annotation` はAIが情報にアクセスするための構造化された方法を提供しますが、このデータをWebページ上で直接人間に見やすくすることも、コラボレーションにとって同様に重要です。

### デフォルトレンダラー: ホバー時のツールチップ

HTMLに含める標準の `ai-annotation.js` スクリプトは、デフォルトのレンダリングメカニズムを提供します。

*   **ツールチップ表示:** `data-ai-annotation` 属性を持つ要素にカーソルを合わせると、スクリプトはアノテーションの内容をシンプルなツールチップポップアップで表示します。
*   **可読性:** これにより、ページと対話する開発者、テスター、またはデザイナーがアノテーションにすぐにアクセスできるようになります。

### レンダラーのカスタマイズ

デフォルトのツールチップは単なる出発点です。レンダリングメカニズムはカスタマイズ可能に設計されています。

1.  **スクリプトの変更:** 提供されている `ai-annotation.js` スクリプトを変更するか、アノテーションの表示方法を変更するために独自の 実装で完全に置き換えることができます。

2.  **スキーマ駆動レンダリング:** `data-ai-annotation` コンテンツ用に特定のJSONスキーマを定義します。カスタムスクリプトは、このJSONを解析し、スキーマフィールドに基づいてより洗練されたグラフィカルなポップアップをレンダリングできます（例：`type` に基づいて異なるアイコンを表示する、`confidence` スコアをフォーマットするなど）。

    ```html
    <!-- スキーマベースのアノテーションの例 -->
    <button data-ai-annotation='{
      "action": "submit",
      "target": "/api/users",
      "confirmation_required": true,
      "ui_importance": "high"
    }'>ユーザー送信</button>
    ```

    カスタムレンダラーは、これをアイコンや `ui_importance` に基づく特定の色などで表示できます。

3.  **出力ターゲットの変更:** レンダラーは視覚的なポップアップである必要はありません。スクリプトをカスタマイズして、次のようにすることができます。
    *   ホバーまたはクリック時にブラウザの開発者コンソールにアノテーションをログ記録する。
    *   アプリケーションのUI内の専用パネルにアノテーションを表示する。
    *   アノテーションデータをサードパーティの分析またはデバッグサービスに送信する。

レンダリングスクリプトをカスタマイズすることで、チームのワークフローとプロジェクトの特定のニーズに合わせて、アノテーションの可視性とインタラクションを調整できます。


## 5. MCPによるAI統合

Model Context Protocol (MCP) サービスにより、AIエージェントはプログラムでアノテーションと対話できます。

### MCPサーバーのセットアップ

環境（例：VSCode `settings.json`）で `ai-annotation` MCPサーバーを設定します。

```json
{
  "mcpServers": {
    "@ai-annotation/mcp": {
      "command": "node", // またはサーバーを起動するコマンド
      "args": ["/path/to/ai-annotation-mcp-server/main.js"],
      "autoApprove": ["readAnnotations"], // プロンプトなしで読み取りを許可
      "disabled": false
    }
  }
}
```

### MCPによるアノテーションの読み取り

AIアシスタントは `use_mcp_tool` を使用してアノテーションを取得できます。

```xml
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>readAnnotations</tool_name>
  <arguments>
    {
      "url": "http://localhost:8080/my-page.html",
      "selector": "#password" // ターゲット要素のCSSセレクター
    }
  </arguments>
</use_mcp_tool>
```

**期待される結果（例）:**

```json
{
  "selector": "#password",
  "annotation": {
    "description": "ユーザーパスワード入力フィールド。",
    "validation_rules": ["min_length: 8", "requires_special_char"],
    "security_level": "high",
    "related_component": "login-form"
  }
}
```

### MCPによるアノテーションの更新（例）

```xml
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>updateAnnotation</tool_name>
  <arguments>
    {
      "url": "http://localhost:8080/my-page.html",
      "selector": "#password",
      "newAnnotation": {
        "description": "ユーザーパスワード入力フィールド。更新済み。",
        "validation_rules": ["min_length: 8", "requires_special_char", "no_common_passwords"],
        "security_level": "very_high", // 変更
        "related_component": "login-form"
      }
    }
  </arguments>
</use_mcp_tool>
```

## 6. AIによる直接DOM操作

Webページの DOM に直接アクセスできるAIエージェント（ブラウザ拡張機能、Puppeteerスクリプトなど）は、単に `data-ai-annotation` 属性をクエリできます。

```javascript
// ブラウザのquerySelectorを使用した例
const button = document.querySelector('button');
const annotationData = button.getAttribute('data-ai-annotation');

if (annotationData) {
  try {
    const annotation = JSON.parse(annotationData); // JSONの場合
    console.log('アノテーション:', annotation);
  } catch (e) {
    console.log('アノテーション（テキスト）:', annotationData); // プレーンテキストの場合
  }
}
```

## 7. ユースケース例

*   **テストボットへの指示:** "`test_id: 'SUBMIT_ORDER'` でアノテーションされたボタンをクリックしてください。"
*   **ドキュメント生成:** アノテーションから `description` フィールドをすべて抽出して、コンポーネントリファレンスを構築します。
*   **アクセシビリティチェック:** "`role: 'button'` でアノテーションされたすべての要素がキーボードでアクセス可能であることを確認します。"
*   **デザインレビュー:** "`color_token` アノテーションがデザインシステムのパレットと一致しない要素にフラグを立てます。"

## 8. カスタマイズ（高度）

*（属性名やホバースタイルの変更などのカスタマイズオプションの詳細は、将来のバージョンでここに追加される予定です。）*

## 9. トラブルシューティング

*   **アノテーションが表示されない:**
    *   スクリプトタグが正しく含まれていて、パスが有効であることを確認します。
    *   ブラウザの開発者コンソールでスクリプトエラーを確認します。
    *   `data-ai-annotation` 属性のスペルが正しいことを確認します。
*   **JSONパースエラー:**
    *   属性内のJSONが有効であることを確認します（オンラインバリデータを使用）。引用符やカンマに注意してください。

---

このガイドでは、`ai-annotation` の実装の基本を提供しています。プロジェクトが進化するにつれて、更新された機能とベストプラクティスについてはここを参照してください。
