---
layout: home

hero:
  name: "ai-schema"
  text: "Teach AI Your Documentation Standards, Not the Other Way Around"
  tagline: "Write once, enforce everywhere. Define your rules and watch AI conform to your standards."
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
  - title: Rule-Based Linting
    details: Lint documents against specified rules with customizable standards that reflect your organization's voice and structure.
    icon: 🔍
  - title: Auto-Fix Capability
    details: Automatically fix linting errors and ensure consistent documentation across your entire project.
    icon: 🔧
  - title: Flexible Rule System
    details: Create, share, and extend rules with a hierarchical system that respects rule priority and resolves conflicts.
    icon: 🧩
  - title: MCP Server Integration
    details: Seamless integration with AI tools through Model Context Protocol servers for enhanced capabilities.
    icon: 🔌
  - title: Remote Rules
    details: Load rules from local files or remote repositories to maintain consistent standards across teams.
    icon: 🌐
  - title: Performance Optimization
    details: Rule packing and caching for improved performance, making documentation linting efficient at scale.
    icon: ⚡

footer: MIT Licensed | Copyright © 2025 ai-schema Contributors
---

# The Future of Documentation is Rule-Driven

ai-schema bridges the gap between AI capabilities and human documentation standards. Instead of adapting to how AI writes, define your rules and watch AI conform to your standards.

## Overview

ai-schema is an experimental project exploring AI capabilities for document linting. It provides a flexible framework for defining and enforcing documentation standards through a rule-based system. The tool integrates with AI platforms like Cline and other AI coding tools via MCP (Model Context Protocol) servers.

```bash
# Quick installation
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

```markdown [Usage]
You (AI assistants like Cline or Roo Code) must follow these important rules:

- Verify that the MCP Server @ai-schema/mcp is properly set up
- If not set up correctly, inform the user "The @ai-schema/mcp configuration is incorrect" and halt all subsequent processing
- If set up correctly, execute @ai-schema/mcp's load-remote-act-rule and apply the following rules
```

```markdown [Rules]
# Technical Term Consistency Rule

## Purpose
- Ensure consistent use of technical terms
- Prevent confusion from terminology variations

## Rule
Technical terms must be used consistently throughout the document.
```

:::
