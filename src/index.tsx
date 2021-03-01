import * as React from 'react';
import createSingleRhinoState, { ProviderProps } from './create-single-rhino-state';

interface StateObject {
  [key: string]: any | (() => any);
}

interface StateData<T> {
  provider: (props: ProviderProps) => JSX.Element;
  stateHook: () => T;
  updaterHook: () => React.Dispatch<React.SetStateAction<T>>;
}

/**
 *
 * Function to creates global state using rhino
 * @param globalStatesObject An Object containing all the global states to be created
 * @example <caption>Sample Use of createRhinoState</caption>
 * const { Provider, useRhinoState }=createRhinoState({user:"John Doe",isLoggedIn:true});
 */
function createRhinoState(globalStatesObject: StateObject) {
  const stateDataList: { [key: string]: StateData<any> } = {};

  Object.keys(globalStatesObject).forEach((key) => {
    const initialValue = globalStatesObject[key];
    const { Provider, useStateValue, useStateUpdate } = createSingleRhinoState(initialValue);

    stateDataList[key] = {
      provider: Provider,
      stateHook: useStateValue,
      updaterHook: useStateUpdate,
    };
  });

  /**
   *
   * Provider Component which makes the states available to all the nested components
   */
  function RhinoProvider({ children }: ProviderProps) {
    const stateData = Object.values(stateDataList);
    const listLength = stateData.length;

    let RootProvider = ({ children }: ProviderProps) => <>{children}</>;

    for (let i = 0; i < listLength; i++) {
      const Provider = stateData[i].provider;
      const OldRootProvider = RootProvider;
      RootProvider = ({ children }: ProviderProps) => (
        <OldRootProvider>
          <Provider>{children}</Provider>
        </OldRootProvider>
      );
    }
    return <RootProvider>{children}</RootProvider>;
  }

  /**
   *
   * React hook which returns the stateful value
   * corresponding to the key provided
   * @param key Key which represents the state
   */
  function useRhinoValue<T>(key: string): T {
    if (key in stateDataList) {
      return stateDataList[key].stateHook();
    }
    throw new Error(`${key} is an invalid key`);
  }

  /**
   *
   * React hook which returns a function to update the global state
   * corresponding to the key provided
   * @param key Key which represents the state
   */
  function useSetRhinoState<T>(key: string): React.Dispatch<React.SetStateAction<T>> {
    if (key in stateDataList) {
      return stateDataList[key].updaterHook();
    }
    throw new Error(`${key} is an invalid key`);
  }

  /**
   *
   * React hook which returns the stateful value  corresponding to the key
   * provided and a function to update it
   * @param key Key which represents the state
   */
  function useRhinoState<T>(key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
    if (key in stateDataList) {
      return [useRhinoValue(key), useSetRhinoState(key)];
    }
    throw new Error(`${key} is an invalid key`);
  }

  return {
    RhinoProvider,
    useRhinoState,
    useRhinoValue,
    useSetRhinoState,
  };
}

export default createRhinoState;
