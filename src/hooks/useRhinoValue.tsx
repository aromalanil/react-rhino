import { useStateDataList } from '../RhinoProvider';

/**
 *
 * React hook which returns the stateful value
 * corresponding to the key provided
 * @param key Key which represents the state
 */
function useRhinoValue<T>(key: string): T {
  const stateDataList = useStateDataList();

  if (key in stateDataList) {
    return stateDataList[key].stateHook();
  }
  throw new Error(`${key} is an invalid key`);
}

export default useRhinoValue;
