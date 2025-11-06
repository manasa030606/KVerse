// src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';

const Header = ({ 
  title, 
  subtitle, 
  showBack = false, 
  onBack, 
  rightElement 
}) => {
  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity 
              onPress={onBack}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
        </View>
        
        {rightElement && (
          <View style={styles.rightSection}>
            {rightElement}
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.overlay10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.white,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
  },
  rightSection: {
    marginLeft: 12,
  },
});

export default Header;