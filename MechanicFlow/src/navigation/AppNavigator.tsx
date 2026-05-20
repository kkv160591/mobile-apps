import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "../screens/LoginScreen"
import BottomTabs from "./BottomTabs"
import CreateJobScreen from "../screens/CreateJobScreen"
import JobsScreen from "../screens/JobsScreen"
import JobDetailScreen from "../screens/JobDetailScreen"
import InvoiceScreen from "../screens/InvoiceScreen"

import { RootStackParamList } from "../types/navigation"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {

  return (

    <Stack.Navigator initialRouteName="Dashboard">

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Dashboard"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateJob"
        component={CreateJobScreen}
        options={{ title: "Create Job" }}
      />

      <Stack.Screen
        name="Jobs"
        component={JobsScreen}
      />

      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
      />

      <Stack.Screen 
        name="Invoice" 
        component={InvoiceScreen} 
      />

    </Stack.Navigator>

  )

}