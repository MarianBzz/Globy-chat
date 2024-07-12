import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

interface Chat {
  id: string;
  contact: string;
  lastMessage: string;
  lastMessageTime: string;
}

const chats: Chat[] = [
  {
    id: '1',
    contact: 'John',
    lastMessage: 'Hey, how are you?',
    lastMessageTime: '10:00 AM',
  },
  {
    id: '2',
    contact: 'Maria',
    lastMessage: 'Do you want to go out tonight?',
    lastMessageTime: 'yesterday',
  },
  {
    id: '3',
    contact: 'Peter',
    lastMessage: "I'll be late for the meeting",
    lastMessageTime: '2 hours ago',
  },
];

type ChatListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChatList'
>;

const ChatListScreen = () => {
  const navigation = useNavigation<ChatListScreenNavigationProp>();

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', { contact: item.contact })}
    >
      <View style={styles.item}>
        <Text style={styles.contact}>{item.contact}</Text>
        <Text>{item.lastMessage}</Text>
        <Text style={styles.time}>{item.lastMessageTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  contact: {
    fontWeight: 'bold',
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
});

export default ChatListScreen;
