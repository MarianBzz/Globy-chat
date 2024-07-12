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

// Datos mock
const chats = [
  {
    id: 1,
    contact: 'John',
    lastMessage: 'Hey, how are you?',
    lastMessageTime: '10:00 AM',
  },
  {
    id: 2,
    contact: 'Maria',
    lastMessage: 'Do you want to go out tonight?',
    lastMessageTime: 'yesterday',
  },
  {
    id: 3,
    contact: 'Peter',
    lastMessage: "I'll be late for the meeting",
    lastMessageTime: '2 hours ago',
  },
];

const ChatListScreen = () => {
  const [search, setSearch] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);

  const handleSearch = (text: string) => {
    setSearch(text);
    setFilteredChats(
      chats.filter((chat) =>
        chat.contact.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 120,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 45,
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}
      >
        <Image
          source={require('../assets/initial-background.jpg')}
          style={{ borderRadius: 12, position: 'absolute' }}
          resizeMode='cover'
        />
        <Image
          source={require('..//assets/logo-removebg.png')}
          style={styles.logo}
          resizeMode='cover'
        />
        <Image
          source={require('..//assets/messi.jpg')}
          style={styles.profile}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyTitle}>Mensajes</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder='Buscar'
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <View style={styles.messageIconContainer}>
              <Image
                source={require('..//assets/messi.jpg')}
                style={styles.profile}
              />
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.messageTitle}>{item.contact}</Text>
              <Text style={styles.messageDescription}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.messageTime}>{item.lastMessageTime}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    paddingTop: 10,
    marginRight: 'auto',
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  bodyTitle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: 'bold',
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
  },
  messageDescription: {
    color: '#666',
  },
  messageTime: {
    color: '#4CAF50',
    marginLeft: 8,
  },
});

export default ChatListScreen;
