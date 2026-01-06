import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { lightTheme, darkTheme } from './theme';

export default function AccountSettings({
  onBack,
  userName = 'John Doe',
  userPhone = '+63 912 345 6789',
  darkMode = false,
}) {
  const theme = darkMode ? darkTheme : lightTheme;

  const [firstName, setFirstName] = useState(userName.split(' ')[0]);
  const [lastName, setLastName] = useState(userName.split(' ')[1] || '');
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSave = () => setEditing(false);

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      setChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) setProfilePhoto(result.assets[0].uri);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderColor: theme.divider }]}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={28} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Account Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Profile */}
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={pickImage}
            style={[styles.avatar, { backgroundColor: theme.primary }]}
          >
            {profilePhoto ? (
              <Image
                source={{ uri: profilePhoto }}
                style={{ width: 96, height: 96, borderRadius: 48 }}
              />
            ) : (
              <Ionicons name="person" size={44} color={theme.background} />
            )}
          </TouchableOpacity>
          <Text
            style={[styles.changePhotoText, { color: theme.primary }]}
            onPress={pickImage}
          >
            Change Photo
          </Text>
        </View>

        {/* Profile Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Profile Information
          </Text>

          <Text style={[styles.label, { color: theme.textSecondary }]}>First Name</Text>
          <TextInput
            style={[
              styles.input,
              !editing && styles.disabledInput,
              {
                borderColor: theme.divider,
                backgroundColor: editing ? theme.surface : theme.surface,
                color: theme.textPrimary,
              },
            ]}
            value={firstName}
            editable={editing}
            onChangeText={setFirstName}
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Last Name</Text>
          <TextInput
            style={[
              styles.input,
              !editing && styles.disabledInput,
              {
                borderColor: theme.divider,
                backgroundColor: editing ? theme.surface : theme.surface,
                color: theme.textPrimary,
              },
            ]}
            value={lastName}
            editable={editing}
            onChangeText={setLastName}
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Phone Number</Text>
          <TextInput
            style={[
              styles.input,
              styles.disabledInput,
              { borderColor: theme.divider, backgroundColor: theme.surface, color: theme.textPrimary },
            ]}
            value={userPhone}
            editable={false}
          />
          <Text style={[styles.note, { color: theme.textSecondary }]}>
            Phone number cannot be changed
          </Text>

          {!editing ? (
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: theme.primary }]}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.primaryButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                style={[styles.outlineButton, { borderColor: theme.divider }]}
                onPress={() => setEditing(false)}
              >
                <Text style={[styles.outlineButtonText, { color: theme.textPrimary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: theme.primary }]}
                onPress={handleSave}
              >
                <Text style={styles.primaryButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Security</Text>

          {!changingPassword ? (
            <TouchableOpacity
              style={[styles.outlineButton, { borderColor: theme.divider }]}
              onPress={() => setChangingPassword(true)}
            >
              <Text style={[styles.outlineButtonText, { color: theme.primary }]}>
                Change Password
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Current Password</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.divider, backgroundColor: theme.surface, color: theme.textPrimary }]}
                secureTextEntry
                placeholder="Enter current password"
                placeholderTextColor={theme.textSecondary}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />

              <Text style={[styles.label, { color: theme.textSecondary }]}>New Password</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.divider, backgroundColor: theme.surface, color: theme.textPrimary }]}
                secureTextEntry
                placeholder="Enter new password"
                placeholderTextColor={theme.textSecondary}
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <Text style={[styles.label, { color: theme.textSecondary }]}>Confirm New Password</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.divider, backgroundColor: theme.surface, color: theme.textPrimary }]}
                secureTextEntry
                placeholder="Confirm new password"
                placeholderTextColor={theme.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity
                  style={[styles.outlineButton, { borderColor: theme.divider }]}
                  onPress={() => {
                    setChangingPassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                >
                  <Text style={[styles.outlineButtonText, { color: theme.textPrimary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundColor: theme.primary }]}
                  onPress={handleChangePassword}
                >
                  <Text style={styles.primaryButtonText}>Update Password</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 12,
  },

  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  changePhotoText: { fontSize: 14 },

  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  label: { fontSize: 13, marginBottom: 4 },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  disabledInput: { opacity: 0.6 },
  note: { fontSize: 12, marginBottom: 12 },

  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: { color: 'white', fontWeight: '600' },

  outlineButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: { fontWeight: '500' },
});
