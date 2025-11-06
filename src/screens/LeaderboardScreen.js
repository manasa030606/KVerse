// src/screens/LeaderboardScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import LeaderboardItem from '../components/LeaderboardItem';

const LeaderboardScreen = ({ navigation }) => {
  const { user } = useUser();
  const [scope, setScope] = useState('global');

  // Mock leaderboard data
  const leaderboardData = [
    { id: 1, username: 'kpop_legend', displayName: 'Jessica', profilePic: '👑', points: 5420, level: 10 },
    { id: 2, username: 'army_forever', displayName: 'Michael', profilePic: '💜', points: 4850, level: 9 },
    { id: 3, username: 'blink_queen', displayName: 'Sophie', profilePic: '👸', points: 4320, level: 9 },
    { id: 4, username: 'dance_king', displayName: 'David', profilePic: '🕺', points: 3890, level: 8 },
    { id: 5, username: 'melody_maker', displayName: 'Emma', profilePic: '🎤', points: 3540, level: 8 },
    { id: 6, username: 'fan_art_pro', displayName: 'Oliver', profilePic: '🎨', points: 3210, level: 7 },
    { id: 7, username: 'challenge_master', displayName: 'Ava', profilePic: '🏆', points: 2980, level: 7 },
    { id: 8, username: 'lyrics_expert', displayName: 'Noah', profilePic: '📝', points: 2750, level: 6 },
    { id: 9, username: 'twice_fan', displayName: 'Mia', profilePic: '🌟', points: 2340, level: 6 },
    { id: 10, username: 'game_champion', displayName: 'Lucas', profilePic: '🎮', points: 2100, level: 6 },
    { id: 11, username: user.username, displayName: user.displayName, profilePic: user.profilePic, points: user.points, level: user.level },
  ];

  const currentUserRank = leaderboardData.findIndex(u => u.id === user.id || u.username === user.username) + 1;

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Scope Selector */}
      <View style={styles.scopeSelector}>
        <TouchableOpacity
          onPress={() => setScope('global')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              scope === 'global'
                ? [COLORS.pink, COLORS.primary]
                : [COLORS.overlay20, COLORS.overlay20]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scopeButton}
          >
            <Text style={styles.scopeText}>🌍 Global</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setScope('group')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              scope === 'group'
                ? [COLORS.pink, COLORS.primary]
                : [COLORS.overlay20, COLORS.overlay20]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scopeButton}
          >
            <Text style={styles.scopeText}>👥 {user.favoriteGroup}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Top 3 Podium */}
      <View style={styles.podiumContainer}>
        {/* 2nd Place */}
        <View style={styles.podiumItem}>
          <LinearGradient
            colors={['#d1d5db', '#9ca3af']}
            style={styles.podiumAvatar}
          >
            <Text style={styles.podiumAvatarText}>
              {leaderboardData[1]?.profilePic}
            </Text>
          </LinearGradient>
          <View style={[styles.podiumBar, styles.podium2nd]}>
            <Text style={styles.podiumRank}>🥈</Text>
          </View>
          <Text style={styles.podiumName} numberOfLines={1}>
            {leaderboardData[1]?.displayName}
          </Text>
          <Text style={styles.podiumPoints}>
            {leaderboardData[1]?.points.toLocaleString()}
          </Text>
        </View>

        {/* 1st Place */}
        <View style={styles.podiumItem}>
          <LinearGradient
            colors={['#fbbf24', '#f59e0b']}
            style={[styles.podiumAvatar, styles.firstPlaceAvatar]}
          >
            <Text style={styles.podiumAvatarText}>
              {leaderboardData[0]?.profilePic}
            </Text>
          </LinearGradient>
          <View style={[styles.podiumBar, styles.podium1st]}>
            <Text style={styles.podiumRank}>🥇</Text>
          </View>
          <Text style={styles.podiumName} numberOfLines={1}>
            {leaderboardData[0]?.displayName}
          </Text>
          <Text style={styles.podiumPoints}>
            {leaderboardData[0]?.points.toLocaleString()}
          </Text>
        </View>

        {/* 3rd Place */}
        <View style={styles.podiumItem}>
          <LinearGradient
            colors={['#f97316', '#ea580c']}
            style={styles.podiumAvatar}
          >
            <Text style={styles.podiumAvatarText}>
              {leaderboardData[2]?.profilePic}
            </Text>
          </LinearGradient>
          <View style={[styles.podiumBar, styles.podium3rd]}>
            <Text style={styles.podiumRank}>🥉</Text>
          </View>
          <Text style={styles.podiumName} numberOfLines={1}>
            {leaderboardData[2]?.displayName}
          </Text>
          <Text style={styles.podiumPoints}>
            {leaderboardData[2]?.points.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Current User Rank */}
      <LinearGradient
        colors={[COLORS.pink, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.userRankCard}
      >
        <Text style={styles.userRankLabel}>Your Rank</Text>
        <Text style={styles.userRankValue}>#{currentUserRank}</Text>
        <Text style={styles.userRankPoints}>{user.points} points</Text>
      </LinearGradient>

      <Text style={styles.sectionTitle}>All Rankings</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primary]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <Header 
        title="Leaderboard"
        subtitle="Compete with the best! 🏆"
      />

      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <LeaderboardItem
            user={item}
            rank={index + 1}
            isCurrentUser={item.username === user.username}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  headerContent: {
    marginBottom: 20,
  },
  scopeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  scopeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  scopeText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 24,
    height: 200,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  podiumAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  firstPlaceAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  podiumAvatarText: {
    fontSize: 28,
  },
  podiumBar: {
    width: '100%',
    backgroundColor: COLORS.overlay20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 8,
  },
  podium1st: {
    height: 120,
    backgroundColor: '#fbbf24',
  },
  podium2nd: {
    height: 90,
    backgroundColor: '#d1d5db',
  },
  podium3rd: {
    height: 70,
    backgroundColor: '#f97316',
  },
  podiumRank: {
    fontSize: 32,
  },
  podiumName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 2,
  },
  podiumPoints: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  userRankCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  userRankLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  userRankValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  userRankPoints: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
});

export default LeaderboardScreen;