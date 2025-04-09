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
// React uses JavaScript to build user interfaces, and it creates HTML dynamically through a virtual DOM. For example, the syntax: function App() {return <div> </div>} if a JSX syntax, which is provided by React. React also provide built-in interaction components like useState, onClick, etc. It also provide management of dynamic content with state and props, reusable components, and virtual DOM, things that don't come with vanilla HTML. 
import * as Notifications from 'expo-notifications';
// What does it mean? 
// Imports all exports from the expo-notification module. This library is used to handle push notifications, like getting permissions, listening for messages, and getting device tokens. 
// Why does it have a different syntax as import React from 'react'? Why not use * for React? 
// The 'react' package has a default export. But the 'expo-notifications' does not have a default export. "import * as Notifications" is called a namespace import. This is equivalent of importing all functions from the expo-notifications package. It creates a "Notifications" object to store all those functions we imported from 'expo-notifications'. 