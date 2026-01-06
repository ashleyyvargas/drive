import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  useColorScheme,
} from 'react-native';
import * as Location from 'expo-location';
import { lightTheme, darkTheme, SPACING, RADIUS } from '../components/theme';

const OTP_EXPIRY_TIME = 10; // seconds

export default function OTPConfirmation({ phoneNumber, onConfirm, onResend, onBack }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(OTP_EXPIRY_TIME);
  const [isResending, setIsResending] = useState(false);
  const [otpActive, setOtpActive] = useState(true);
  const inputsRef = useRef([]);

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    if (otpTimer === 0) {
      setOtpActive(false);
      return;
    }
    const interval = setInterval(() => {
      setOtpTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const isExpired = otpTimer === 0 && !otpActive;

  const formatTime = seconds => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value) || isExpired) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < 3) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (isExpired) {
      setError('OTP expired. Please resend the code.');
      return;
    }

    if (otp.every(d => d !== '')) {
      if (onConfirm) await onConfirm(otp.join(''));
    } else {
      setError('Please enter a valid OTP');
    }
  };

  const handleResend = async () => {
    if (!isExpired || isResending) return;
    try {
      setIsResending(true);
      setError('');
      setOtp(['', '', '', '']);
      if (onResend) await Promise.resolve(onResend());
      setOtpActive(true);
      setOtpTimer(OTP_EXPIRY_TIME);
      inputsRef.current[0]?.focus();
    } catch {
      setError('Failed to resend code. Try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* OTP Icon */}
        <View style={styles.iconWrapper}>
          <View style={[styles.iconCircle]}>
            <Image
              source={require('../assets/otp-clock.png')}
              style={[styles.iconImage, { tintColor: theme.primary }]}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={[styles.title, { color: theme.textPrimary }]}>Almost there!</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Enter the verification code sent to {phoneNumber}
        </Text>

        <Text style={[styles.timer, isExpired ? { color: theme.danger } : { color: theme.primary }]}>
          {isExpired ? 'Code expired' : `Code expires in ${formatTime(otpTimer)}`}
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputsRef.current[index] = ref)}
              style={[
                styles.otpInput,
                { backgroundColor: theme.card, borderColor: theme.divider },
                isExpired && { backgroundColor: theme.surface },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              editable={!isExpired}
              onChangeText={value => handleChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
            />
          ))}
        </View>

        {error !== '' && <Text style={[styles.error, { color: theme.danger }]}>{error}</Text>}

        {/* Buttons */}
        <Pressable
          style={[
            styles.primaryButton,
            { backgroundColor: theme.primary },
            (isExpired || !otp.every(d => d !== '')) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={isExpired || !otp.every(d => d !== '')}
        >
          <Text style={[styles.primaryText, { color: '#fff' }]}>Continue</Text>
        </Pressable>

        <Pressable
          style={[
            styles.outlineButton,
            { borderColor: theme.primary },
            (!isExpired || isResending) && styles.disabledButton,
          ]}
          onPress={handleResend}
          disabled={!isExpired || isResending}
        >
          <Text style={[styles.outlineText, { color: theme.primary }]}>
            {isResending ? 'Sending...' : 'Resend Code'}
          </Text>
        </Pressable>

        {onBack && (
          <Pressable style={[styles.backButton, { borderColor: theme.textPrimary }]} onPress={onBack}>
            <Text style={[styles.backText, { color: theme.textPrimary }]}>← Back</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.l, paddingTop: SPACING.l * 1.5, paddingBottom: SPACING.l },
  content: { flex: 1 },
  iconWrapper: { alignItems: 'center', marginVertical: SPACING.l * 2 },
  iconCircle: { width: 200, height: 200, borderRadius: RADIUS.l, alignItems: 'center', justifyContent: 'center' },
  iconImage: { width: 150, height: 150 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: SPACING.s, textAlign: 'center' },
  subtitle: { fontSize: 14, marginBottom: SPACING.s, textAlign: 'center', paddingHorizontal: SPACING.m },
  timer: { textAlign: 'center', fontSize: 14, marginBottom: SPACING.l },
  otpRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: SPACING.l },
  otpInput: { width: 56, height: 56, borderWidth: 2, borderRadius: RADIUS.m, textAlign: 'center', fontSize: 22, marginHorizontal: SPACING.s },
  error: { fontSize: 14, marginBottom: SPACING.m, textAlign: 'center' },
  primaryButton: { height: 48, borderRadius: RADIUS.m, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.s },
  disabledButton: { opacity: 0.5 },
  primaryText: { fontSize: 16, fontWeight: '600' },
  outlineButton: { height: 48, borderWidth: 1, borderRadius: RADIUS.m, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.s },
  outlineText: { fontSize: 16, fontWeight: '500' },
  backButton: { height: 48, borderWidth: 1, borderRadius: RADIUS.m, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 16 },
});
