import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';

// Import screens
import Welcome from './src/screens/Welcome';
import Home from './src/screens/Home';
import AddTask from './src/screens/AddTask';
import EditTask from './src/screens/EditTask';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="AddTask" component={AddTask} options={{ headerShown: false }}/>
        <Stack.Screen name="EditTask" component={EditTask} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
