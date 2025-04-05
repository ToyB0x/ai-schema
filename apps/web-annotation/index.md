---
layout: home

hero:
  name: "AI-annotation"
  text: "Collaborative HTML Annotation for Human-AI Interaction"
  tagline: "Bridge the gap between humans and AI through intuitive annotations directly on your web interface."
  image:
    src: /logo.svg
    alt: ai-annotation Logo
  actions:
    - theme: brand
      text: Get Started
      link: /concept
    # - theme: alt
    #   text: View on GitHub
    #   link: /# # Placeholder for GitHub link
    - theme: alt
      text: API Examples
      link: /api

features:
  - title: Simple Integration
    details: Add just one script tag to your HTML to enable annotation features instantly.
    icon: ✨
  - title: Interactive Annotations
    details: Hover over UI components in your browser to view and edit annotations seamlessly.
    icon: 💬
  - title: Human & AI Collaboration
    details: Annotations are designed to be easily understood and modified by both humans and AI agents.
    icon: 🤝
  - title: Contextual Understanding
    details: Provide rich context to AI about your UI components directly through annotations.
    icon: 🧠
  - title: MCP Service Integration
    details: Leverage the Model Context Protocol (MCP) for advanced AI interactions and data exchange.
    icon: 🔌
  - title: Flexible & Extensible
    details: Adapt the annotation system to various use cases and integrate with your existing tools.
    icon: 🛠️

footer: MIT Licensed | Copyright © 2025 ai-annotation Contributors
---

# Enhancing Human-AI Collaboration with HTML Annotations

ai-annotation provides a novel way for humans and AI to collaborate by adding contextual annotations directly to HTML elements. Simply include our script, and start annotating your web interface.

## How it Works

1.  **Embed the Script:** Add a single `<script>` tag to your HTML file.
2.  **Annotate Elements:** Use specific attributes or a visual editor (coming soon!) to add annotations to any HTML element.
3.  **View & Interact:** Hover over elements in the browser to see their annotations.
4.  **AI Integration:** AI agents can access these annotations via our MCP service or directly from the DOM, enabling them to understand the UI context better.

This system facilitates tasks like AI-driven UI testing, automated documentation generation, accessibility improvements, and more, all through shared understanding embedded within the HTML itself.

::: code-group

```html [1. Add Script Tag]
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <!-- Add the ai-annotation script -->
  <script src="https://cdn.example.com/ai-annotation.js" defer></script>
</head>
<body>
  <!-- Your HTML content -->
  <button
    id="register-btn"
    data-ai-annotation="{ backend: 'graphql', schema: { path: 'path/to/schema', query: 'query xxx' } }">
    Register
  </button>
</body>
</html>
```

```json [2. Configure MCP (Optional)]
// In your VSCode settings.json or similar
{
  "mcpServers": {
    "@ai-annotation/mcp": {
      "command": "node", // Or appropriate command
      "args": [
        "/path/to/ai-annotation-mcp-server"
      ],
      "autoApprove": ["readAnnotations", "updateAnnotation"], // Example operations
      "disabled": false
    }
  }
}
```

```markdown [3. AI Interaction Example]
<!-- Via MCP Tool -->
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>readAnnotations</tool_name>
  <arguments>
    {
      "url": "http://localhost:3000/myapp",
      "selector": "button"
    }
  </arguments>
</use_mcp_tool>

<!-- AI analyzing DOM directly -->
Let's analyze the button with the annotation "Submit user registration form".
```

:::
