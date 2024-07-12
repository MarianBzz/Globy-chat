import { ReactNode } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';

const Background = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/initial-background.jpg')}
        style={styles.background}
        resizeMode='cover'
      >
        <View style={styles.absoluteContainer}>{children}</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#7f8c8d',
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Background;
