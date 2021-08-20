import * as React from 'react';
import { createContext, useContext } from 'react';
import createSingleRhinoState, { ProviderProps } from './create-single-rhino-state';

interface StateObject {
  [key: string]: any | (() => any);
}

interface StateData<T> {
  provider: React.FC<ProviderProps>;
  stateHook: () => T;
  updaterHook: () => React.Dispatch<React.SetStateAction<T>>;
}

interface StateDataList {
  [key: string]: StateData<any>;
}

interface RhinoProviderProps extends ProviderProps {
  initialStates: StateObject;
}

interface RhinoStateProviderProps extends ProviderProps {
  stateDataList: StateDataList;
}

const StateDataContext = createContext<StateObject>({});

/**
 *
 * Provider Component which makes the states available to all the nested components
 */
const RhinoStateProvider: React.FC<RhinoStateProviderProps> = ({
  children,
  stateDataList,
}: RhinoStateProviderProps) => {
  const ProviderList = Object.values(stateDataList).map((stateData) => stateData.provider);

  // Combining all providers into a single provider
  const RootProvider = ProviderList.reduce((ProviderAccumulator, Provider) => {
    return ({ children }: ProviderProps) => (
      <ProviderAccumulator>
        <Provider>{children}</Provider>
      </ProviderAccumulator>
    );
  });

  return <RootProvider>{children}</RootProvider>;
};

const RhinoProvider: React.FC<RhinoProviderProps> = ({
  children,
  initialStates: initialStatesObject,
}: RhinoProviderProps) => {
  const stateDataList: StateDataList = {};

  Object.keys(initialStatesObject).forEach((key) => {
    const initialValue = initialStatesObject[key];
    const { Provider, useStateValue, useStateUpdate } = createSingleRhinoState(initialValue);

    stateDataList[key] = {
      provider: Provider,
      stateHook: useStateValue,
      updaterHook: useStateUpdate,
    };
  });

  return (
    <StateDataContext.Provider value={stateDataList}>
      <RhinoStateProvider stateDataList={stateDataList}>{children}</RhinoStateProvider>
    </StateDataContext.Provider>
  );
};

export const useStateDataList = () => useContext(StateDataContext);

export default RhinoProvider;
