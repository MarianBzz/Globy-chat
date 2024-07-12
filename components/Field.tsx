import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  TextInputProps,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FieldProps extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

const Field: React.FC<FieldProps> = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        style={{
          borderRadius: 10,
          color: '#2c3e50',
          paddingVertical: 14,
          paddingHorizontal: 10,
          width: '70%',
          backgroundColor: 'rgb(220, 220, 220)',
          marginVertical: 10,
          paddingRight: secureTextEntry ? 40 : 10,
        }}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        placeholderTextColor={'gray'}
        onChangeText={onChangeText}
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={{ position: 'absolute', right: 15 }}
          onPress={togglePasswordVisibility}
        >
          <MaterialIcons
            name={showPassword ? 'visibility-off' : 'visibility'}
            size={24}
            color='#2c3e50'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Field;
