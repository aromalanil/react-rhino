import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { ProviderProps } from './types';

/**
 *
 * Function to create a global state using React Context API,
 * which returns the ContextProvider and hooks to get the
 * state and updater function
 *
 * @param initialValue Initial value of the state
 */
function createGlobalState<T>(initialValue: T) {
  // Creating Context for state value & state updater function
  const ValueContext = React.createContext(initialValue);
  const UpdaterContext = createContext<React.Dispatch<React.SetStateAction<T>>>(() => null);

  /**
   *
   * React hook which returns the stateful value
   * @return Global State
   */
  const useStateValue = () => useContext(ValueContext);

  /**
   *
   * React hook which returns a function to update the global state
   * @return Global state updater function
   */
  const useStateUpdate = () => useContext(UpdaterContext);

  /**
   *
   * Provider Component which makes the state available to all the nested components
   */
  const Provider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
    const [state, setState] = useState(initialValue);

    return (
      <ValueContext.Provider value={state}>
        <UpdaterContext.Provider value={setState}>{children}</UpdaterContext.Provider>
      </ValueContext.Provider>
    );
  };

  return { Provider, useStateValue, useStateUpdate };
}
export default createGlobalState;
