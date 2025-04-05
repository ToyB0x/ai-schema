# ai-annotation Implementation Guide

Welcome to the `ai-annotation` implementation guide! This guide will walk you through setting up and using `ai-annotation` to facilitate collaboration between humans and AI directly within your HTML.

## 1. Quick Start: Adding Annotations

Getting started with `ai-annotation` is designed to be incredibly simple.

### Step 1: Include the Script Tag

Add the following script tag to the `<head>` or `<body>` of your HTML file. This script enables the core annotation functionality in the browser.

```html
<script src="https://cdn.example.com/ai-annotation.js" defer></script>
<!-- Replace with the actual script URL when available -->
```

### Step 2: Add Your First Annotation

Add the `data-ai-annotation` attribute to any HTML element you want to annotate.

```html
<body>
  <h1>Welcome to Our App</h1>

  <button data-ai-annotation="Logs the user in after validating credentials.">
    Login
  </button>

  <p data-ai-annotation="Displays a welcome message to logged-in users.">
    Hello, User!
  </p>
</body>
```

### Step 3: View in Browser

Open your HTML file in a web browser. Now, when you hover your mouse over the "Login" button or the paragraph, their respective annotations should appear (e.g., as a tooltip).

## 2. Writing Effective Annotations

Annotations serve as a communication bridge. Make them clear and informative for both humans and AI.

### Simple Text Annotations

For straightforward descriptions, a simple string is sufficient:

```html
<img src="logo.png" alt="Company Logo" data-ai-annotation="The official company logo.">
```

### Structured JSON Annotations

For more complex information, use a JSON string within the attribute. This allows for richer, queryable data.

```html
<input
  type="password"
  id="password"
  data-ai-annotation='{
    "description": "User password input field.",
    "validation_rules": ["min_length: 8", "requires_special_char"],
    "security_level": "high",
    "related_component": "login-form"
  }'
/>
```

**Common JSON Fields:**

*   `description`: (String) What the element is or does.
*   `purpose`: (String) The goal or user task associated with the element.
*   `state`: (String) Current visual or functional state (e.g., "disabled", "active", "error").
*   `expected_input`: (String) For input fields, describe the expected data format or constraints.
*   `test_id`: (String) Identifier for automated testing frameworks.
*   `accessibility_notes`: (String) Information related to ARIA attributes or keyboard navigation.
*   `responsible_team`: (String) Which team owns this component.

Choose fields that provide the most value for your specific collaboration needs.

## 3. Browser Interaction

The included script provides basic browser interaction:

*   **Hover to View:** Move your mouse over an annotated element to see its content.
*   **(Future) Editing:** Future versions may allow direct editing of annotations within the browser via a dedicated UI panel or context menu.

## 4. Annotation Rendering & Customization

While `data-ai-annotation` provides a structured way for AI to access information, making this data easily visible to humans directly on the web page is equally important for collaboration.

### Default Renderer: Tooltip on Hover

The standard `ai-annotation.js` script you include in your HTML provides a default rendering mechanism:

*   **Tooltip Display:** When you hover over an element with a `data-ai-annotation` attribute, the script displays the annotation content in a simple tooltip popup.
*   **Readability:** This makes the annotations immediately accessible to developers, testers, or designers interacting with the page.

### Customizing the Renderer

The default tooltip is just a starting point. The rendering mechanism is designed to be customizable:

1.  **Modify the Script:** You can modify the provided `ai-annotation.js` script or replace it entirely with your own implementation to change how annotations are displayed.

2.  **Schema-Driven Rendering:** Define a specific JSON schema for your `data-ai-annotation` content. Your custom script can then parse this JSON and render a more sophisticated, graphical popup based on the schema fields (e.g., displaying different icons based on `type`, formatting `confidence` scores, etc.).

    ```html
    <!-- Example with a schema-based annotation -->
    <button data-ai-annotation='{
      "action": "submit",
      "target": "/api/users",
      "confirmation_required": true,
      "ui_importance": "high"
    }'>Submit User</button>
    ```

    Your custom renderer could display this with icons, specific colors based on `ui_importance`, etc.

