import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

/* Screens */
import SplashScreen from './screens/SplashScreen';
import OnboardingFlow from './screens/OnboardingFlow';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OTPConfirmation from './screens/OTPConfirmation';
import WelcomeScreen from './screens/WelcomeScreen';

/* Auth / Password */
import ForgotPassword from './components/specific/ForgotPassword';
import NewPassword from './components/specific/NewPassword';

/* Main App Screens */
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

  /* ================= Splash / Onboarding ================= */
  const handleSplashComplete = () => setCurrentScreen('welcome');
  const handleWelcomeComplete = () => setCurrentScreen('onboarding');
  const handleOnboardingComplete = () => setCurrentScreen('login');

  /* ================= Login / Signup ================= */
  const handleLogin = (phone) => {
    setPhoneNumber(phone);
    setCurrentScreen('login-otp');
  };

  const handleSignup = (data) => {
    setUserData(data);
    setPhoneNumber(data.phone);
    setCurrentScreen('signup-otp');
  };

  /* ================= LOCATION PERMISSION ================= */
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

  /* ================= OTP CONFIRMATION ================= */
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


  /* ================= Forgot Password ================= */
  const handleForgotPassword = () => setCurrentScreen('forgot-password');
  const handleForgotPasswordSubmit = (phone) => {
    setPhoneNumber(phone);
    setCurrentScreen('forgot-otp');
  };
  const handleForgotOTPConfirm = () => setCurrentScreen('new-password');
  const handlePasswordReset = () => setCurrentScreen('login');
  
  const handleLogout = () => {
  setLocationPermissionGranted(false); // reset permission state
  setCurrentScreen('login');
};

<Menu onNavigate={handleNavigate} onLogout={handleLogout} />

  /* ================= Navigation ================= */
  const handleNavigate = (screen) => setCurrentScreen(screen);

  return (
    <View style={styles.container}>
      {/* Splash Screen */}
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Welcome Screen */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentScreen('onboarding')} />
      )}

      {/* Onboarding */}
      {currentScreen === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      {/* Login */}
      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          onSignup={() => setCurrentScreen('signup')}
        />
      )}

      {/* Login OTP */}
      {currentScreen === 'login-otp' && (
        <OTPConfirmation
          phoneNumber={phoneNumber}
          onConfirm={handleOTPConfirm}
          type="login"
        />
      )}

      {/* Signup */}
      {currentScreen === 'signup' && (
        <SignupScreen
          onSignup={handleSignup}
          onBackToLogin={() => setCurrentScreen('login')}
        />
      )}

      {/* Signup OTP */}
      {currentScreen === 'signup-otp' && (
        <OTPConfirmation
          phoneNumber={phoneNumber}
          onConfirm={handleSignupOTPConfirm}
          type="signup"
        />
      )}

      {/* Forgot Password */}
      {currentScreen === 'forgot-password' && (
        <ForgotPassword
          onSubmit={handleForgotPasswordSubmit}
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {/* Forgot OTP */}
      {currentScreen === 'forgot-otp' && (
        <OTPConfirmation
          phoneNumber={phoneNumber}
          onConfirm={handleForgotOTPConfirm}
          type="forgot"
          onBack={() => setCurrentScreen('forgot-password')}
        />
      )}

      {/* New Password */}
      {currentScreen === 'new-password' && (
        <NewPassword
          onSubmit={handlePasswordReset}
          onBack={() => setCurrentScreen('forgot-otp')}
        />
      )}

      {/* Main App Screens */}
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
