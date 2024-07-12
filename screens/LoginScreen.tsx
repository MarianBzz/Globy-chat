import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Background from '../components/Background';
import Btn from '../components/Btn';
import Field from '../components/Field';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    validateForm(text, password);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validateForm(username, text);
  };

  const validateForm = (user: string, pass: string) => {
    if (user.trim().length > 0 && pass.trim().length > 0) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  };

  const handleLogin = () => {
    if (isValidForm) {
      navigation.navigate('ChatList');
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos.');
    }
  };

  const showForgotPasswordAlert = () => {
    Alert.alert(
      '¿Has olvidado tu contraseña?',
      'Tranquilo, en este mundo mágico de pruebas, todas las contraseñas son correctas. ¡Adelante, prueba una!',
      [{ text: 'Entendido' }]
    );
  };

  const showSignUpAlert = () => {
    Alert.alert(
      '¿Quieres registrarte?',
      '¡Perfecto! No necesitas una cuenta aquí. Prueba con cualquier usuario y contraseña.',
      [{ text: 'Entendido' }]
    );
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460, paddingVertical: 70 }}>
        <Image
          source={require('../assets/fondo-2.png')}
          style={{ borderRadius: 12, position: 'absolute' }}
          resizeMode='repeat'
        />
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            marginBottom: 30,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 60,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#2c3e50',
              fontSize: 28,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Inicia sesión en tu cuenta
          </Text>
          <Field
            placeholder='Email / Nombre de usuario'
            onChangeText={handleUsernameChange}
            value={username}
          />
          <Field
            placeholder='Contraseña'
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            value={password}
          />
          <View
            style={{
              alignItems: 'flex-end',
              width: '78%',
              paddingRight: 16,
              marginBottom: 160,
            }}
          >
            <TouchableOpacity onPress={showForgotPasswordAlert}>
              <Text
                style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: 16 }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
          <Btn
            textColor='white'
            bgColor={'#2c3e50'}
            btnLabel='Iniciar Sesión'
            Press={handleLogin}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              ¿No tienes una cuenta?{' '}
            </Text>
            <TouchableOpacity onPress={showSignUpAlert}>
              <Text
                style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: 16 }}
              >
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default LoginScreen;
