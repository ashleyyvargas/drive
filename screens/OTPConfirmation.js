import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';

const OTP_EXPIRY_TIME = 10; // seconds

export default function OTPConfirmation({
  phoneNumber,
  onConfirm,
  onResend,
  onBack,
}) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(OTP_EXPIRY_TIME);
  const [isResending, setIsResending] = useState(false);
  const [otpActive, setOtpActive] = useState(true);
  const inputsRef = useRef([]);

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
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
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
      return true;
    } catch (err) {
      Alert.alert('Error', 'Failed to request location permission');
      return false;
    }
  };

  /* ================= CONFIRM ================= */
  const handleSubmit = async () => {
  if (isExpired) {
    setError('OTP expired. Please resend the code.');
    return;
  }

  if (otp.every(d => d !== '')) {
    // Wait for async onConfirm
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
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <Image
              source={require('../assets/otp-clock.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Almost there!</Text>
        <Text style={styles.subtitle}>
          Enter the verification code sent to {phoneNumber}
        </Text>

        {/* Timer */}
        <Text style={[styles.timer, isExpired && styles.expired]}>
          {isExpired
            ? 'Code expired'
            : `Code expires in ${formatTime(otpTimer)}`}
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputsRef.current[index] = ref)}
              style={[styles.otpInput, isExpired && styles.disabledInput]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              editable={!isExpired}
              onChangeText={value => handleChange(index, value)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(index, nativeEvent.key)
              }
            />
          ))}
        </View>

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        {/* Continue */}
        <Pressable
          style={[
            styles.primaryButton,
            (isExpired || !otp.every(d => d !== '')) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={isExpired || !otp.every(d => d !== '')}
        >
          <Text style={styles.primaryText}>Continue</Text>
        </Pressable>

        {/* Resend */}
        <Pressable
          style={[
            styles.outlineButton,
            (!isExpired || isResending) && styles.disabledButton,
          ]}
          onPress={handleResend}
          disabled={!isExpired || isResending}
        >
          <Text style={styles.outlineText}>
            {isResending ? 'Sending...' : 'Resend Code'}
          </Text>
        </Pressable>

        {/* Back */}
        {onBack && (
          <Pressable style={styles.backButton} onPress={onBack}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32 },
  content: { flex: 1 },
  iconWrapper: { alignItems: 'center', marginVertical: 40 },
  iconCircle: { width: 200, height: 200, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  iconImage: { width: 200, height: 200, tintColor: '#1E3A8A' },
  title: { fontSize: 24, fontWeight: '600', color: '#111827', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 8, textAlign: 'center', paddingHorizontal: 16 },
  timer: { textAlign: 'center', fontSize: 14, color: '#1E3A8A', marginBottom: 24 },
  expired: { color: '#DC2626' },
  otpRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  otpInput: { width: 56, height: 56, borderWidth: 2, borderColor: '#D1D5DB', borderRadius: 8, textAlign: 'center', fontSize: 22, marginHorizontal: 6, backgroundColor: '#F9FAFB' },
  disabledInput: { backgroundColor: '#E5E7EB' },
  error: { color: '#DC2626', fontSize: 14, marginBottom: 12, textAlign: 'center' },
  primaryButton: { height: 48, backgroundColor: '#1E3A8A', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  disabledButton: { opacity: 0.5 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  outlineButton: { height: 48, borderWidth: 1, borderColor: '#1E3A8A', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  outlineText: { color: '#1E3A8A', fontSize: 16, fontWeight: '500' },
  backButton: { height: 48, borderWidth: 1, borderColor: '#111827', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 16, color: '#111827' },
});
