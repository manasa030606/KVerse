// src/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import Button from '../components/Button';

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primary, COLORS.pink]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[COLORS.primaryLight, COLORS.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            <Text style={styles.logoText}>K</Text>
          </LinearGradient>
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.appName}>KVerse</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Your KPOP world of blogs,
          {'\n'}games & fandom love!
        </Text>

        {/* Features */}
        <View style={styles.features}>
          <FeatureItem emoji="📝" text="Share your fandom stories" />
          <FeatureItem emoji="🎮" text="Play exciting mini-games" />
          <FeatureItem emoji="🏆" text="Join challenges & win prizes" />
          <FeatureItem emoji="👥" text="Connect with fellow fans" />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          title="Join"
          onPress={() => navigation.navigate('Auth', { mode: 'register' })}
          variant="primary"
          size="large"
          style={styles.button}
        />
        
        <Button
          title="Login"
          onPress={() => navigation.navigate('Auth', { mode: 'login' })}
          variant="secondary"
          size="large"
          style={styles.button}
        />

        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text 
            style={styles.registerLink}
            onPress={() => navigation.navigate('Auth', { mode: 'register' })}
          >
            Register
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const FeatureItem = ({ emoji, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureEmoji}>{emoji}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  title: {
    fontSize: 28,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
  },
  features: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.overlay10,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: '500',
  },
  actions: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
  },
  registerLink: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;