import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navaigator from "./src/Navigation/Navigator";
const App = () => {
  return (
    <NavigationContainer>
      <Navaigator />
    </NavigationContainer>
  );
};

export default App;
