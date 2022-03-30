import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUp = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Created", cred.user);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User just logged in", user);
        } else {
          console.log("User just logged out", user);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, "test2@test.com", "test1234");
      setIsLoggedIn(true);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User just logged in", user);
        } else {
          console.log("User just logged out", user);
        }
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  const unSubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User just logged in", user);
    } else {
      console.log("User just logged out", user);
    }
  });

  const subscription = () => {};

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
        Login Screen
      </Text>
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <Text>Email: </Text>
        <TextInput
          style={{ borderBottomColor: "black", borderBottomWidth: 2, flex: 1 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <Text>Password: </Text>
        <TextInput
          style={{ borderBottomColor: "black", borderBottomWidth: 2, flex: 1 }}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button title="Signup" onPress={handleSignUp} />
      <Button title="Signin" color="green" onPress={handleSignIn} />
      <Button title="Signout" color="red" onPress={handleSignOut} />
      <Button
        title="Unsubscribe Auth changes"
        color="purple"
        onPress={unSubscribe}
      />

      <View>
        <Text>{isLoggedIn ? "Logged In" : "Logged Out"}</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
