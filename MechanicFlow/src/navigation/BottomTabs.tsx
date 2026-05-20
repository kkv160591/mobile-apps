import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"

import DashboardScreen from "../screens/DashboardScreen"
import CreateJobScreen from "../screens/CreateJobScreen"
import JobsScreen from "../screens/JobsScreen"

import { View, Text } from "react-native"

const Tab = createBottomTabNavigator()

function CustomersScreen() {
  return (
    <View>
      <Text>Customers Screen</Text>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  )
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {

          let iconName: any

          if (route.name === "Dashboard") iconName = "dashboard"
          if (route.name === "Jobs") iconName = "build"
          if (route.name === "Customers") iconName = "people"
          if (route.name === "Settings") iconName = "settings"

          return <MaterialIcons name={iconName} size={size} color={color} />
        }
      })}
    >

      <Tab.Screen name="Dashboard" component={DashboardScreen} />

      <Tab.Screen name="Jobs" component={JobsScreen} />

      <Tab.Screen name="Customers" component={CustomersScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  )
}