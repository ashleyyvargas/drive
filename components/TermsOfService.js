import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme';

export default function TermsOfService({ onBack, darkMode = false }) {
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: 'white' }]}>Terms of Service</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>1. Description of Service</Text>
        <Text style={[styles.text, { color: theme.textSecondary }]}>
          D.R.I.V.E. provides a driver assistance monitoring system designed to
          detect driver fatigue/drowsiness and hand presence on the steering
          wheel.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          2. Not a Substitute for Professional Safety
        </Text>
        <Text style={[styles.warning, { color: theme.danger }]}>
          CRITICAL WARNING: D.R.I.V.E. is a secondary safety aid and not an
          automated driving system.
        </Text>
        <Text style={[styles.bullet, { color: theme.textSecondary }]}>
          • The driver is solely responsible for safe vehicle operation.
        </Text>
        <Text style={[styles.bullet, { color: theme.textSecondary }]}>
          • The App may fail due to lighting, camera angles, or technical issues.
        </Text>
        <Text style={[styles.bullet, { color: theme.textSecondary }]}>
          • Never drive while impaired or excessively tired. Pull over safely if needed.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>3. User Responsibilities</Text>
        <Text style={[styles.bullet, { color: theme.textSecondary }]}>
          • Mount the device securely and do not obstruct your view or vehicle controls.
        </Text>
        <Text style={[styles.bullet, { color: theme.textSecondary }]}>
          • Comply with all local traffic laws regarding mobile device usage.
        </Text>
        <Text style={[styles.bullet, { color: theme.textSecondary }]}>
          • Keep the App updated for the latest safety improvements.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>4. Privacy & Data</Text>
        <Text style={[styles.text, { color: theme.textSecondary }]}>
          Your use of the App is governed by our Privacy Policy. The App requires
          continuous camera access, with visual processing performed locally on
          your device to protect your privacy.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>5. Limitation of Liability</Text>
        <Text style={[styles.bullet, { color: theme.textSecondary }]}>
          • D.R.I.V.E. and its developers are not liable for accidents, injuries, or fatalities.
        </Text>
        <Text style={[styles.bullet, { color: theme.textSecondary }]}>
          • No liability for traffic violations, fines, or damages.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>6. No Warranty</Text>
        <Text style={[styles.text, { color: theme.textSecondary }]}>
          The App is provided "AS IS" and "AS AVAILABLE" without warranties of any kind.
          Detection accuracy may be affected by lighting, sunglasses, or obstructions.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>7. Modifications to Terms</Text>
        <Text style={[styles.text, { color: theme.textSecondary }]}>
          We reserve the right to update these Terms at any time. Continued use of
          the App after changes constitutes acceptance of the updated Terms.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  text: { fontSize: 15, marginTop: 8, lineHeight: 22 },
  bullet: { fontSize: 15, marginTop: 8, lineHeight: 22 },
  warning: { fontSize: 15, marginTop: 8, fontWeight: 'bold', lineHeight: 22 },
});
