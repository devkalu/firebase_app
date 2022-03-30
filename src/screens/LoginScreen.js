import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

  const handleSignIn = async () => {};
  const handleSignOut = async () => {};

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
      <Button title="Signin" color="green" />
      <Button title="Signout" color="red" />

      <View>
        <Text>{isLoggedIn ? "Logged In" : "Logged Out"}</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
