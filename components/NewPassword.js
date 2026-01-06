import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme'; 

export default function NewPassword({ onSubmit, onBack }) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });

  const validateForm = () => {
    const newErrors = { password: '', confirmPassword: '' };

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = () => {
    if (validateForm()) onSubmit();
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="chevron-back" size={24} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>New Password</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>New Password</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>Enter your new password</Text>

        {/* Password */}
        <View style={[styles.inputContainer, { borderColor: theme.divider }]}>
          <Ionicons name="lock-closed" size={20} color={theme.subText} style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.subText}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { color: theme.text }]}
          />
        </View>
        {errors.password ? <Text style={[styles.errorText, { color: theme.danger }]}>{errors.password}</Text> : null}

        {/* Confirm Password */}
        <View style={[styles.inputContainer, { borderColor: theme.divider }]}>
          <Ionicons name="lock-closed" size={20} color={theme.subText} style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={theme.subText}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[styles.input, { color: theme.text }]}
          />
        </View>
        {errors.confirmPassword ? (
          <Text style={[styles.errorText, { color: theme.danger }]}>{errors.confirmPassword}</Text>
        ) : null}

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: theme.primary },
            (!password || !confirmPassword || password !== confirmPassword) && { opacity: 0.5 },
          ]}
          disabled={!password || !confirmPassword || password !== confirmPassword}
          onPress={handleSubmit}
        >
          <Text style={[styles.submitText, { color: theme.card }]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backText: { marginLeft: 8, fontSize: 16, fontWeight: '500' },
  content: { flex: 1 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 16 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16 },
  errorText: { fontSize: 12, marginBottom: 8 },
  submitButton: {
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitText: { fontSize: 16, fontWeight: '600' },
});
