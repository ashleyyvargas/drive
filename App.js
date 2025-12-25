import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

import SplashScreen from './screens/SplashScreen';
import OnboardingFlow from './screens/OnboardingFlow';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OTPConfirmation from './screens/OTPConfirmation';
import WelcomeScreen from './screens/WelcomeScreen';

import ForgotPassword from './components/specific/ForgotPassword';
import NewPassword from './components/specific/NewPassword';

import Dashboard from './components/specific/Dashboard';
import History from './components/specific/History';
import LocationView from './components/specific/LocationView';
import Contacts from './components/specific/Contacts';
import Menu from './components/specific/Menu';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleSplashComplete = () => setCurrentScreen('welcome');
  const handleWelcomeComplete = () => setCurrentScreen('onboarding');
  const handleOnboardingComplete = () => setCurrentScreen('login');

  const handleLogin = (phone) => {
    setPhoneNumber(phone);
    setCurrentScreen('login-otp');
  };

  const handleSignup = (data) => {
    setUserData(data);
    setPhoneNumber(data.phone);
    setCurrentScreen('signup-otp');
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Allow Drive to access your location to use the app properly.'
        );
        return false;
      }

      setLocationPermissionGranted(true);

      // Fetch current location
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to request location permission');
      return false;
    }
  };

  const handleOTPConfirm = async () => {
  const granted = await requestLocationPermission();
  if (granted) setCurrentScreen('dashboard');
};


const handleSignupOTPConfirm = async (enteredOTP) => {
  const granted = await requestLocationPermission();
  if (granted) {
    setCurrentScreen('dashboard');
  }
};

  const handleForgotPassword = () => setCurrentScreen('forgot-password');
  const handleForgotPasswordSubmit = (phone) => {
    setPhoneNumber(phone);
    setCurrentScreen('forgot-otp');
  };
  const handleForgotOTPConfirm = () => setCurrentScreen('new-password');
  const handlePasswordReset = () => setCurrentScreen('login');
  
  const handleLogout = () => {
  setLocationPermissionGranted(false); 
  setCurrentScreen('login');
};

<Menu onNavigate={handleNavigate} onLogout={handleLogout} />
  const handleNavigate = (screen) => setCurrentScreen(screen);

  return (
    <View style={styles.container}>
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentScreen('onboarding')} />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          onSignup={() => setCurrentScreen('signup')}
        />
      )}

      {currentScreen === 'login-otp' && (
        <OTPConfirmation
          phoneNumber={phoneNumber}
          onConfirm={handleOTPConfirm}
          type="login"
        />
      )}

      {currentScreen === 'signup' && (
        <SignupScreen
          onSignup={handleSignup}
          onBackToLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'signup-otp' && (
        <OTPConfirmation
          phoneNumber={phoneNumber}
          onConfirm={handleSignupOTPConfirm}
          type="signup"
        />
      )}

      {currentScreen === 'forgot-password' && (
        <ForgotPassword
          onSubmit={handleForgotPasswordSubmit}
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'forgot-otp' && (
        <OTPConfirmation
          phoneNumber={phoneNumber}
          onConfirm={handleForgotOTPConfirm}
          type="forgot"
          onBack={() => setCurrentScreen('forgot-password')}
        />
      )}

      {currentScreen === 'new-password' && (
        <NewPassword
          onSubmit={handlePasswordReset}
          onBack={() => setCurrentScreen('forgot-otp')}
        />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          onNavigate={handleNavigate}
          location={currentLocation}
        />
      )}

      {currentScreen === 'history' && (
        <History onNavigate={handleNavigate} />
      )}

      {currentScreen === 'location' && (
        <LocationView
          onNavigate={handleNavigate}
          location={currentLocation}
        />
      )}

      {currentScreen === 'contacts' && (
        <Contacts onNavigate={handleNavigate} />
      )}

      {currentScreen === 'menu' && (
        <Menu onNavigate={handleNavigate} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