3.  **Changing Output Target:** The renderer doesn't have to be a visual popup. You could customize the script to:
    *   Log annotations to the browser's developer console upon hovering or clicking.
    *   Display annotations in a dedicated panel within your application's UI.
    *   Send annotation data to a third-party analytics or debugging service.

By customizing the rendering script, you can tailor the visibility and interaction with annotations to best suit your team's workflow and the specific needs of your project.


## 5. AI Integration via MCP

The Model Context Protocol (MCP) service allows AI agents to interact with annotations programmatically.

### Setting up the MCP Server

Configure the `ai-annotation` MCP server in your environment (e.g., VSCode `settings.json`).

```json
{
  "mcpServers": {
    "@ai-annotation/mcp": {
      "command": "node", // Or the command to start the server
      "args": ["/path/to/ai-annotation-mcp-server/main.js"],
      "autoApprove": ["readAnnotations"], // Allow reading without prompt
      "disabled": false
    }
  }
}
```

### Reading Annotations with MCP

An AI assistant can use the `use_mcp_tool` to fetch annotations:

```xml
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>readAnnotations</tool_name>
  <arguments>
    {
      "url": "http://localhost:8080/my-page.html",
      "selector": "#password" // CSS selector for the target element
    }
  </arguments>
</use_mcp_tool>
```

**Expected Result (Example):**

```json
{
  "selector": "#password",
  "annotation": {
    "description": "User password input field.",
    "validation_rules": ["min_length: 8", "requires_special_char"],
    "security_level": "high",
    "related_component": "login-form"
  }
}
```

### Updating Annotations with MCP (Example)

```xml
<use_mcp_tool>
  <server_name>@ai-annotation/mcp</server_name>
  <tool_name>updateAnnotation</tool_name>
  <arguments>
    {
      "url": "http://localhost:8080/my-page.html",
      "selector": "#password",
      "newAnnotation": {
        "description": "User password input field. Updated.",
        "validation_rules": ["min_length: 8", "requires_special_char", "no_common_passwords"],
        "security_level": "very_high", // Changed
        "related_component": "login-form"
      }
    }
  </arguments>
</use_mcp_tool>
```

## 6. Direct DOM Access for AI

AI agents with direct access to the web page's DOM (e.g., browser extensions, Puppeteer scripts) can simply query the `data-ai-annotation` attribute:

```javascript
// Example using browser's querySelector
const button = document.querySelector('button');
const annotationData = button.getAttribute('data-ai-annotation');

if (annotationData) {
  try {
    const annotation = JSON.parse(annotationData); // If JSON
    console.log('Annotation:', annotation);
  } catch (e) {
    console.log('Annotation (text):', annotationData); // If plain text
  }
}
```

## 7. Use Case Examples

*   **Instructing a Test Bot:** "Click the button annotated with `test_id: 'SUBMIT_ORDER'`."
*   **Generating Documentation:** Extract all `description` fields from annotations to build a component reference.
*   **Accessibility Check:** "Verify that all elements annotated with `role: 'button'` are keyboard accessible."
*   **Design Review:** "Flag any elements whose `color_token` annotation doesn't match the design system palette."

## 8. Customization (Advanced)

*(Details on customization options like changing the attribute name or hover style will be added here in future versions.)*

## 9. Troubleshooting

*   **Annotations not appearing:**
    *   Ensure the script tag is correctly included and the path is valid.
    *   Check the browser's developer console for any script errors.
    *   Verify the `data-ai-annotation` attribute is spelled correctly.
*   **JSON parsing errors:**
    *   Ensure the JSON within the attribute is valid (use an online validator). Pay attention to quotes and commas.

---

This guide provides the basics for implementing `ai-annotation`. As the project evolves, refer back here for updated features and best practices.
