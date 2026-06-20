import * as React from 'react';
import { createContext, useContext, useRef } from 'react';

import { Store } from './Store';

export interface ProviderProps {
  children: React.ReactNode;
}

export default function createRhinoProvider<TStore extends Record<string, any>>(
  initialState: TStore,
) {
  const RhinoContext = createContext<Store<TStore> | null>(null);

  const Provider: React.FC<ProviderProps> = ({ children }) => {
    const storeRef = useRef<Store<TStore>>();
    if (!storeRef.current) {
      storeRef.current = new Store(initialState);
    }

    return <RhinoContext.Provider value={storeRef.current}>{children}</RhinoContext.Provider>;
  };

  const useRhinoContext = () => {
    const context = useContext(RhinoContext);
    if (!context) {
      throw new Error('react-rhino: hooks must be used within a RhinoProvider');
    }
    return context;
  };

  return { Provider, useRhinoContext };
}
