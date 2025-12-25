import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function LoginScreen({ onLogin, onForgotPassword, onSignup }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!phoneNumber.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneNumber.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onLogin(phoneNumber);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        {/* Spacer above title */}
        <View style={styles.spacer} />

        {/* Title */}
        <Text style={styles.title}>Log in to DRIVE</Text>
        <Text style={styles.description}>
          Welcome back! Please enter your details.
        </Text>

        {/* Phone Number */}
        <View style={styles.field}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.icon}>📱</Text>
            <TextInput
              placeholder="+63"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
            />
          </View>
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
        </View>

        {/* Password */}
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.icon}>🔒</Text>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        </View>

        {/* Login Button */}
        <Pressable style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>

        {/* Forgot Password */}
        <Pressable onPress={onForgotPassword}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </Pressable>

        {/* Signup */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don&apos;t have an account?{' '}
          </Text>
          <Pressable onPress={onSignup}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  content: {
    flex: 1,
  },
  spacer: {
    height: 120, // keeps space above the title
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  error: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: '#1E3A8A',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgot: {
    marginTop: 16,
    color: '#2563EB',
    fontSize: 14,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: 24,
  },
  signupText: {
    fontSize: 14,
    color: '#4B5563',
  },
  signupLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
});
