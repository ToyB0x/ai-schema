---
layout: home

hero:
  name: "ai-schema"
  text: "A Schema Definition Platform for Safe and Effective AI Collaboration"
  tagline: "Innovate front-end development with guardrails and schema definitions that accelerate AI-driven development."
  image:
    src: /logo.svg
    alt: ai-schema Logo
  actions:
    - theme: brand
      text: Get Started
      link: /concept
    - theme: alt
      text: View on GitHub
      link: https://github.com/ToyB0x/ai-schema
    - theme: alt
      text: API Examples
      link: /api

features:
  - title: Promote AI-Driven Development
    details: Accelerate the development process through collaboration with AI, utilizing methods like Vibe Coding.
    icon: 🚀
  - title: Front-End Focused
    details: Particularly enhances AI-driven development in the UI domain, delivering significant results even with minor imperfections.
    icon: 🎨
  - title: Safe Guardrails
    details: Provides mechanisms to ensure safety even if AI makes mistakes, minimizing development risks.
    icon: 🛡️
  - title: GraphQL Integration
    details: Achieves robust schema definitions and guardrails through seamless integration with backend services.
    icon: 🔌
  - title: OpenAI Integration
    details: Integrates with OpenAI's API to provide appropriate guidance and schemas to AI models.
    icon: 🤖
  - title: Human-AI Coexistence
    details: Enables effective collaboration with an interface friendly to both AI and humans.
    icon: 🤝

footer: MIT Licensed | Copyright © 2025 ai-schema Contributors
---

# Pioneering the Future of AI-Driven Development

ai-schema is a platform that provides guardrails and schema definitions to safely and efficiently promote AI-driven development. Especially in front-end development, it ensures safety even if AI makes mistakes and promotes collaboration between developers and AI.

## Overview

In the future of IT business, AI-driven development using methods like Vibe Coding is indispensable. Particularly in the UI domain, AI-driven development can yield significant results even with minor imperfections. ai-schema provides the guardrails and schema definitions to safely promote such AI-driven development.

```bash
# Quick Installation
git clone https://github.com/ToyB0x/ai-schema.git
cd ai-schema
pnpm install && pnpm build
```

::: code-group

```json [Configuration]
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

```markdown [Usage Example]
Instructions for AI Assistant:

- Generate UI components based on the GraphQL schema.
- Implement form validation according to the schema definition.
- Validate user input using the OpenAI API.
```

```typescript [Schema Example]
// GraphQL Schema Definition
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

// AI generates UI components based on this schema
```

:::
