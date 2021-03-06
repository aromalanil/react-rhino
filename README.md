# 🦏 React Rhino 

[![NPM Version](https://img.shields.io/npm/v/react-rhino)](https://www.npmjs.com/package/react-rhino)
![ESLint Check](https://github.com/aromalanil/react-rhino/workflows/ESLint-Check/badge.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/aromalanil/react-rhino/blob/master/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-rhino)](https://www.npmjs.com/package/react-rhino)

[![https://nodei.co/npm/react-rhino.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/react-rhino.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-rhino)

React Rhino is a simple yet powerful state management library for [React](https://reactjs.org/)

## Installation 

```bash
# If you use npm:
npm install react-rhino

# Or if you use Yarn:
yarn add react-rhino
```

## Why?
Why you should consider Rhino over other alternatives.

### 🏋️‍♂️ Lightweight
Only **~560** bytes when Minified & Gzipped.

### 🐱‍🏍 Syntax you already know
Offers a simple and straightforward syntax similar to the built-in hooks of React.

### 👷‍♂️ Easy to Extend
Add a new global state with just a single line of code, it's that simple.

### 📐 Easy to Use
Learn how to use Rhino in a short amount of time.

## Online Playground
[Here](https://codesandbox.io/s/react-rhino-example-svv5b) is a demo project for you to get familiar with React Rhino.

## Example
Here is an example of how to use React Rhino
### A file to create global states
`states.js`
```jsx
import createRhinoState from "react-rhino";

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
   name: "John Doe", // Will become a new global state
   dark_mode: true // Will become another new global state
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState }
```

### Wraping App with RhinoProvider
`index.js`
```jsx
import { RhinoProvider } from "./states.js"
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <RhinoProvider>
    <App />
  </RhinoProvider>,
  rootElement
);
```

### To consume global state
`dark_mode.js`
```jsx
import { useRhinoState } from "./states.js"

 const DarkModeButton = () => {

 /* "dark_mode" is the key to identify the state */
 const [isDarkMode, setDarkMode] = useRhinoState("dark_mode"); 

 const toggleDarkMode = () => {
   setDarkMode(currentMode => !currentMode);
 }
 return(
   <p>{ isDarkMode ? "Switch to Light" : "Switch to dark" }</p>
   <button onClick={toggleDarkMode}>Toggle</button>
 );
}

export default DarkModeButton;
```

### Component which only wants the state and not the updater function
`menu_bar.js`
```jsx
import { useRhinoValue } from "./states.js"

const Menu = () => {

 /* useRhinoValue only return state value */
 const isDarkMode = useRhinoValue("dark_mode"); 

 return(
   <nav>
    {/* Other nav contents */}
    <p>{`Currently it is ${isDarkMode ? "Dark" : "Light"}`}</p>
   </nav>
 );

 export default Menu;
}
```

### Component which only wants the updater function
`toggle.js`
> This component will not rerender if the state `isDarkMode` changes as it only use the updater function and not the state itself
```jsx
import { useSetRhinoState } from "./states.js"

const Toggle = () => {

 /* useSetRhinoState only return updater function */
 const setDarkMode = useSetRhinoState("dark_mode");

 const toggleDarkMode = () => {
   setDarkMode(currentMode => !currentMode);
 }

 return <button onClick={toggleDarkMode}>Toggle DarkMode</button>

 export default Toggle;
}
```

## API / Documentation
`createRhinoState` is the only function you can directly import from the package. All other API elements are returned from this function

### createRhinoState( )
Takes a single object as argument in which each global states as its entries.

Here each key represents each state with their corresponding values being their initial value.

```jsx
import createRhinoState from "react-rhino";

const { RhinoProvider, useRhinoState } = createRhinoState({
   name: "John Doe", // Will create a global state with initial value "John Doe"
   isDarkMode : true, // Will create another global state with initial value true
});

export { RhinoProvider, useRhinoState }
```

> `createRhinoState` will output `RhinoProvider` and a bunch of hooks. Destructure the Provider and the hooks you need.


### RhinoProvider
Components that use Rhino state need `RhinoProvider` to appear somewhere in the parent tree. A good place to put this is in your root component.

```js
import { RhinoProvider } from "./states.js";

function App() {
  return (
    <RhinoProvider>
      <SearchBar />
    </RhinoProvider>
  );
}
```

### useRhinoState
Takes key representing state object as input and returns an array with the state value and the function to update the state.

> This hook is pretty similar to `useState` hook in React
```jsx
const [darkMode, setDarkMode] = useRhinoState("isDarkMode");
/* Here "isDakMode" is the key representing the state */
```

### useRhinoValue
Takes key representing state object as input and returns the state value.
> You can use this if your component do not want to update the state.
```jsx
const darkMode = useRhinoValue("isDarkMode");
/* Here "isDakMode" is the key representing the state */
```

### useSetRhinoState
Takes key representing state object as input and returns the function to update the state.
> You can use this if your component only wants the updater function and not the state itself.
Having an updater function in the component will not trigger a rerender on the state change 
```jsx
const setDarkMode = useRhinoValue("isDarkMode");
/* Here "isDakMode" is the key representing the state */
```

## Author
[Aromal Anil](https://aromalanil.tech)

