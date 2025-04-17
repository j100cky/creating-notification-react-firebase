// App.js
import React, {useEffect} from 'react';
// What does it mean? 
// React is needed to define the component. "useEffect" is used to run side effects (like registering for notifications) when the component mounts.
// Why is useEffect enclosed by {}? 
// {} means you are using "destructuring import syntax". "React" is the default export of the "react package". "useEffect" is a named export from the same package. It does both importation in one line. The operation {} is a destructuring operation, which is equivalent to react.useEffect
import { View, Text } from 'react-native';
// What does it mean? 
// This import the View and Text components from React Native. These are basic UI building blocks, like a <container>/<div>/<text> in react.
// What is the difference between react and react native? 
// React is a JavaScript library for building user interfaces mainly for the web, renders to HTML in the broser. 
// React-native is a framework built on top of React to create native mobile apps. It renders to mobile UI components using platform-specific codes. 
// How is react different from HTML since HTML contains syntax like <div> <h1> and <input>? 
// React uses JavaScript to build user interfaces, and it creates HTML dynamically through a virtual DOM. For example, the syntax: function App() {return <div> </div>} is a JSX syntax, which is provided by React. React also provide built-in interaction components like useState, onClick, etc. It also provide management of dynamic content with state and props, reusable components, and virtual DOM, things that don't come with vanilla HTML. 

import * as Notifications from 'expo-notifications';
// What does it mean? 
// Imports all exports from the expo-notification module. This library is used to handle push notifications, like getting permissions, listening for messages, and getting device tokens. 
// Why does it have a different syntax as import React from 'react'? Why not use * for React? 
// The 'react' package has a default export. But the 'expo-notifications' does not have a default export. "import * as Notifications" is called a namespace import. This is equivalent of importing all functions from the expo-notifications package. It creates a "Notifications" object to store all those functions we imported from 'expo-notifications'. 

import { initializeApp } from 'firebase/app';
//  Imports the "initializeApp" function to initialize Firebase. Needed to configure and connect your app to Firebase using the provided credentials.

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
// What: This is a Firebase configuration object.
// Why: These fields uniquely identify your Firebase project. These would normally be filled in with real values. Without them, Firebase features won't work.

const app = initializeApp(firebaseConfig);
// What: Initializes Firebase using the config above.
// Why: Sets up Firebase so that Firebase services (e.g., messaging, Firestore) can be used in your app.

const App = () => {
// What: Declares the main functional component of the app.
// Why: This is the component that React Native will render when the app starts.
// Why are there different ways to put the main function? Some people use the index.html for the main page. Some people have a separate file for main page. Why are there different practices? 
// For web: 
// index.html: contains the root HTML element. 
// index.js: is the entry JavaScript file that renders App into the index.html page.
// This is how React for the web connects to the browser.
// For React Native or Expo: 
// No index.html here — because you're not rendering to a browser.
// React Native/Expo handles the “root view” internally. You usually define your entry point in a file like App.js. The framework knows to launch App as the main component — no HTML required.
// Expo or React Native knows to use App as the main component, and the entry point is handled internally (often still index.js under the hood, but hidden from you).
// What is index.html, then? 
// index.html is part of the entry point for web apps, but it is not the main component. 
// It is served to the browser by your dev server. It is like a shell that provides a page that gives React components to mount. It contains, for example, a <div id="root"> — which is a placeholder. In index.js, what is inside the <div id=root> is coded and it injects (mounts) the React component tree into the <div id="root"> in index.html.

useEffect(() => {
// What: Sets up a side effect that runs after the component mounts.
// Why: Used to register for notifications and set up a listener when the component is first rendered.
// What are side effects? 
// A side effect is anything a function does other than returning a value. For example, printing a result before returning the value is a side effect. 
// Why do we need to put side effects away? 
// React wants its rendering to be pure and predictable. So all those messy, real-world things you have to do (like fetching data or subscribing to events) should be handled separately — using useEffect(). “Hey React, after you render this component, please do this side effect (like fetch data, or listen for a notification).”
// Why is the syntax so bizarre? What is the first parenthesis for, what is the => for, and what is the curly bracket for? 
// The first parenthesis: This is a function call — you're calling the useEffect hook that React gives you to handle side effects (like logging, fetching data, etc.).
// It takes two arguments: A function; A dependency array
// The second parenthesis, the arrow, and the curly bracket: This is a function written in modern JavaScript syntax. It's the same as this more familiar syntax: function(){...}. The ... inside the curly bracket contains the function body. 
// The second argument, the dependency array, is enclosed by []. [] means: run this only once, after the component first renders (like componentDidMount in class components). If you put [someVar], it means: run it whenever someVar changes.




})


}