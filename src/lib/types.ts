import * as React from 'react';
import { ProviderProps } from './RhinoProvider';

export interface RhinoStore<TStore> {
  /**
   * The root Provider component for your React Rhino store.
   * Wrap your application or component tree with this Provider to enable global state access.
   *
   * @example
   * ```tsx
   * <RhinoProvider>
   *   <App />
   * </RhinoProvider>
   * ```
   */
  RhinoProvider: React.FC<ProviderProps>;
  /**
   * React Rhino hook which returns the stateful value corresponding to the given key and a function to update it.
   * This is identical to React's useState hook.
   *
   * @param key - The exact string key representing the global state (inferred from initial store object).
   * @returns A tuple containing the current state value and a setter function `[value, setValue]`.
   *
   * @example
   * ```tsx
   * // Assuming store initialized with { counter: 0 }
   * const [count, setCount] = useRhinoState('counter');
   * setCount(1); // update directly
   * setCount(prev => prev + 1); // update using previous state
   * ```
   */
  useRhinoState<K extends keyof TStore>(
    key: K,
  ): [TStore[K], React.Dispatch<React.SetStateAction<TStore[K]>>];

  /**
   * React Rhino hook which returns the stateful value corresponding to the given key.
   * Use this if your component only needs to read the state but performs no updates.
   *
   * @param key - The exact string key representing the global state (inferred from initial store object).
   * @returns The current state value.
   *
   * @example
   * ```tsx
   * // Assuming store initialized with { counter: 0 }
   * const count = useRhinoValue('counter');
   * return <div>{count}</div>;
   * ```
   */
  useRhinoValue<K extends keyof TStore>(key: K): TStore[K];

  /**
   * React Rhino hook which returns a function to update the state corresponding to the given key.
   * Use this if your component only updates the state without reading it. This guarantees the component will not re-render when the state changes.
   *
   * @param key - The exact string key representing the global state (inferred from initial store object).
   * @returns The state updater function.
   *
   * @example
   * ```tsx
   * // Assuming store initialized with { counter: 0 }
   * const setCount = useSetRhinoState('counter');
   * setCount(1); // update directly
   * setCount(prev => prev + 1); // update using previous state
   * ```
   */
  useSetRhinoState<K extends keyof TStore>(key: K): React.Dispatch<React.SetStateAction<TStore[K]>>;
}
