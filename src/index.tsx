import * as React from 'react';
import createSingleRhinoState, { ProviderProps } from './create-single-rhino-state';

interface StateObject {
  [key: string]: any | (() => any);
}

interface StateList<T> {
  provider: ({ children }: ProviderProps) => JSX.Element;
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
const createRhinoState = (globalStatesObject: StateObject) => {
  const stateListData: { [key: string]: StateList<any> } = {};

  Object.keys(globalStatesObject).forEach((key) => {
    const initialValue = globalStatesObject[key];
    const { Provider, useStateValue, useStateUpdate } = createSingleRhinoState(initialValue);

    stateListData[key] = {
      provider: Provider,
      stateHook: useStateValue,
      updaterHook: useStateUpdate,
    };
  });

  /**
   *
   * Provider Component which makes the states available to all the nested components
   */
  const RhinoProvider = ({ children }: ProviderProps) => {
    const stateList = Object.values(stateListData);
    const listLength = stateList.length;

    let RootProvider = ({ children }: ProviderProps) => <>{children}</>;

    for (let i = 0; i < listLength; i++) {
      const Provider = stateList[i].provider;
      const OldRootProvider = RootProvider;
      RootProvider = ({ children }) => (
        <OldRootProvider>
          <Provider>{children}</Provider>
        </OldRootProvider>
      );
    }
    return <RootProvider>{children}</RootProvider>;
  };

  /**
   *
   * React hook which returns the stateful value
   * corresponding to the key provided
   * @param key Key which represents the state
   */
  const useRhinoValue = <T extends unknown>(key: string): T => {
    if (key in stateListData) {
      return stateListData[key].stateHook();
    } else {
      throw new Error(`${key} is an invalid key`);
    }
  };

  /**
   *
   * React hook which returns a function to update the global state
   * corresponding to the key provided
   * @param key Key which represents the state
   */
  const useSetRhinoState = <T extends unknown>(
    key: string,
  ): React.Dispatch<React.SetStateAction<T>> => {
    if (key in stateListData) {
      return stateListData[key].updaterHook();
    } else {
      throw new Error(`${key} is an invalid key`);
    }
  };

  /**
   *
   * React hook which returns the stateful value  corresponding to the key
   * provided and a function to update it
   * @param key Key which represents the state
   */
  const useRhinoState = <T extends unknown>(
    key: string,
  ): [T, React.Dispatch<React.SetStateAction<T>>] => {
    if (key in stateListData) {
      return [useRhinoValue(key), useSetRhinoState(key)];
    } else {
      throw new Error(`${key} is an invalid key`);
    }
  };

  return { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState };
};

export default createRhinoState;
