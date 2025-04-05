---
outline: deep
---

# ai-annotation API Reference

This page describes the APIs provided by `ai-annotation`, focusing on the Model Context Protocol (MCP) server integration for interacting with HTML annotations.

## 1. MCP Server Integration

`ai-annotation` offers an optional MCP server that allows AI agents and other tools to programmatically read and potentially modify annotations on web pages without direct browser access.

### Setting Up the MCP Server

To use the MCP integration, you need to run the `ai-annotation` MCP server and configure your client (e.g., VSCode) to connect to it.

**Example MCP Server Configuration (in VSCode `settings.json`):**

```json
{
  "mcpServers": {
    "@ai-annotation/mcp": {
      // Command to start the ai-annotation MCP server
      "command": "node",
      "args": ["/path/to/your/ai-annotation-mcp/server.js"],
      // Automatically approve common read operations, prompt for others
      "autoApprove": ["readAnnotations", "findElement"],
      "disabled": false // Set to true to disable
    }
  }
}
```

Replace `/path/to/your/ai-annotation-mcp/server.js` with the actual path to the server executable.

## 2. MCP Tools

The `@ai-annotation/mcp` server provides tools for interacting with annotated web pages.

### `readAnnotations`

Reads annotations from specified elements on a web page.

**Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL of the web page to access."
    },
    "selector": {
      "type": "string",
      "description": "A CSS selector to target specific elements. If omitted, reads annotations from all elements with the `data-ai-annotation` attribute."
    }
  },
  "required": ["url"],
  "additionalProperties": false
}
```

**Output Schema (Example):**

Returns an array of objects, each containing the element's selector path and its annotation content.

```json
[
  {
    "selector": "body > button:nth-child(2)",
    "annotation": "Logs the user in after validating credentials."
  },
  {
    "selector": "#password",
    "annotation": {
      "description": "User password input field.",
      "validation_rules": ["min_length: 8", "requires_special_char"],
      "security_level": "high"
    }
  }
  // ... other annotations
]
```

**Example Usage:**

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

Updates or adds an annotation to a specific element on a web page. (Requires appropriate permissions/prompt approval).

**Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL of the web page to modify."
    },
    "selector": {
      "type": "string",
      "description": "A CSS selector to target the specific element to update."
    },
    "newAnnotation": {
      "type": ["string", "object", "null"],
      "description": "The new annotation content (string or JSON object). Use null to remove the annotation."
    }
  },
  "required": ["url", "selector", "newAnnotation"],
  "additionalProperties": false
}
```

**Output Schema (Example):**

Returns a confirmation message.

```json
{
  "success": true,
  "message": "Annotation updated successfully for element matching selector '#username'."
}
```

**Example Usage:**

```xml
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>updateAnnotation</tool_name>
  <arguments>
    {
      "url": "http://localhost:8080/profile",
      "selector": "#username",
      "newAnnotation": {
        "description": "User's display name.",
        "editable": false
      }
    }
  </arguments>
</use_mcp_tool>
```

### `findElement`

Finds elements based on their annotation content.

**Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL of the web page to search."
    },
    "annotationQuery": {
      "type": "string",
      "description": "A query string to search within annotation text. For JSON annotations, use dot notation (e.g., 'security_level:high')."
    }
  },
  "required": ["url", "annotationQuery"],
  "additionalProperties": false
}
```

**Output Schema (Example):**

Returns an array of selector paths for elements whose annotations match the query.

```json
[
  "#password",
  "input[name='confirm_password']"
]
```

**Example Usage:**

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

## 3. Client-Side Script API (Conceptual)

The `ai-annotation.js` script primarily handles the display of annotations on hover. While it might expose a minimal JavaScript API in the future (e.g., for programmatically triggering annotation display or accessing annotations from the client-side), the primary method for programmatic interaction is intended to be via the MCP server or direct DOM manipulation.

**Example Direct DOM Access (JavaScript):**

```javascript
// Get annotation from an element
const element = document.getElementById('myButton');
const annotationString = element.getAttribute('data-ai-annotation');

let annotationData;
if (annotationString) {
  try {
    annotationData = JSON.parse(annotationString); // Try parsing as JSON
  } catch (e) {
    annotationData = annotationString; // Fallback to string
  }
  console.log(annotationData);
}

// Set annotation on an element
const newAnnotation = { purpose: "Navigate to dashboard", timestamp: Date.now() };
element.setAttribute('data-ai-annotation', JSON.stringify(newAnnotation));
```

---

This API reference provides an overview of interacting with `ai-annotation`. Refer to specific tool documentation within the MCP server implementation for the most up-to-date details.
