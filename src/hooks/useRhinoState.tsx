import { useStateDataList } from '../RhinoProvider';
import useSetRhinoState from './useSetRhinoState';
import useRhinoValue from './useRhinoValue';

/**
 *
 * React hook which returns the stateful value  corresponding to the key
 * provided and a function to update it
 * @param key Key which represents the state
 */
function useRhinoState<T>(key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const stateDataList = useStateDataList();

  if (key in stateDataList) {
    return [useRhinoValue(key), useSetRhinoState(key)];
  }
  throw new Error(`${key} is an invalid key`);
}

export default useRhinoState;
