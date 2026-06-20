# Migrating from React Rhino v2 to v3

React Rhino v3 is a major architectural rewrite. It moves away from the traditional Context-based "Provider Hell" and deeply nested state trees to a blazing-fast, event-driven architecture using `useSyncExternalStore`. It also introduces perfect, first-class TypeScript inference out of the box.

This guide will walk you through the necessary steps to upgrade an existing v2 application to v3.

## What's Changed?

### 1. Store is now initialized via `createRhinoStore` instead of `store` prop
In v2, you passed the central state object to `RhinoProvider` via a `store` prop. In v3, you initialize the store beforehand using the `createRhinoStore(store)` factory function, which generates a custom `RhinoProvider` and matching custom hooks.

### 2. Global hooks have been removed
The global `useRhinoState`, `useRhinoValue`, and `useSetRhinoState` hooks directly imported from `react-rhino` have been removed. Instead, you now generate these hooks directly from your store definition. This ensures that your hooks are strictly typed to your store.

## Migration Steps

### Step 1: Update your Store Definition
Initialize your store with the new `createRhinoStore` factory function.

**Before (v2):**
```tsx
import { RhinoProvider } from 'react-rhino';

const store = {
  count: 0,
  darkMode: false,
};

function App() {
  return (
    <RhinoProvider store={store}>
      <MyComponent />
    </RhinoProvider>
  );
}
```

**After (v3):**
Create a central file for your store (e.g., `store.ts` or `store.js`):
```tsx
import createRhinoStore from 'react-rhino';

const store = {
  count: 0,
  darkMode: false,
};

// Export the generated provider and hooks
export const { 
  RhinoProvider, 
  useRhinoState, 
  useRhinoValue, 
  useSetRhinoState 
} = createRhinoStore(store);
```

Then, use the generated `RhinoProvider` to wrap your application:
```tsx
import { RhinoProvider } from './store';

function App() {
  return (
    <RhinoProvider>
      <MyComponent />
    </RhinoProvider>
  );
}
```

### Step 2: Update Hook Imports
You must update all components that consume React Rhino state. Instead of importing the hooks from the `react-rhino` package, import them from your newly created `store.ts` file.

**Before (v2):**
```tsx
import { useRhinoState } from 'react-rhino';

const MyComponent = () => {
  const [count, setCount] = useRhinoState("count");
  // ...
};
```

**After (v3):**
```tsx
// Import from your local store file
import { useRhinoState } from './store';

const MyComponent = () => {
  const [count, setCount] = useRhinoState("count");
  // ...
};
```

That's it! Your app will now benefit from v3's vastly improved performance and TypeScript autocompletion.
