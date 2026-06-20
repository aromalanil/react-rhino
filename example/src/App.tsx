import { useEffect, useRef } from 'react';
import { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } from './store';
import './App.css';

/**
 * Custom hook to add a visual glow effect when a component re-renders.
 * It removes and re-adds the 'glow' class on every render cycle.
 */
function useRenderGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove('glow');
      void ref.current.offsetWidth; // trigger reflow
      ref.current.classList.add('glow');
    }
  }); // Run on every render
  return ref;
}

/**
 * Demonstrates `useRhinoState`.
 * 
 * This component both reads and updates the `counter` state. 
 * Because it reads the state, it will re-render (and glow) every time `counter` changes.
 */
function Counter() {
  const glowRef = useRenderGlow();
  const [count, setCount] = useRhinoState('counter');
  return (
    <div className="card" ref={glowRef}>
      <div className="card-header">
        <span className="icon">🔄</span>
        <h3>useRhinoState</h3>
      </div>
      <p className="description">
        Reads and updates the `counter` state. Re-renders on every counter change.
      </p>
      <div className="value-display">
        <span className="label">Current Count</span>
        <span className="value">{count}</span>
      </div>
      <div className="button-group">
        <button className="btn-primary" onClick={() => setCount(count + 1)}>Increment</button>
        <button className="btn-secondary" onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </div>
  );
}

/**
 * Demonstrates `useRhinoValue`.
 * 
 * This component only reads the `counter` state.
 * It will re-render (and glow) when the state changes, but it cannot update it.
 */
function ReadOnlyCounter() {
  const glowRef = useRenderGlow();
  const count = useRhinoValue('counter');
  return (
    <div className="card" ref={glowRef}>
      <div className="card-header">
        <span className="icon">👁️</span>
        <h3>useRhinoValue</h3>
      </div>
      <p className="description">
        Reads the `counter` state. Re-renders on counter changes, but cannot update it.
      </p>
      <div className="value-display">
        <span className="label">Read-Only Count</span>
        <span className="value">{count}</span>
      </div>
    </div>
  );
}

/**
 * Demonstrates `useSetRhinoState`.
 * 
 * This component only updates the `counter` state.
 * Because it doesn't consume the value, it WILL NOT re-render when the counter changes!
 * (Notice how this card does not glow when you click its buttons).
 */
function SetterOnlyCounter() {
  const glowRef = useRenderGlow();
  const setCount = useSetRhinoState('counter');
  return (
    <div className="card" ref={glowRef}>
      <div className="card-header">
        <span className="icon">⚡</span>
        <h3>useSetRhinoState</h3>
      </div>
      <p className="description">
        Updates the `counter` state. Since it doesn't read the value, it never re-renders.
      </p>
      <div className="button-group">
        <button className="btn-primary" onClick={() => setCount((prev) => prev + 1)}>
          Increment (+1)
        </button>
      </div>
    </div>
  );
}

/**
 * Demonstrates an updater for a secondary state.
 * 
 * Uses `useRhinoState` to update the `name` global state. 
 * Changing this will not cause the counter components to re-render.
 */
function NameUpdater() {
  const glowRef = useRenderGlow();
  const [name, setName] = useRhinoState('name');
  
  return (
    <div className="card" ref={glowRef}>
      <div className="card-header">
        <span className="icon">✏️</span>
        <h3>Update Name</h3>
      </div>
      <p className="description">
        Updates the `name` state. Changes here don't trigger re-renders in the counter components.
      </p>
      <div className="value-display">
        <span className="label">Current Name</span>
        <span className="value" style={{ fontSize: '1.5rem' }}>{name}</span>
      </div>
      <div className="button-group">
        <input 
          type="text" 
          className="text-input" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter a new name..." 
        />
      </div>
    </div>
  );
}

/**
 * Demonstrates consuming multiple global states.
 * 
 * This component will re-render if *either* `counter` or `name` changes.
 */
function MultiStateComponent() {
  const glowRef = useRenderGlow();
  const [count] = useRhinoState('counter');
  const [name] = useRhinoState('name');
  
  return (
    <div className="card" ref={glowRef}>
      <div className="card-header">
        <span className="icon">🔀</span>
        <h3>Multi-State Consumer</h3>
      </div>
      <p className="description">
        Subscribes to both `counter` and `name`. Re-renders if <strong>either</strong> value changes.
      </p>
      <div className="value-display">
        <span className="label">Count: {count}</span>
        <span className="value" style={{ fontSize: '1.5rem' }}>{name}</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <RhinoProvider>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h2>React Rhino Example Application</h2>
          <div className="header-context">
            <p>
              Welcome to the interactive demo for <strong>React Rhino v3</strong>! 
            </p>
            <p>
              A simple dashboard to demonstrate <strong>react-rhino</strong>. 
              The <strong style={{color: 'var(--accent-color)'}}>green glow</strong> indicates a component re-render. 
              Notice how components only re-render when their specific state changes, and setter-only components don't re-render at all.
            </p>
          </div>
        </header>

        <main className="dashboard-grid">
          <Counter />
          <ReadOnlyCounter />
          <SetterOnlyCounter />
          <NameUpdater />
          <MultiStateComponent />
        </main>
      </div>
    </RhinoProvider>
  );
}

export default App;
