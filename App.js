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

    registerForPushNotificationsAsync();
    // What: Calls the function that requests permission and gets the push token.
    // Why: This is how the app gets permission to send notifications and retrieves the unique token to identify the device.
    
    const subscription = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification received!', notification);
        alert("There is a notification "+notification);
    });
    // What: Listens for incoming notifications while the app is running in the foreground.
    // Why: Logs and alerts the user when a notification is received. This makes sure notifications are handled even when the app is open.
    // What is this syntax (notification => {})?
    // This means: A function that takes one argument called notification, and runs the code inside the { ... } when it’s called.
    // Why use this weird syntax? 
    // It’s shorter and easier to write inline. You don’t have to:
    // -Declare a separate function
    // -Come up with a name
    // -Pass it in separately

    return () => {
        subscription.remove();
      };
    // What: Cleanup function that removes the notification listener.
    // Why: Prevents memory leaks by unsubscribing the listener when the component unmounts.
    // Is this another arrow function? Why is it in the return statement? Why can't it be a separate line? 
    // React expects that if your useEffect needs to clean something up, you return a function. React will store that returned function and call it later when it is unmounted. The listener is not supposed to be removed the whole time the App is running. If the cleanup function is outside return (), it will run right after the listener is set up. 

}, []);
// What: The dependency array for useEffect.
// Why: An empty array means the effect only runs once—when the component mounts.
const registerForPushNotificationsAsync = async () => {
    // What: Defines an asynchronous function to handle permissions and get the device token.
    // Why: This wraps the logic for setting up push notifications in a reusable, clean function
    // Why is this defined outside of useEffect()? 
    // First, this function is long. So defining it outside makes it easier to read. Second, defining it outside allows it to be called outside (code declaration scope problem). 
        
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        // What: Checks current notification permission status.
        // Why: If permissions are already granted, no need to ask again.
        // What is status:existingStatus. I don't understand the syntax again. 
        // The function "getPermissionAsync()" returns an object with many variables. One of them is named "status". This line gets the "status" variable out from the output of the getPermissionAsync() function. 
        // The ":existingStatus" part is a short cut to store the value of "status" to a new variable named "existingStatus". This is called "object destructuring with renaming"
        
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        // What: Requests notification permission if not already granted.
        // Why: Ensures the app can only proceed if the user allows notifications.
        // What is this let syntax? 
        // Let is a way to create variable, like "const". But unlike "const", variables created by "let" can be altered later. It is the "var" way in old style. 
        // Also, "let" and "const" are block-scoped, meaning that they can't be accessed outside the block (e.g. if, for). But "var" is function-scoped. It can be declared and accessed anywhere within a function. 
        // Why does it try to get permission twice? 
        // The "getPermissionsAsync()" only learn about whether this app has the permission. It does not show a popup to the user. 
        // In the "requestPermissionsAsync()", when the App does not have a permission, it ask the user for it. 

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        // What: Retrieves the Expo push token.
        // Why: This token uniquely identifies the device and is needed to send push notifications to it.

        console.log('Push Notification Token:', token);
        // What: Logs the token.
        // Why: Useful for development and debugging—this token can be used to test push notifications.
};

return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Firebase Messaging App!</Text>
    </View>
  );
// What: The main UI of the app.
// Why: Displays a simple message in the center of the screen. Basic user interface.

}; 
// What: Closes the App component definition.

export default App;
// What: Exports the App component as the default export.
// Why: This allows the component to be rendered by React Native when the app runs.
// What is the export command here? Why not return? 
// The export command is used to make a function, object, or variable available for use in other files.
// What is the "default" command here? What does it do? 
// It helps specify the default export from a module, which can be imported without needing to know the exact name of the exported value