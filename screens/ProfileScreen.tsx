import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('John');
  const [status, setStatus] = useState('Available');

  const handleSave = () => {
    alert('Profile saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Status</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} />
      <Button title='Save' onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default ProfileScreen;
