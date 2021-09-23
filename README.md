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
## Why choose Rhino?

### 🏋️‍♂️ Lightweight
Only **~770** bytes when Minified & Gzipped.

### 🚀 Syntax you already know
Offers a straightforward syntax similar to the built-in hooks of React.

### 👷‍♂️ Easy to Extend
Add a new global state with just a single line of code, it's that simple.

### 📐 Easy to Use
Get started with Rhino in a short amount of time.

## Online Playground
Use the button below to play with a small demo project to help familiarize with state management using React Rhino.

[![View on Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-rhino-example-svv5b)

## Usage

Set up React Rhino in your project using these simple steps

### Step 1
Wrap your app with `RhinoProvider` and pass the store object to it

> Note: `store` is an object in which each entries will  become a global state. In `store`, keys will be the identifiers for each state and their corresponding value will be the initial values of that particular state.

```jsx
import { RhinoProvider } from 'react-rhino';

const store = {
 dark_mode: true
}

function App() {
  return (
    <RhinoProvider store={store}>
      <Counter />
    </RhinoProvider>
  );
}
```

### Step 2
Consume global state in any of your components, by using the `useRhinoState` hook as in the below example

```jsx
import { useRhinoState } from "react-rhino"

 const DarkModeButton = () => {

 /* "dark_mode" is the key given to this state in the store */
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

> Note : `useRhinoState` is similar to the `useState` hook of React. `useRhinoState` will also returns an array containing the state and it's updater function.<br/><br/>
The only difference is that unlike 
`useState` hook we pass the key of the global state to `useRhinoState` hook.


## API / Documentation
### RhinoProvider
Components that use Rhino state need `RhinoProvider` to appear somewhere in the parent tree. A good place to put this is in your root component.

> `RhinoProvider` takes only a single prop, `store`. Each entries in `store` will be converted to a global state. <br/> <br/>Each key in `store` represents a global state and the values corresponding to them becomes the initial values of those states respectively.

```js
import { RhinoProvider } from "react-rhino";

const store={
   name: "John Doe", // Will become a global state with initial value "John Doe"
   isDarkMode : true, // Will become another global state with initial value true
}

function App() {
  return (
    <RhinoProvider store={store}>
      <SearchBar />
    </RhinoProvider>
  );
}
```

### useRhinoState
Takes key representing the state as argument and returns an array with the state value and the function to update the state.

> This hook is pretty similar to `useState` hook in React.
```jsx
const [darkMode, setDarkMode] = useRhinoState("isDarkMode");
/* Here "isDakMode" is the key representing the state */
```

### useRhinoValue
Takes key representing the state as argument and returns only the the state value.
> You can use this if your component only needs to read the state but perform no updates.
```jsx
const darkMode = useRhinoValue("isDarkMode");
/* Here "isDakMode" is the key representing the state */
```

### useSetRhinoState
Takes key representing the state as argument and returns the function to update the state.
> You can use this if your component only needs the updater function and not the state itself.
Having an updater function in the component will not trigger a re-render on the state change.
```jsx
const setDarkMode = useSetRhinoState("isDarkMode");
/* Here "isDakMode" is the key representing the state */
```

## Some Examples
### A Component which only read the state and not the updater function
For Components that only read the state values,  declare a constant inside the component and assign the constant to  a call to `useRhinoValue("key_to_identify_state_value")` passing in key as an argument like:

`menu_bar.js`
```jsx
import { useRhinoValue } from "react-rhino"

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

### A Component which only accesses the updater function
For a component that only updates the state, import `useSetRhinoState` in the component file that performs update to the global state.

Declare a constant inside the component and assign the constant to a call to `useSetRhinoState("key_to_identify_state_value")` passing in a  key identifying a state value as an argument.

`toggle.js`
> This component will not re-render if the state `isDarkMode` changes as it only uses the updater function and not the state itself.
```jsx
import { useSetRhinoState } from "react-rhino"

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
### A Component accessing multiple global state values
Accessing multiple state values is pretty straight forward, declare constants to hold different state values and access state values by calling `useRhinoValue("key")` passing a key identifying with a state value as an argument.

`details.js`

```jsx
import { useRhinoValue } from "react-rhino"

const Details= () => {
  /*  
      Separate calls to useSetRhinoState return separate state values
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

## Author
[Aromal Anil](https://aromalanil.tech)

## License
```
MIT License

Copyright (c) 2021 Aromal Anil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

