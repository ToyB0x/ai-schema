---
outline: deep
---

# ai-schema API Reference

This page describes the APIs and integration features provided by ai-schema. ai-schema is a platform that provides guardrails and schema definitions to safely promote AI-driven development.

## MCP Server Integration

ai-schema integrates with AI tools through a Model Context Protocol (MCP) server. This integration allows AI assistants to automatically perform code generation based on schema definitions and apply guardrails.

```typescript
// Basic implementation example of an MCP server
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
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('ai-schema MCP server running on stdio');
  }
}
```

## Core API

ai-schema provides a comprehensive API for safely promoting AI-driven development.

### GuardRail Interface

All guardrails implement the following interface:

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

### GuardRail Implementation Example

```typescript{4-5}
// Implementation example of a user input guardrail
import { GuardRail, ValidationResult } from '@ai-schema/core';

export class UserInputGuardRail implements GuardRail {
  id = 'user-input';  // Highlight: Unique identifier for the guardrail
  
  validate(input: string): ValidationResult {
    const violations: string[] = [];
    
    // Check if input is not empty
    if (!input.trim()) {
      violations.push('Input is empty');
    }
    
    // Check if input is not too long
    if (input.length > 1000) {
      violations.push('Input is too long (max 1000 characters)');
    }
    
    // Check if forbidden words are included
    const forbiddenWords = ['password', 'credit card', 'secret'];
    for (const word of forbiddenWords) {
      if (input.toLowerCase().includes(word.toLowerCase())) {
        violations.push(`Forbidden word "${word}" is included`);
      }
    }
    
    return {
      valid: violations.length === 0,
      violations
    };
  }
}
```

## GraphQL Integration API

ai-schema provides guardrails and schema definitions utilizing GraphQL schemas.

### GraphQLSchemaProvider Interface

```typescript
interface GraphQLSchemaProvider {
  getSchema(): GraphQLSchema;
  validateQuery(query: string): ValidationResult;
  validateMutation(mutation: string): ValidationResult;
}
```

### GraphQLSchemaProvider Implementation Example

```typescript
import { GraphQLSchemaProvider, ValidationResult } from '@ai-schema/core';
import { buildSchema, GraphQLSchema, validate } from 'graphql';

export class UserGraphQLSchemaProvider implements GraphQLSchemaProvider {
  private schema: GraphQLSchema;
  
  constructor() {
    // Definition of the GraphQL schema
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

## OpenAI Integration API

ai-schema provides guardrails and content generation features utilizing the OpenAI API.

::: info
An OpenAI API key is required to use the OpenAI API.
:::

### OpenAIValidator Interface

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

### OpenAIValidator Implementation Example

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
        { role: 'system', content: 'You are an assistant that validates user input.' },
        { role: 'user', content: `Determine if the following input is safe: ${input}` }
      ],
      temperature: 0,
    });
    
    const content = response.choices[0].message.content ?? '';
    const valid = content.toLowerCase().includes('safe');
    
    return {
      valid,
      violations: valid ? [] : ['Input is not safe']
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

## Tool API

ai-schema provides the following tool APIs:

::: info
These APIs are exposed to AI assistants through the MCP server.
:::

| Tool Name | Description |
|---------|------|
| `validate-schema` | Validates the GraphQL schema |
| `validate-input` | Validates user input |
| `generate-component` | Generates UI components based on the schema |
| `generate-query` | Generates GraphQL queries based on the schema |
| `generate-mutation` | Generates GraphQL mutations based on the schema |
| `apply-guardrail` | Applies guardrails |
| `load-schema` | Loads the GraphQL schema |
| `validate-code` | Validates generated code |

## Configuration Example

Example of an ai-schema configuration file (`ai-schema.config.json`):

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
        "forbiddenWords": ["password", "credit card", "secret"]
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

## Client Integration Example

Example of integrating ai-schema into a React application:

```tsx
import React, { useState } from 'react';
import { AiSchema, GuardRail } from '@ai-schema/react';
import { UserInputGuardRail } from './guardrails/UserInputGuardRail';

// Guardrail configuration
const guardrails: GuardRail[] = [
  new UserInputGuardRail()
];

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [violations, setViolations] = useState<string[]>([]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Apply guardrails
    const validationResult = await AiSchema.validateInput(input, guardrails);
    
    if (validationResult.valid) {
      // Process safe input
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
      // Display violations
      setViolations(validationResult.violations);
      setResult(null);
    }
  };
  
  return (
    <div>
      <h1>AI-Driven Application</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input">Input:</label>
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
            <h3>Input Errors:</h3>
            <ul>
              {violations.map((violation, index) => (
                <li key={index}>{violation}</li>
              ))}
            </ul>
          </div>
        )}
        
        <button type="submit">Submit</button>
      </form>
      
      {result && (
        <div className="result">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

## Further Information

For more details on ai-schema's API and integration features, refer to the [GitHub Repository](https://github.com/ToyB0x/ai-schema).
