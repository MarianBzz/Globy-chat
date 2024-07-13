import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={Platform.select({ ios: 50, android: 30 })}
      >
        <View style={styles.innerContainer}>
          <Image
            source={require('../assets/fondo-2.png')}
            style={styles.backgroundImage}
            resizeMode='repeat'
          />
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Inicia sesión en tu cuenta</Text>
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
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={showForgotPasswordAlert}>
                <Text style={styles.forgotPasswordText}>
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
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={showSignUpAlert}>
                <Text style={styles.signUpLink}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 180,
  },
  innerContainer: {
    alignItems: 'center',
    width: 460,
    paddingVertical: 70,
  },
  backgroundImage: {
    borderRadius: 12,
    position: 'absolute',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 30,
  },
  loginContainer: {
    backgroundColor: 'white',
    height: 700,
    width: 460,
    borderTopLeftRadius: 130,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    color: '#2c3e50',
    fontSize: 28,
    fontFamily: 'ProximaNova-Bold',
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width: '78%',
    paddingRight: 16,
    marginBottom: 120,
  },
  forgotPasswordText: {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'ProximaNova-Bold',
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ProximaNova-Bold',
  },
  signUpLink: {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'ProximaNova-Bold',
  },
});

export default LoginScreen;
