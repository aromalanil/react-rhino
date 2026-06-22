import * as React from 'react';
import { ProviderProps } from './RhinoProvider';

export interface RhinoStore<TStore> {
  RhinoProvider: React.FC<ProviderProps>;
  /**
   * React Rhino hook which returns the stateful value corresponding to the given key and a function to update it.
   * This is identical to React's useState hook.
   *
   * @param key Key which represents the state
   * @returns An array with the state value and the function to update the state
   *
   * @example
   * ```tsx
   * const [count, setCount] = useRhinoState('counter');
   * ```
   */
  useRhinoState<K extends keyof TStore>(
    key: K,
  ): [TStore[K], React.Dispatch<React.SetStateAction<TStore[K]>>];

  /**
   * React Rhino hook which returns the stateful value corresponding to the given key.
   * Use this if your component only needs to read the state but performs no updates.
   *
   * @param key Key which represents the state
   * @returns The state value
   *
   * @example
   * ```tsx
   * const count = useRhinoValue('counter');
   * ```
   */
  useRhinoValue<K extends keyof TStore>(key: K): TStore[K];

  /**
   * React Rhino hook which returns a function to update the state corresponding to the given key.
   * Use this if your component only updates the state without reading it. This guarantees the component will not re-render when the state changes.
   *
   * @param key Key which represents the state
   * @returns The state updater function
   *
   * @example
   * ```tsx
   * const setCount = useSetRhinoState('counter');
   * setCount(1);
   * setCount(prev => prev + 1);
   * ```
   */
  useSetRhinoState<K extends keyof TStore>(key: K): React.Dispatch<React.SetStateAction<TStore[K]>>;
}
