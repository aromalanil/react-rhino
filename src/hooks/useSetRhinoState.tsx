import { useStateDataList } from '../RhinoProvider';

/**
 *
 * React hook which returns a function to update the global state
 * corresponding to the key provided
 * @param key Key which represents the state
 */
function useSetRhinoState<T>(key: string): React.Dispatch<React.SetStateAction<T>> {
  const stateDataList = useStateDataList();

  if (key in stateDataList) {
    return stateDataList[key].updaterHook();
  }
  throw new Error(`${key} is an invalid key`);
}

export default useSetRhinoState;
