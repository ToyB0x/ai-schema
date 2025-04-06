# 高度なAIアノテーション: スキーマ生成によるフロントエンドとバックエンドの橋渡し

UI要素のアノテーション内にAPIコントラクト情報を埋め込む概念（ユースケース7で紹介）は、自動スキーマ生成と同期のためにAIを活用することで大幅に拡張できます。このアプローチは、特にフロントエンドの設計や要件が急速に進化するシナリオで、開発ワークフローを効率化します。

## アノテーションからの自動スキーマ生成

IDEやCI/パイプラインに統合された、プロジェクトのUIコンポーネント全体の `data-ai-annotation` 属性を分析できるAIツールを想像してみてください。

**シナリオ:** 開発者がフォーム送信ボタンにアノテーションを付けます。

```html
<button data-ai-annotation='{
  "action": "createUser",
  "endpoint": "/api/users",
  "method": "POST",
  "request_payload": {
    "name": "string",
    "email": "string (email format)",
    "role": ["admin", "editor", "viewer"]
  },
  "response_payload": {
    "userId": "string (uuid)",
    "status": "created"
  }
}'>ユーザー作成</button>
```

**AI駆動の生成:**

1.  **GraphQLスキーマ:** AIはこのアノテーションを解析し、対応するGraphQLミューテーションと関連する型を生成できます。

    ```graphql
    type Mutation {
      createUser(input: CreateUserInput!): CreateUserPayload
    }

    input CreateUserInput {
      name: String!
      email: String! # カスタムEmailスカラーの使用を検討
      role: [UserRole!]
    }

    enum UserRole {
      ADMIN
      EDITOR
      VIEWER
    }

    type CreateUserPayload {
      userId: ID!
      status: String!
    }
    ```

2.  **OpenAPI (Swagger) スキーマ:** 同様に、OpenAPI仕様も生成できます。

    ```yaml
    paths:
      /api/users:
        post:
          summary: 新しいユーザーを作成
          requestBody:
            required: true
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    name:
                      type: string
                    email:
                      type: string
                      format: email
                    role:
                      type: array
                      items:
                        type: string
                        enum: [admin, editor, viewer]
                  required:
                    - name
                    - email
                    - role
          responses:
            '201': # 201 Created ステータスを想定
              description: ユーザーが正常に作成されました
              content:
                application/json:
                  schema:
                    type: object
                    properties:
                      userId:
                        type: string
                        format: uuid
                      status:
                        type: string
    ```

3.  **Prismaスキーマ（データベース用）:** AIはデータ構造に基づいて基本的なPrismaモデルを推測することもできます。

    ```prisma
    model User {
      id    String @id @default(cuid()) // userIdにcuidを想定
      name  String
      email String @unique
      role  Role   // Roleは他の場所で定義されたenumを想定
      // ... createdAt、updatedAtなどの他のフィールド
    }

    enum Role {
      ADMIN
      EDITOR
      VIEWER
    }
    ```

**利点:** この自動生成により、開発者が記述する必要のあるボイラープレートコードが大幅に削減され、フロントエンドの期待とバックエンドの実装の間の一貫性が確保され、ドキュメント（OpenAPI仕様など）が簡単に最新の状態に保たれます。

## インテリジェントなスキーマ同期と更新

真の力は*変更*を扱う際に現れます。UI要件が進化し、アノテーションが更新され、バックエンドが適応する必要がある場合です。

**シナリオ:** `createUser` アクションに、オプションの `department` フィールドが必要になりました。アノテーションが更新されます。

```html
<button data-ai-annotation='{
  "action": "createUser",
  "endpoint": "/api/users",
  "method": "POST",
  "request_payload": {
    "name": "string",
    "email": "string (email format)",
    "role": ["admin", "editor", "viewer"],
    "department": "string (optional)" // 新しいフィールドが追加されました
  },
  "response_payload": { ... }
}'>ユーザー作成</button>
```

**MCPを介したAI駆動の同期:**

この同期プロセスは、Model Context Protocol (MCP) を使用して効果的に調整でき、AIエージェントが構造化された制御された方法でコードベースと対話できるようになります。

1.  **MCPを介したコード読み取り:** アノテーションの変更または開発者のリクエストによってトリガーされるAIエージェントは、MCPツール（例：`readFileContent` または特化した `readSchemaFile`）を使用して、関連する既存のファイルにアクセスします。
    *   更新されたアノテーションを含むHTML/コンポーネントファイル。
    *   現在のスキーマファイル（例：`schema.graphql`、`openapi.yaml`、`schema.prisma`）。
    *   潜在的に、関連するバックエンドコードファイル（コントローラー、モデル、サービスレイヤー）。

