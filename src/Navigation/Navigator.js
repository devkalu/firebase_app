import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookDataBaseScreen from "../screens/BookDataBaseScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={BookDataBaseScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
