import * as React from 'react';
import { useCallback, useSyncExternalStore } from 'react';

import { RhinoStore } from './types';
import createRhinoProvider from './RhinoProvider';

/**
 * React Rhino function which creates a store and returns the Provider and hooks to access and update the state.
 *
 * @param initialState Initial state object for the store
 * @returns An object containing the RhinoProvider and hooks
 *
 * @example
 * ```tsx
 * const store = createRhinoStore({ counter: 0 });
 * export const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = store;
 * ```
 */
export default function createRhinoStore<TStore extends Record<string, any>>(
  initialState: TStore,
): RhinoStore<TStore> {
  if (Object.prototype.toString.call(initialState) !== '[object Object]') {
    throw new Error('react-rhino: initialState must be a plain object');
  }

  const { Provider, useRhinoContext } = createRhinoProvider(initialState);

  function useRhinoValue<K extends keyof TStore>(key: K): TStore[K] {
    const store = useRhinoContext();
    const subscribe = useCallback((listener: () => void) => store.subscribe(key, listener), [
      store,
      key,
    ]);
    const getSnapshot = useCallback(() => store.getState(key), [store, key]);
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  }

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
