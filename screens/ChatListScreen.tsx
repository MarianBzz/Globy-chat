import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

interface Message {
  sender: string;
  content: string;
  time: string;
}

interface Chat {
  id: number;
  contact: string;
  messages: Message[];
}

const chats: Chat[] = [
  {
    id: 1,
    contact: 'John',
    messages: [
      { sender: 'John', content: 'Hey, how are you?', time: '10:00 AM' },
      { sender: 'You', content: 'I am good, thanks!', time: '10:05 AM' },
    ],
  },
  {
    id: 2,
    contact: 'Maria',
    messages: [
      {
        sender: 'Maria',
        content: 'Do you want to go out tonight?',
        time: 'yesterday',
      },
      { sender: 'You', content: 'Sure, where to?', time: 'yesterday' },
    ],
  },
  {
    id: 3,
    contact: 'Peter',
    messages: [
      {
        sender: 'Peter',
        content: "I'll be late for the meeting",
        time: '2 hours ago',
      },
      {
        sender: 'You',
        content: 'Noted, thanks for letting me know.',
        time: '1 hour ago',
      },
    ],
  },
];

type ChatListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChatList'
>;

const ChatListScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filteredChats, setFilteredChats] = useState<Chat[]>(chats);
  const [hasResults, setHasResults] = useState(true);
  const navigation = useNavigation<ChatListScreenNavigationProp>();

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = chats.filter((chat) =>
      chat.contact.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredChats(filtered);
    setHasResults(filtered.length > 0);
  };

  const getLastMessage = (messages: Message[]): Message => {
    return messages[messages.length - 1];
  };

  const sortedChats = [...filteredChats].sort(
    (a, b) =>
      new Date(getLastMessage(b.messages).time).getTime() -
      new Date(getLastMessage(a.messages).time).getTime()
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/initial-background.jpg')}
          style={styles.headerBackground}
          resizeMode='cover'
        />
        <Image
          source={require('../assets/logo-removebg.png')}
          style={styles.logo}
          resizeMode='cover'
        />
        <Text style={styles.headerTitle}>Globy Chat</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/messi.jpg')}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyTitle}>Mensajes</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder='¿A quién quieres escribir?'
        value={search}
        onChangeText={handleSearch}
      />
      {sortedChats.length === 0 && !hasResults ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Sin Resultados</Text>
        </View>
      ) : (
        <FlatList
          data={sortedChats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const lastMessage = getLastMessage(item.messages);
            return (
              <TouchableOpacity
                style={styles.messageContainer}
                onPress={() =>
                  navigation.navigate('Chat', {
                    contact: item.contact,
                    messages: item.messages,
                  })
                }
              >
                <View style={styles.messageIconContainer}>
                  <Image
                    source={require('../assets/messi.jpg')}
                    style={styles.profile}
                  />
                </View>
                <View style={styles.messageContent}>
                  <Text style={styles.messageTitle}>{item.contact}</Text>
                  <Text style={styles.messageDescription}>
                    {lastMessage.content}
                  </Text>
                </View>
                <Text style={styles.messageTime}>{lastMessage.time}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    height: 120,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 45,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  headerBackground: {
    borderRadius: 12,
    position: 'absolute',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#2980b9',
    marginLeft: 10,
    marginRight: 'auto',
    fontFamily: 'ProximaNova-Bold',
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyTitle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: 'ProximaNova-Bold',
    marginTop: 8,
  },
  searchInput: {
    height: 40,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    marginVertical: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    marginHorizontal: 12,
  },
  messageIconContainer: {
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ProximaNova-Bold',
  },
  messageDescription: {
    fontFamily: 'ProximaNova-Regular',
    color: '#666',
  },
  messageTime: {
    color: '#4CAF50',
    marginLeft: 8,
    fontFamily: 'ProximaNova-Regular',
  },
  noResultsContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontFamily: 'ProximaNova-Bold',
    fontSize: 18,
  },
});

export default ChatListScreen;
