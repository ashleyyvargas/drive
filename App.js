import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

/* SCREENS */
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingFlow from './screens/OnboardingFlow';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OTPConfirmation from './screens/OTPConfirmation';
import ConnectedAccountsScreen from './screens/ConnectedAccountsScreen';

/* AUTH */
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';

/* DRIVER MODE */
import Dashboard from './components/Dashboard';
import History from './components/History';
import LocationView from './components/LocationView';
import Contacts from './components/Contacts';
import Menu from './components/Menu';

/* EMERGENCY CONTACT MODE */
import EmergencyContactDashboard from './components/EmergencyContactDashboard';
import EmergencyContactNotifications from './components/EmergencyContactNotifications';
import EmergencyContactSettings from './components/EmergencyContactSettings.js';
import DriverDetailView from './components/DriverDetailView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState(null);

  const [userMode, setUserMode] = useState('driver'); 
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);


  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location access is required to use this app.'
        );
        return false;
      }

      setLocationPermissionGranted(true);

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
      return false;
    }
  };


  const handleLogin = (phone) => {
    setPhoneNumber(phone);
    setCurrentScreen('login-otp');
  };

  const handleSignup = (data) => {
    setUserData(data);
    setPhoneNumber(data.phone);
    setCurrentScreen('signup-otp');
  };

  const handleOTPConfirm = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      setUserMode('emergency-contact');
      setCurrentScreen('ec-dashboard');
    }
  };

  const handleSignupOTPConfirm = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      setUserMode('emergency-contact');
      setCurrentScreen('ec-dashboard');
    }
  };


  const handleForgotPasswordSubmit = (phone) => {
    setPhoneNumber(phone);
    setCurrentScreen('forgot-otp');
  };


  const handleNavigate = (screen) => setCurrentScreen(screen);

  const handleSwitchToEmergencyContact = () => {
    setUserMode('emergency-contact');
    setCurrentScreen('ec-dashboard');
  };

  const handleSwitchToDriver = () => {
    setUserMode('driver');
    setCurrentScreen('dashboard');
  };

  const handleViewDriver = (driverId) => {
    setSelectedDriverId(driverId);
    setCurrentScreen('ec-driver-detail');
  };

  const handleLogout = () => {
    setLocationPermissionGranted(false);
    setUserMode(null);
    setCurrentScreen('login');
  };

  
  return (
    <View style={styles.container}>
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={() => setCurrentScreen('welcome')} />
      )}

      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentScreen('onboarding')} />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingFlow onComplete={() => setCurrentScreen('login')} />
      )}

      {/* AUTH */}
      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onForgotPassword={() => setCurrentScreen('forgot-password')}
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
          onConfirm={() => setCurrentScreen('new-password')}
          type="forgot"
          onBack={() => setCurrentScreen('forgot-password')}
        />
      )}

      {currentScreen === 'new-password' && (
        <NewPassword
          onSubmit={() => setCurrentScreen('login')}
          onBack={() => setCurrentScreen('forgot-otp')}
        />
      )}

      {/* DRIVER MODE */}
      {userMode === 'driver' && currentScreen === 'dashboard' && (
        <Dashboard
          onNavigate={handleNavigate}
          onSwitchToEmergencyContact={handleSwitchToEmergencyContact}
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
        <Menu
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onSwitchToEmergencyContact={handleSwitchToEmergencyContact}
        />
      )}

      {/* EMERGENCY CONTACT MODE */}
      {userMode === 'emergency-contact' && currentScreen === 'ec-dashboard' && (
        <EmergencyContactDashboard
          onNavigate={handleNavigate}
          onViewDriver={handleViewDriver}
        />
      )}

      {currentScreen === 'ec-notifications' && (
        <EmergencyContactNotifications onNavigate={handleNavigate} />
      )}

      {currentScreen === 'ec-settings' && (
        <EmergencyContactSettings
          onNavigate={handleNavigate}
          onSwitchToDriver={handleSwitchToDriver}
        />
      )}

      {currentScreen === 'ec-driver-detail' && (
        <DriverDetailView
          driverId={selectedDriverId}
          onBack={() => setCurrentScreen('ec-dashboard')}
        />
      )}

      {currentScreen === 'connected-accounts' && (
  <ConnectedAccountsScreen
    onNavigate={handleNavigate}
    isDarkMode={false} 
  />
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
