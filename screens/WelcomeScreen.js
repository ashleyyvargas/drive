import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, useColorScheme } from 'react-native';
import driveLogo from '../assets/drivelogo.png';
import { lightTheme, darkTheme } from '../components/theme'; // reuse theme file

export default function WelcomeScreen({ onStart }) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      
      <View style={styles.logoContainer}>
        <Image source={driveLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>D.R.I.V.E</Text>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={onStart}>
        <Text style={[styles.buttonText, { color: theme.card }]}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#364d9bff',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 80,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
