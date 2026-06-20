import * as React from 'react';
import { useCallback, useSyncExternalStore } from 'react';

import createRhinoProvider from './RhinoProvider';

export default function createRhinoStore<TStore extends Record<string, any>>(initialState: TStore) {
  if (Object.prototype.toString.call(initialState) !== '[object Object]') {
    throw new Error('react-rhino: initialState must be a plain object');
  }

  const { Provider, useRhinoContext } = createRhinoProvider(initialState);

  /**
   * React Rhino hook which returns the stateful value corresponding to the given key.
   * Use this if your component only needs to read the state but performs no updates.
   *
   * @param key Key which represents the state
   * @returns The state value
   */
  function useRhinoValue<K extends keyof TStore>(key: K): TStore[K] {
    const store = useRhinoContext();
    const subscribe = useCallback((listener: () => void) => store.subscribe(key, listener), [
      store,
      key,
    ]);
    const getSnapshot = useCallback(() => store.getState(key), [store, key]);
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  }

  /**
   * React Rhino hook which returns a function to update the state corresponding to the given key.
   * Use this if your component only updates the state without reading it. This guarantees the component will not re-render when the state changes.
   *
   * @param key Key which represents the state
   * @returns The state updater function
   */
  function useSetRhinoState<K extends keyof TStore>(
    key: K,
  ): React.Dispatch<React.SetStateAction<TStore[K]>> {
    const store = useRhinoContext();
    const setState = useCallback(
      (updater: React.SetStateAction<TStore[K]>) => {
        store.setState(key, updater);
      },
      [store, key],
    );
    return setState;
  }

  /**
   * React Rhino hook which returns the stateful value corresponding to the given key and a function to update it.
   * This is identical to React's useState hook.
   *
   * @param key Key which represents the state
   * @returns An array with the state value and the function to update the state
   */
  function useRhinoState<K extends keyof TStore>(
    key: K,
  ): [TStore[K], React.Dispatch<React.SetStateAction<TStore[K]>>] {
    const value = useRhinoValue(key);
    const setValue = useSetRhinoState(key);
    return [value, setValue];
  }

  return {
    RhinoProvider: Provider,
    useRhinoState,
    useRhinoValue,
    useSetRhinoState,
  };
}
