import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme'; 

export default function ForgotPassword({ onBack, onSubmit }) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setError('');
    Alert.alert('Success', `Phone number submitted: ${phoneNumber}`);
    onSubmit(phoneNumber);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Feather name="chevron-left" size={24} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Forgot Password</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <View style={[styles.circleBackground, { backgroundColor: theme.card }]}>
            <MaterialIcons name="password" size={48} color={theme.primary} />
          </View>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>Forgot Password?</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Enter your phone number to reset your password.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Text style={[styles.label, { color: theme.text }]}>Phone Number</Text>
            <View style={[styles.inputContainer, { borderColor: theme.divider }]}>
              <Feather name="phone" size={20} color={theme.text} style={{ marginRight: 8 }} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="+63"
                placeholderTextColor={theme.subText}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
            {error ? <Text style={[styles.error, { color: theme.danger }]}>{error}</Text> : null}
          </View>

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
            <Text style={[styles.submitButtonText, { color: theme.card }]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  circleBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMark: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  prefix: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
