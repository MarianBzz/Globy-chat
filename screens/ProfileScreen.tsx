import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: 'Leo Messi',
    status: 'Hermosa mañana verdad?',
  });

  const [image, setImage] = useState<string | null>(null);
  const profileImage = require('../assets/messi.jpg');

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/initial-background.jpg')}
        style={{ position: 'absolute' }}
        resizeMode='cover'
      />
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name='chevron-back' size={24} color='black' />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={!image ? profileImage : { uri: image }}
          style={styles.profileImage}
        />
        <Ionicons
          name='add-circle'
          size={35}
          color='green'
          style={styles.editIcon}
        />
      </TouchableOpacity>
      <View style={styles.profile}>
        <Text style={[styles.name, styles.bold]}>{profile.name}</Text>
        <Text style={styles.status}>{profile.status}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Editar Nombre</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => handleInputChange('name', text)}
          onBlur={() => {}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Editar Estado</Text>
        <TextInput
          style={styles.input}
          value={profile.status}
          onChangeText={(text) => handleInputChange('status', text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 100,
    fontFamily: 'ProximaNova-Regular',
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 70,
    padding: 5,
    borderRadius: 15,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'ProximaNova-Bold',
  },
  status: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'ProximaNova-Regular',
  },
  inputContainer: {
    marginBottom: 20,
  },
  text: {
    fontFamily: 'ProximaNova-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
  },
});

export default ProfileScreen;
