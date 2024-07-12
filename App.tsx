import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ChatListScreen from './screens/ChatListScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import { RootStackParamList } from './types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InitialScreen from './screens/InitialScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='InitialScreen'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='InitialScreen' component={InitialScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='ChatList' component={ChatListScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
          <Stack.Screen name='Chat' component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}
