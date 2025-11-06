// src/navigation/AppNavigator.js
import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { useUser } from '../context/UserContext';

// Import Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import FeedScreen from '../screens/FeedScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import GamesScreen from '../screens/GamesScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RewardsScreen from '../screens/RewardsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Icon Component
const TabIcon = ({ emoji, label, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      {focused ? (
        <LinearGradient
          colors={[COLORS.pink, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tabIconActive}
        >
          <Text style={styles.tabEmoji}>{emoji}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.tabIconInactive}>
          <Text style={[styles.tabEmoji, styles.tabEmojiInactive]}>{emoji}</Text>
        </View>
      )}
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
    </View>
  );
};

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.pink,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" label="Feed" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏆" label="Challenges" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🎮" label="Games" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="📊" label="Ranking" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👤" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { isAuthenticated } = useUser();

  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen 
              name="Auth" 
              component={AuthScreen}
            />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen 
              name="Rewards" 
              component={RewardsScreen}
            />
          </>
        )}
      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.primaryDark,
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: COLORS.pink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  tabIconInactive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tabEmoji: {
    fontSize: 24,
  },
  tabEmojiInactive: {
    opacity: 0.5,
  },
  tabLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default AppNavigator;