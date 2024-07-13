import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  Keyboard,
  Animated,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatScreenRouteProp>();
  const { contact, messages } = route.params;
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);
  const flatListRef = useRef<FlatList | null>(null);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const animatedPaddingBottom = useRef(new Animated.Value(43)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShown(true);
        animateFooter(14);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShown(false);
        animateFooter(43);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const animateFooter = (value: number) => {
    Animated.timing(animatedPaddingBottom, {
      toValue: value,
      duration: 50,
      useNativeDriver: false,
    }).start();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: 'You',
        content: message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage('');
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='caret-back' size={24} color='#2c3e50' />
        </TouchableOpacity>
        <Image
          source={require('../assets/messi.jpg')}
          style={styles.headerProfile}
        />
        <Text style={styles.headerTitle}>{contact}</Text>
      </View>
      <ImageBackground
        source={require('../assets/fondo-2.png')}
        style={styles.backgroundImage}
        resizeMode='repeat'
      >
        <FlatList
          ref={(ref) => {
            flatListRef.current = ref;
          }}
          data={chatMessages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender === 'You' ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <View style={styles.messageContent}>
                <Text style={styles.messageSender}>{item.sender}</Text>
                <Text style={styles.messageText}>{item.content}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      </ImageBackground>
      <Animated.View
        style={[styles.footer, { paddingBottom: animatedPaddingBottom }]}
      >
        <TextInput
          style={styles.input}
          placeholder='Escribe un mensaje...'
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    backgroundColor: '#d2f3f6AA',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
  },
  headerProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold',
    color: '#2c3e50',
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dff9fb',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#c7ecee',
  },
  messageContent: {
    maxWidth: '80%',
  },
  messageSender: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#bdc3c7',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ChatScreen;
