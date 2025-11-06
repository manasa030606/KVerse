// src/screens/AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { useUser } from '../context/UserContext';
import Button from '../components/Button';

const AuthScreen = ({ navigation, route }) => {
  const { login, register } = useUser();
  const initialMode = route.params?.mode || 'login';
  
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (mode === 'register') {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (mode === 'register') {
        const result = register(formData.username, formData.email, formData.password);
        if (result.success) {
          navigation.replace('Main');
        }
      } else {
        const result = login(formData.email, formData.password);
        if (result.success) {
          navigation.replace('Main');
        }
      }
      setLoading(false);
    }, 1000);
  };

  const handleGoogleAuth = () => {
    Alert.alert('Coming Soon', 'Google OAuth will be available soon!');
  };

  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primary]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[COLORS.primaryLight, COLORS.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Text style={styles.logoText}>K</Text>
          </LinearGradient>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {mode === 'login' ? 'Welcome Back!' : 'Join KVerse'}
        </Text>
        <Text style={styles.subtitle}>
          {mode === 'login' 
            ? 'Login to continue your KPOP journey' 
            : 'Create your account and start exploring'}
        </Text>

        {/* Form */}
        <View style={styles.form}>
          {mode === 'register' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Choose a username"
                placeholderTextColor={COLORS.textMuted}
                value={formData.username}
                onChangeText={(text) => setFormData({...formData, username: text})}
                autoCapitalize="none"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              placeholderTextColor={COLORS.textMuted}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.textMuted}
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              secureTextEntry
            />
          </View>

          {mode === 'register' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor={COLORS.textMuted}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                secureTextEntry
              />
            </View>
          )}

          {mode === 'login' && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <Button
            title={mode === 'login' ? 'Login' : 'Create Account'}
            onPress={handleSubmit}
            variant="primary"
            size="large"
            loading={loading}
            style={styles.submitButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Continue with Google"
            onPress={handleGoogleAuth}
            variant="secondary"
            size="large"
            icon="🔍"
          />

          <TouchableOpacity 
            style={styles.switchMode}
            onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            <Text style={styles.switchModeText}>
              {mode === 'login' 
                ? "Don't have an account? " 
                : 'Already have an account? '}
              <Text style={styles.switchModeLink}>
                {mode === 'login' ? 'Register' : 'Login'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.overlay20,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.overlay10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLORS.pinkLight,
    fontWeight: '600',
  },
  submitButton: {
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.overlay20,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  switchMode: {
    marginTop: 24,
    alignItems: 'center',
  },
  switchModeText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  switchModeLink: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default AuthScreen;