2.  **差分分析（AI内部ロジック）:** AIは*新しい*アノテーション（例：`request_payload`）で定義された構造と*既存の*スキーマファイルから読み取ったコンテンツを比較します。必要な追加、変更、または削除を特定します。このシナリオでは、オプションの `department` フィールドの必要性を特定します。

3.  **MCPを介した非破壊的な提案:** コードを直接変更する代わりに、AIはMCPツール（例：`insertSuggestionComment`）を使用して、適切なファイルに*コメントアウトされた*提案を書き込みます。これにより、既存のコードは機能したままで、開発者に完全な制御権が与えられます。

    *   **GraphQL (`schema.graphql`):**
        ```graphql
        input CreateUserInput {
          name: String!
          email: String! # カスタムEmailスカラーの使用を検討
          role: [UserRole!]
          # // AI-Annotation 2025-04-05による提案
          # department: String
        }
        ```

    *   **OpenAPI (`openapi.yaml`):**
        ```yaml
        # ... 既存のプロパティ ...
        # # AI-Annotation 2025-04-05による提案
        # department:
        #   type: string
        #   nullable: true
        ```

    *   **Prisma (`schema.prisma`):**
        ```prisma
        model User {
          id    String @id @default(cuid())
          name  String
          email String @unique
          role  Role
          // // AI-Annotation 2025-04-05による提案
          // department String?
          // ... 他のフィールド ...
        }
        ```

    *   **バックエンドコード（例：コントローラー）:** AIは関連するコードセクションの近くにコメントで変更を提案する場合があります。
        ```typescript
        // // AI-Annotation 2025-04-05による提案: 入力検証と処理に'department'を追加
        // const { name, email, role /*, department */ } = validatedInput;
        // await userService.create({ name, email, role /*, department */ });
        ```

4.  **開発者のレビューとアクション:** 開発者はこれらの明確にマークされた、コメントアウトされた提案を確認します。コンテキスト内で提案された変更を簡単にレビューできます。同意する場合は、関連する行のコメントを解除するだけで変更を適用できます。同意しない場合は、提案を無視または変更できます。

**MCPベースの提案の利点:**

*   **安全性:** アクティブなコードを直接変更しないことで、偶発的な破壊的変更を回避します。
*   **明確さ:** 提案はソースと日付で明確にマークされています。
*   **開発者の制御:** 開発者はコードベースを完全に制御し、どの提案を受け入れるかを決定します。
*   **統合:** 既存のレビューワークフロー（例：コードレビューでこれらのコメント付き提案を簡単に発見して議論できる）にうまく適合します。

**MCPベースの同期の技術的実装の考慮事項:**

*   **堅牢なアノテーション解析:** システムは `data-ai-annotation` JSONを解析する信頼性の高い方法を必要とし、潜在的なエラーやバリエーションを処理します。
*   **スキーマ表現:** AIは異なるスキーマタイプ（GraphQL AST、OpenAPI Object Model、Prisma DMMFまたは類似）の内部表現を必要とします。
*   **MCPツール設計:** ファイルの読み取り（`readFileContent`）、コメントの挿入（`insertSuggestionComment`）、および潜在的により高度な分析（`analyzeCodeStructure`）のための明確なMCPツールを定義します。これらのツールには適切な権限が必要です。
*   **コメント挿入ロジック:** `insertSuggestionComment` ツールは、スキーマファイルまたはコードファイル内の正しい挿入ポイント（例：特定の型定義、モデル内、または関連する関数呼び出しの近く）を見つけるためのロジックを必要とします。これには基本的なAST分析または洗練された正規表現/パターンマッチングが含まれる場合があります。
*   **コンテキスト理解:** AIはアノテーションだけでなく、プロジェクト構造、使用されているフレームワーク（例：Express、NestJS、FastAPI）、およびORM/データベースクライアントパターンを理解して、意味のあるコード変更を行う必要があります。これには `package.json`、設定ファイルの分析、または特定のフレームワーク規約でトレーニングされた言語モデルの使用が含まれる場合があります。
*   **コンテキスト理解（依然として必要）:** コメントを挿入する場合でも、AIはそれらを正しく配置するためのコンテキストを必要とします。プロジェクト構造とフレームワーク規約の理解は依然として重要です。
*   **提案管理:** 提案の管理方法を検討します。アノテーションが再び変更された場合、古い提案は自動的に削除されるべきですか？受け入れられた提案はどのように追跡されますか？

**利点（強化）:** このMCP駆動の提案ベースのアプローチは、同期の利点を維持しながら、安全性と開発者の制御を大幅に強化します。アノテーションを実用的で非侵入的な提案に変換し、AI支援を開発者の既存のワークフローにシームレスに統合します。