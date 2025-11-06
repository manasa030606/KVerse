// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/colors';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  icon,
  disabled = false,
  loading = false,
  style 
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary];
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'outline':
        return [...baseStyle, styles.outline];
      case 'ghost':
        return [...baseStyle, styles.ghost];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'secondary') {
      return [...baseStyle, styles.secondaryText];
    }
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? COLORS.primary : COLORS.white} />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  
  // Variants
  primary: {
    backgroundColor: COLORS.pink,
  },
  secondary: {
    backgroundColor: COLORS.white,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  ghost: {
    backgroundColor: COLORS.overlay20,
  },
  
  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  
  // Text styles
  text: {
    color: COLORS.white,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  secondaryText: {
    color: COLORS.primaryDark,
  },
  
  icon: {
    marginRight: 8,
    fontSize: 18,
  },
  
  disabled: {
    opacity: 0.5,
  },
});

export default Button;