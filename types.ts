// navigation.ts

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  InitialScreen: undefined;
  Login: undefined;
  ChatList: undefined;
  Profile: undefined;
  Chat: { contact: string; messages: Message[] };
};

interface Message {
  sender: string;
  content: string;
  time: string;
}

export type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chat'
>;
export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
