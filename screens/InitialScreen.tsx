import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Background from '../components/Background';
import Btn from '../components/Btn';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InitialScreen'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const InitialScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
        <Text style={styles.descriptionText}>
          ¡Comencemos a chatear! Explora una nueva manera de comunicarte
          fácilmente con quienes más quieres.
        </Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Btn
          bgColor='#2c3e50'
          textColor='white'
          btnLabel='Ingresar'
          Press={() => navigation.navigate('Login')}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginVertical: 160,
    alignItems: 'center',
    gap: 35,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'ProximaNova-Bold',
  },
  descriptionText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginBottom: 20,
  },
});

export default InitialScreen;
