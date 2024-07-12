import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

interface Message {
  sender: string;
  content: string;
  time: string;
}

type ChatScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Chat'>;
  route: RouteProp<RootStackParamList, 'Chat'>;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { contact } = route.params;
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'John', content: 'Hey, how are you?', time: '10:00 AM' },
    {
      sender: 'You',
      content: "I'm good, thanks! How about you?",
      time: '10:05 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage) {
      setMessages([
        ...messages,
        { sender: 'You', content: newMessage, time: 'Now' },
      ]);
      setNewMessage('');
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.message,
        {
          alignSelf: item.sender === 'You' ? 'flex-end' : 'flex-start',
          backgroundColor: item.sender === 'You' ? '#e6f7ff' : '#f0f0f0',
        },
      ]}
    >
      <Text>{item.content}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title='Send' onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  message: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
