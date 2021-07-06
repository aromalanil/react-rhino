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

## Usage

### Getting started
Set up state management for your application following these three easy steps shown in the example. Or see a  [demo project](https://codesandbox.io/s/react-rhino-example-svv5b) showing `react-rhino` in use.


1. #### Create global state
To get started, create a file called `states.js`. This file holds a declaration of the global state for the entire app.

`states.js`
```jsx
import createRhinoState from "react-rhino";

const { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState } = createRhinoState({
   name: "John Doe", // Will become a new global state
   dark_mode: true // Will become another new global state
});

export { RhinoProvider, useRhinoState, useRhinoValue, useSetRhinoState }
```

2. #### Wrapping App with RhinoProvider
After creating and initializing state for app(in step described above), import `RhinoProvider` inside the top-level `index.js` file of the app. Wrap `<App/>` with `<RhinoProvider>` to make state and updater functions available to child components in the app.

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

3. #### To consume global state
To consume the global state,  import the `useRhinoState` variable from the component file that requires the use of the global state.
> Use the array destructuring syntax to pluck out: a constant holding a state value and an updater function to update the same state value from the global state.

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

4. #### A Component which only reads the state and not the updater function
For Components that only reads the state values,  declare a constant inside the component and assign the constant to  a call to `useRhinoValue("key_to_identify_state_value")` passing in key as an argument like:

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

#### A Component which only accesses the updater function
For a component that only updates the state, import `useSetRhinoState` in the component file that performs update to the global state.

Declare a constant inside the component and assign the constant to a call to `useSetRhinoState("key_to_identify_state_value")` passing in a  key identifying a state value as an argument.

`toggle.js`
> This component will not rerender if the state `isDarkMode` changes as it only uses the updater function and not the state itself.
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
#### A Component accessing multiple global state values
Accessing multiple state values is pretty straight forward, declare constants to hold different state values and access state values by calling `useRhinoValue("key")` passing a key identifying with a state value as an argument.

`details.js`

```jsx
import { useRhinoValue } from "./states.js"

const Datails= () => {
  /*  
      Seperate calls to useSetRhinoState return seperate state values
      based on keys that identify with state value.
  */
  const userName = useRhinoValue("name")
  const addressDetails = useRhinoValue("addressDetails")
  return(<div>
      <span>{userName}</span>
  </div>
  )

}
```

## Online Playground
[Here](https://codesandbox.io/s/react-rhino-example-svv5b) is a short demo project  to help familiarize with state management using React Rhino.

## API / Documentation
`createRhinoState` is the only function you can directly import from the package. All other API elements are returned from this function.

### createRhinoState()
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

> `createRhinoState` will output `RhinoProvider` and `useRhinoState`, `useRhinoValue` and `useSetRhinoState` hooks. Destructure the `createRhinoSate` Provider to get these  hooks as needed(like in the above snippet).


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
> You can use this if your component only needs to read the state but perform no updates.
```jsx
const darkMode = useRhinoValue("isDarkMode");
/* Here "isDakMode" is the key representing the state */
```

### useSetRhinoState
Takes key representing state object as input and returns the function to update the state.
> You can use this if your component only needs the updater function and not the state itself.
Having an updater function in the component will not trigger a rerender on the state change.
Updator functions perform updates on the state values.
```jsx
const setDarkMode = useRhinoValue("isDarkMode");
/* Here "isDakMode" is the key representing the state */
```

## Why choose Rhino?

### 🏋️‍♂️ Lightweight
Only **~560** bytes when Minified & Gzipped.

### 🐱‍🏍 Syntax you already know
Offers a straightforward syntax similar to the built-in hooks of React.

### 👷‍♂️ Easy to Extend
Add a new global state with just a single line of code, it's that simple.

### 📐 Easy to Use
Get started with Rhino in a short amount of time.



## Author
[Aromal Anil](https://aromalanil.tech)

