import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ButtonTab from "./ButtonTab";

const MyStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NavigationContainer>
        <MyStack.Navigator>
            <MyStack.Screen name="Home" component={ButtonTab} />
        </MyStack.Navigator>
    </NavigationContainer>
  )
}

export default Stack