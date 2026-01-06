import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  ScrollView, 
  Image, 
  useColorScheme 
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../components/theme';

export default function LoginScreen({ onLogin, onForgotPassword, onSignup }) {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!phoneNumber.trim()) newErrors.phone = 'Phone number is required';
    else if (phoneNumber.length < 10) newErrors.phone = 'Please enter a valid phone number';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) onLogin(phoneNumber);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.spacer} />

      <Text style={[styles.title, { color: theme.text }]}>Log in to DRIVE</Text>
      <Text style={[styles.description, { color: theme.subText }]}>
        Welcome back! Please enter your details.
      </Text>

      {/* Phone */}
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.text }]}>Phone Number</Text>
        <View style={[styles.inputWrapper, { borderColor: theme.divider }]}>
          <Feather name="phone" size={18} color={theme.subText} style={styles.icon} />
          <TextInput
            placeholder="+63"
            placeholderTextColor={theme.navInactive}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={[styles.input, { color: theme.text }]}
          />
        </View>
        {errors.phone && <Text style={[styles.error, { color: theme.danger }]}>{errors.phone}</Text>}
      </View>

      {/* Password */}
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.text }]}>Password</Text>
        <View style={[styles.inputWrapper, { borderColor: theme.divider }]}>
          <Feather name="lock" size={18} color={theme.subText} style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.navInactive}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { color: theme.text }]}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={18}
              color={theme.subText}
            />
          </Pressable>
        </View>
        {errors.password && <Text style={[styles.error, { color: theme.danger }]}>{errors.password}</Text>}
      </View>

      {/* Login Button */}
      <Pressable style={[styles.loginButton, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
        <Text style={[styles.loginText, { color: theme.card }]}>Log In</Text>
      </Pressable>

      <Text style={[styles.orText, { color: theme.subText }]}>or</Text>

      {/* Google */}
      <Pressable style={[styles.googleButton, { borderColor: theme.divider }]} onPress={() => onLogin('google')}>
        <Image
          source={{ uri: 'https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/google-color.png' }}
          style={{ width: 18, height: 18, marginRight: 10 }}
        />
        <Text style={[styles.googleText, { color: theme.text }]}>Continue with Google</Text>
      </Pressable>

      {/* Forgot Password */}
      <Pressable onPress={onForgotPassword}>
        <Text style={[styles.forgot, { color: theme.primary }]}>Forgot password?</Text>
      </Pressable>

      {/* Signup */}
      <View style={styles.signupContainer}>
        <Text style={[styles.signupText, { color: theme.subText }]}>Don't have an account? </Text>
        <Pressable onPress={onSignup}>
          <Text style={[styles.signupLink, { color: theme.primary }]}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    flexGrow: 1,
  },
  spacer: { height: 80 },
  title: { fontSize: 32, fontWeight: '600', textAlign: 'center', marginBottom: 6 },
  description: { fontSize: 14, textAlign: 'center', marginBottom: 24 },
  field: { marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  icon: { fontSize: 18, marginRight: 8 },
  input: { flex: 1, fontSize: 16 },
  error: { fontSize: 12, marginTop: 4 },
  loginButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  loginText: { fontSize: 16, fontWeight: '600' },
  orText: { textAlign: 'center', marginVertical: 12, fontSize: 16 },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    marginTop: 12,
  },
  googleText: { fontSize: 16 },
  forgot: { marginTop: 16, fontSize: 14, textAlign: 'center' },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  signupText: { fontSize: 14 },
  signupLink: { fontSize: 14, fontWeight: '500' },
  bottomSpacer: { height: 40 },
});
