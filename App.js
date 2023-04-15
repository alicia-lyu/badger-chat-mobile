
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';
import { Alert } from 'react-native';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    setChatrooms(["Hello", "World"]) // for example purposes only!
  }, []);

  function handleLogin(username, password) {
    fetch("https://cs571.org/s23/hw10/api/login", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_30e5ed25e99b26f8f91c",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if (res.status == 200) {
        setIsLoggedIn(true);
        return res.json();
      } else {
        Alert.alert("Incorrect login", "please try again")
        return {};
      }
    }).then(data => {
    //   {
    //     "msg": "Successfully authenticated.",
    //     "user": {
    //         "id": 4,
    //         "username": "test12456",
    //     },
    //     "token": "eyJhbGciOiJIUzI1NiIs..."
    // }
      if (data.token) {
        SecureStore.setItemAsync("jwt", data.token);
      }
    })
  }

  function handleSignup(username, password) {
    fetch("https://cs571.org/s23/hw10/api/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_30e5ed25e99b26f8f91c",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if (res.status == 200) {
        setIsLoggedIn(true);
        return res.json();
      } else if (res.status == 409) {
        Alert.alert("User name taken", "This user name already exists")
        return {}
      }
    }).then(data => {
      if (data.token) {
        SecureStore.setItemAsync("jwt", data.token);
      }
    })
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} />
  }
}


