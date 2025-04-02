# ai-schema Implementation Guide

This page provides an implementation guide for using ai-schema to safely promote AI-driven development. ai-schema is a platform that provides guardrails and schema definitions to ensure safety even if AI makes mistakes.

## Schema Definition Basics

ai-schema utilizes schema definitions centered around GraphQL schemas. This provides clear guidelines to AI and ensures consistency between the front-end and backend.

::: info
Example of Schema Definition:

```graphql
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
```

This schema definition allows AI to accurately grasp the necessary fields and type information when implementing user-related features.
:::

## Setting Up Guardrails

ai-schema allows you to set up guardrails to ensure safety even if AI makes mistakes. Guardrails consist of the following elements:

::: tip
Guardrails are mechanisms to prevent critical issues while tolerating AI mistakes.
:::

| Guardrail Element | Description |
|------------|------|
| **Validation Rules** | Rules to validate user input or AI output |
| **Type Checking** | Type checking based on GraphQL schema |
| **Security Policies** | Security constraints and policies |
| **Performance Constraints** | Constraints related to performance |

## Utilizing GraphQL Schema

GraphQL schemas clearly define the interface between the front-end and backend. ai-schema utilizes GraphQL schemas to achieve the following functionalities:

### Type-Safe Queries and Mutations

```typescript{1,6-7}
// Example of GraphQL Query
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name  # Highlight: Field defined in the schema
      email  # Highlight: Field defined in the schema
      role
    }
  }
`;

// Executing the query
const { data, loading, error } = useQuery(GET_USER, {
  variables: { id: userId }
});
```

### TypeScript Types Auto-Generated from Schema

```typescript
// Types auto-generated from GraphQL schema
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

// Type-safe function
function formatUserName(user: User): string {
  return `${user.name} (${user.role.toLowerCase()})`;
}
```

## Utilizing OpenAI API

ai-schema utilizes the OpenAI API to safely validate user input and generate content.

### Validating User Input

```typescript
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validate user input
async function validateUserInput(input: string): Promise<boolean> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an assistant that validates user input.' },
      { role: 'user', content: `Determine if the following input is safe: ${input}` }
    ],
    temperature: 0,
  });
  
  return response.choices[0].message.content?.toLowerCase().includes('safe') ?? false;
}
```

### Generating Content

```typescript
// Generate content
async function generateDescription(product: Product): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an assistant that generates product descriptions.' },
      { role: 'user', content: `Generate a description for the following product: ${JSON.stringify(product)}` }
    ],
    temperature: 0.7,
  });
  
  return response.choices[0].message.content ?? 'No description available';
}
```

## Practicing Vibe Coding

Vibe Coding is a new development method where developers give high-level instructions to AI, and AI generates the code. Utilizing ai-schema allows for safe and efficient practice of Vibe Coding.

::: warning
Vibe Coding is powerful, but without proper guardrails, it can lead to unexpected results.
:::

### Basic Steps of Vibe Coding

1. **Schema Definition**: Define the system structure using GraphQL schemas, etc.
2. **High-Level Instructions**: Give high-level instructions to AI.
3. **Code Generation**: AI generates the code.
4. **Review and Correction**: Review the generated code and correct it if necessary.
5. **Iteration**: Repeat steps 2-4 as needed.

### Example of Vibe Coding

::: details Dialogue Example
```
Developer: Create a user edit form based on the GraphQL schema.

AI: Schema information confirmed. Generating the following React component:

import React, { useState } from 'react';

type UserRole = 'ADMIN' | 'USER' | 'GUEST';

interface UserFormProps {
  onSubmit: (user: {
    name: string;
    email: string;
    role: UserRole;
  }) => void;
  initialValues?: {
    name?: string;
    email?: string;
    role?: UserRole;
  };
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialValues = {}
}) => {
  const [name, setName] = useState(initialValues.name || '');
  const [email, setEmail] = useState(initialValues.email || '');
  const [role, setRole] = useState<UserRole>(initialValues.role || 'USER');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation function
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({ name, email, role });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="GUEST">Guest</option>
        </select>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};
```
:::

## Creating Custom Guardrails

ai-schema allows you to create custom guardrails tailored to your project or organization. Custom guardrails can be defined with the following structure:

```typescript
// Definition of a custom guardrail
import { GuardRail, ValidationResult } from '@ai-schema/core';

export class UserInputGuardRail implements GuardRail {
  id = 'user-input';
  
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

## Syntax Highlighting

ai-schema documentation utilizes syntax highlighting in code blocks:

```typescript{4,8-10}
// Example of GraphQL client configuration
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({  // Highlight: Client initialization
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {  // Highlight: Query option configuration
      fetchPolicy: 'cache-and-network',  // Highlight: Fetch policy configuration
      errorPolicy: 'all',  // Highlight: Error policy configuration
    },
  },
});
```

## Utilizing Custom Containers

ai-schema documentation utilizes custom containers to effectively convey information:

::: info
ai-schema is a powerful tool for safely promoting AI-driven development.
:::

::: tip
Use a shared repository to maintain consistent schema definitions across multiple projects.
:::

::: warning
Always validate AI output. ai-schema provides guardrails, but the final responsibility lies with the developer.
:::

::: danger
Implement appropriate security measures in production environments. User input validation is particularly important.
:::

::: details How ai-schema Works Internally
ai-schema integrates with backend services like GraphQL schemas and the OpenAI API to provide guardrails that ensure safety even if AI makes mistakes. It performs type checking based on schema definitions to guarantee that AI output is always compatible with the backend.
:::

## Further Information

For more details on ai-schema, refer to the [GitHub Repository](https://github.com/ToyB0x/ai-schema).
