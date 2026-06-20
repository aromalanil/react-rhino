<div align="center">
  <h1>🦏 React Rhino</h1>
  <p><strong>A simple, blazingly fast, and deeply type-safe global state manager for React.</strong></p>

  [![NPM Version](https://img.shields.io/npm/v/react-rhino?style=flat-square&color=blue)](https://www.npmjs.com/package/react-rhino)
  ![ESLint Check](https://github.com/aromalanil/react-rhino/workflows/ESLint-Check/badge.svg?style=flat-square)
  [![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-rhino?style=flat-square&label=size)](https://bundlephobia.com/result?p=react-rhino)
  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/aromalanil/react-rhino/blob/master/LICENSE)

  <p><i>Version 3 is here! Ditch the boilerplate and embrace pure, decoupled state.</i></p>
</div>

---

> **Note**: This is the documentation for **v3**. Upgrading from v2? Check out the [v3 Migration Guide](./MIGRATION_V3.md). For older docs, see [README-v2.md](./README-v2.md).

## 🤔 What React Rhino is (and what it isn't)

We built Rhino because we were tired of boilerplate-heavy setups just to share a string or a boolean across two components. 

### What it IS:
- **Featherweight & Zero Dependencies**: With a minified + gzipped size of just **~700 bytes** (and ~13kB unpacked package size), React Rhino practically disappears into your bundle. No external dependencies. Just pure React goodness.
- **Blazingly Fast**: Powered by an event-driven `useSyncExternalStore` architecture. Components *only* re-render if the exact state key they are subscribed to changes. No more unnecessary re-renders. No more "Provider Hell".
- **Type-Safe by Default**: Thanks to the `createRhinoStore` factory, you get 100% perfect type inference and autocompletion out-of-the-box. No manual interface definitions required.
- **Familiar**: The syntax is identical to React's native `useState`. If you know React, you already know Rhino.

### What it ISN'T:
- **A monolithic state machine**: Rhino intentionally avoids complex middlewares, time-travel debugging, reducers, or deeply nested derived state selectors. 
- **When to look elsewhere**: If you are building a massive enterprise application that heavily relies on complex state middleware, intricate data transformations, or devtools integrations, you should consider sophisticated options like **Zustand**, **Redux Toolkit**, or **Jotai**. 

Rhino is for the indie hacker, the clean-code enthusiast, and the pragmatic developer who wants simple, decoupled global state *that just works*.

---

## 📦 Installation 

```bash
# npm
npm install react-rhino

# yarn
yarn add react-rhino

# pnpm
pnpm add react-rhino
```

## 🚀 Quick Start

Use the `createRhinoStore` factory function to generate strongly-typed providers and hooks tailored precisely to your store.

### Step 1: Define your store
Create a central file for your state (e.g., `store.ts`). Just define a plain object.

```tsx
import createRhinoStore from 'react-rhino';

const store = {
  darkMode: true,
  userName: "John Doe",
  count: 0
};

// createRhinoStore automatically infers all keys and types from your store object!
export const { 
  RhinoProvider, 
  useRhinoState, 
  useRhinoValue, 
  useSetRhinoState 
} = createRhinoStore(store);
```

### Step 2: Wrap your App
Wrap your application (or a part of it) with the generated `RhinoProvider`.

```tsx
import { RhinoProvider } from './store';
import Counter from './Counter';
import Header from './Header';

function App() {
  return (
    <RhinoProvider>
      <Header />
      <Counter />
    </RhinoProvider>
  );
}

export default App;
```

### Step 3: Consume State Anywhere
Use your generated hooks anywhere inside the provider. Enjoy the magical TypeScript autocompletion!

```tsx
import { useRhinoState, useSetRhinoState } from './store';

const Counter = () => {
  // Full autocompletion for "count", and perfect type inference for `setCount`!
  const [count, setCount] = useRhinoState("count"); 

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}

export const Header = () => {
  // Only updates the state. Doesn't read it.
  // This component will NEVER re-render when "count" changes! ⚡
  const setCount = useSetRhinoState("count");

  return <button onClick={() => setCount(0)}>Reset Counter</button>;
}
```

## 📖 Hooks API Overview

### `useRhinoState(key)`
Returns a tuple with the current state value and a setter function, identical to `useState`.

### `useRhinoValue(key)`
Returns only the state value. Use this if your component only needs to read the state but performs no updates.

### `useSetRhinoState(key)`
Returns only the setter function. **Pro-tip**: Use this if your component only updates the state without reading it. It guarantees the component will **not** re-render when the state changes!

---

## 🎮 Example App

Want to see it in action? Check out the example app in the `example` directory.

```bash
cd example
npm install
npm run dev
```

---

<div align="center">
  <p>Built with ❤️ by <a href="https://aromalanil.in">Aromal Anil</a></p>
  <p>Released under the MIT License.</p>
</div>
