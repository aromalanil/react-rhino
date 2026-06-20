import { createRhinoStore } from 'react-rhino';

const store = createRhinoStore({
  counter: 0,
  name: 'John Doe',
});

export const {
  RhinoProvider,
  useRhinoState,
  useRhinoValue,
  useSetRhinoState,
} = store;
