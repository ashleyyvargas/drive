import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../components/theme';

export default function SignupScreen({ onSignup, onBackToLogin }) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (phoneNumber.length < 10) newErrors.phoneNumber = 'Enter a valid phone number';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!agreedToTerms) newErrors.terms = 'You must agree to terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSignup({ firstName, lastName, phone: phoneNumber, password });
    }
  };


  if (showTerms) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Pressable style={styles.backButton} onPress={() => setShowTerms(false)}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
          <Text style={[styles.backText, { color: theme.text }]}>Back</Text>
        </Pressable>

        <Text style={[styles.title, { color: theme.text }]}>Terms and Conditions</Text>
        <ScrollView style={styles.termsContainer}>
          {[
            { title: '1. Acceptance of Terms', text: 'By using DRIVE, you agree to these Terms.' },
            { title: '2. Use of Service', text: 'The app monitors driver drowsiness and provides alerts.' },
            { title: '3. Data Collection', text: 'We collect driver data during drowsiness events.' },
            { title: '4. Privacy', text: 'Data is stored securely and shared only as required by law.' },
            { title: '5. Liability', text: 'Users remain responsible for safe driving.' },
            { title: '6. Emergency Contacts', text: 'App may contact emergency contacts in critical events.' },
            { title: '7. Updates', text: 'Terms may change at any time. Continued use = acceptance.' },
          ].map((section, idx) => (
            <View key={idx} style={{ marginTop: idx === 0 ? 0 : 12 }}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
              <Text style={[styles.paragraph, { color: theme.subText }]}>{section.text}</Text>
            </View>
          ))}
        </ScrollView>

        <Pressable style={[styles.primaryButton, { backgroundColor: theme.primary }]} onPress={() => setShowTerms(false)}>
          <Text style={[styles.primaryText, { color: theme.card }]}>Close</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Pressable onPress={onBackToLogin} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Back to Login</Text>
      </Pressable>

      <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
      <Text style={[styles.subtitle, { color: theme.subText }]}>Sign up to start using DRIVE</Text>

      {renderInput('First Name', firstName, setFirstName, theme)}
      {errors.firstName && <Text style={[styles.error, { color: theme.danger }]}>{errors.firstName}</Text>}

      {renderInput('Last Name', lastName, setLastName, theme)}
      {errors.lastName && <Text style={[styles.error, { color: theme.danger }]}>{errors.lastName}</Text>}

      {renderInput('Phone Number', phoneNumber, setPhoneNumber, theme, 'phone-pad')}
      {errors.phoneNumber && <Text style={[styles.error, { color: theme.danger }]}>{errors.phoneNumber}</Text>}

      {renderInput('Password', password, setPassword, theme, 'default', true)}
      {errors.password && <Text style={[styles.error, { color: theme.danger }]}>{errors.password}</Text>}

      {renderInput('Confirm Password', confirmPassword, setConfirmPassword, theme, 'default', true)}
      {errors.confirmPassword && <Text style={[styles.error, { color: theme.danger }]}>{errors.confirmPassword}</Text>}

      <Pressable style={styles.termsRow} onPress={() => setAgreedToTerms(!agreedToTerms)}>
        <Text style={[styles.checkbox, { color: theme.text }]}>{agreedToTerms ? '☑' : '☐'}</Text>
        <Text style={[styles.termsText, { color: theme.subText }]}>
          I agree to{' '}
          <Text style={[styles.link, { color: theme.primary }]} onPress={() => setShowTerms(true)}>
            Terms and Conditions
          </Text>
        </Text>
      </Pressable>
      {errors.terms && <Text style={[styles.error, { color: theme.danger }]}>{errors.terms}</Text>}

      <Pressable
        style={[
          styles.primaryButton,
          { backgroundColor: theme.primary },
          !agreedToTerms && styles.disabledButton,
        ]}
        disabled={!agreedToTerms}
        onPress={handleSubmit}
      >
        <Text style={[styles.primaryText, { color: theme.card }]}>Sign Up</Text>
      </Pressable>

      <Pressable style={[styles.googleButton, { borderColor: theme.divider }]} onPress={() => onSignup({ firstName: 'Google', lastName: 'User', phone: 'google', password: '' })}>
        <Image
          source={{ uri: 'https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/google-color.png' }}
          style={{ width: 18, height: 18, marginRight: 10 }}
        />
        <Text style={[styles.googleText, { color: theme.text }]}>Continue with Google</Text>
      </Pressable>
    </ScrollView>
  );
}

function renderInput(label, value, onChange, theme, keyboardType = 'default', secure = false) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 14, marginBottom: 6, color: theme.text }}>{label}</Text>
      <TextInput
        style={{
          height: 48,
          borderWidth: 1,
          borderColor: theme.divider,
          borderRadius: 8,
          paddingHorizontal: 12,
          color: theme.text,
        }}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { fontSize: 16, marginLeft: 8 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  error: { fontSize: 12, marginBottom: 8 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 12 },
  checkbox: { fontSize: 18, marginRight: 8 },
  termsText: { fontSize: 14, flex: 1 },
  link: { fontWeight: '500' },
  primaryButton: { height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  disabledButton: { opacity: 0.5 },
  primaryText: { fontSize: 16, fontWeight: '600' },
  termsContainer: { flex: 1, marginVertical: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  paragraph: { fontSize: 14, marginTop: 4 },
  googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 8, height: 48, marginTop: 12 },
  googleText: { fontSize: 16 },
});
