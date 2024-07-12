import React from 'react';
import { View, Image, Text } from 'react-native';
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
      <View
        style={{
          marginHorizontal: 40,
          marginVertical: 160,
          alignItems: 'center',
          gap: 35,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#2c3e50' }}>
          ¡Bienvenido!
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#7f8c8d',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          ¡Comencemos a chatear! Explora una nueva manera de comunicarte
          fácilmente con quienes más quieres.
        </Text>
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: 140,
            height: 140,
            borderRadius: 12,
            marginBottom: 20,
          }}
        />
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

export default InitialScreen;
