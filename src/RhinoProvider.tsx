import * as React from 'react';
import { createContext, useContext } from 'react';
import { IProvider, ProviderProps } from './types';
import createGlobalState from './create-global-state';
import CombineProviders from './utils/CombineProviders';

interface Store {
  [key: string]: any;
}

interface StateData<T> {
  stateHook: () => T;
  updaterHook: () => React.Dispatch<React.SetStateAction<T>>;
}

interface StateDataList {
  [key: string]: StateData<any>;
}

interface RhinoProviderProps extends ProviderProps {
  store: Store;
}

const StateDataContext = createContext<StateDataList>({});

const RhinoProvider: React.FC<RhinoProviderProps> = ({ children, store }: RhinoProviderProps) => {
  const stateDataList: StateDataList = {};
  const ProviderList: Array<IProvider> = [];

  Object.keys(store).forEach((key) => {
    const initialValue = store[key];
    const { Provider, useStateValue, useStateUpdate } = createGlobalState(initialValue);

    stateDataList[key] = {
      stateHook: useStateValue,
      updaterHook: useStateUpdate,
    };

    ProviderList.push(Provider);
  });

  return (
    <CombineProviders providers={ProviderList}>
      <StateDataContext.Provider value={stateDataList}>{children}</StateDataContext.Provider>
    </CombineProviders>
  );
};

export const useStateDataList = () => useContext(StateDataContext);

export default RhinoProvider;
