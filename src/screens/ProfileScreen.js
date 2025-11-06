// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useUser();

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing coming soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.replace('Welcome');
          }
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primary]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <Header 
        title="Profile"
        subtitle="Manage your account"
        rightElement={
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.editButton}>✏️</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={[COLORS.pink, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarContainer}
          >
            <Text style={styles.avatar}>{user.profilePic}</Text>
          </LinearGradient>

          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            {user.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeEmoji}>{badge}</Text>
              </View>
            ))}
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{user.followersCount}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{user.followingCount}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{user.postsCount}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>
        </View>

        {/* Points & Level Card */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.pink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pointsCard}
        >
          <View style={styles.pointsRow}>
            <View style={styles.pointsItem}>
              <Text style={styles.pointsEmoji}>⭐</Text>
              <View>
                <Text style={styles.pointsValue}>{user.points}</Text>
                <Text style={styles.pointsLabel}>Total Points</Text>
              </View>
            </View>
            <View style={styles.pointsDivider} />
            <View style={styles.pointsItem}>
              <Text style={styles.pointsEmoji}>🎯</Text>
              <View>
                <Text style={styles.pointsValue}>Level {user.level}</Text>
                <Text style={styles.pointsLabel}>Current Level</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            <AchievementCard
              emoji="🏆"
              title="Challenges Won"
              value={user.challengesWon}
            />
            <AchievementCard
              emoji="🎮"
              title="Games Won"
              value={user.gamesWon}
            />
            <AchievementCard
              emoji="📝"
              title="Posts Created"
              value={user.postsCount}
            />
            <AchievementCard
              emoji="💜"
              title="Favorite Group"
              value={user.favoriteGroup}
            />
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Rewards')}
          >
            <Text style={styles.menuEmoji}>🎁</Text>
            <Text style={styles.menuText}>Rewards Store</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuEmoji}>🔔</Text>
            <Text style={styles.menuText}>Notifications</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuEmoji}>🔒</Text>
            <Text style={styles.menuText}>Privacy</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuEmoji}>❓</Text>
            <Text style={styles.menuText}>Help & Support</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <Text style={styles.menuEmoji}>🚪</Text>
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.joinDate}>
          Member since {new Date(user.joinedDate).toLocaleDateString()}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const AchievementCard = ({ emoji, title, value }) => (
  <View style={styles.achievementCard}>
    <Text style={styles.achievementEmoji}>{emoji}</Text>
    <Text style={styles.achievementValue}>{value}</Text>
    <Text style={styles.achievementTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  editButton: {
    fontSize: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: COLORS.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  avatar: {
    fontSize: 48,
  },
  displayName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: COLORS.overlay20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: {
    fontSize: 24,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  pointsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsEmoji: {
    fontSize: 32,
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 2,
  },
  pointsLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  pointsDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.overlay20,
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    backgroundColor: COLORS.overlay20,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  achievementTitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.overlay10,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 20,
    color: COLORS.textMuted,
  },
  logoutItem: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    color: '#fecaca',
  },
  joinDate: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 20,
  },
});

export default ProfileScreen;