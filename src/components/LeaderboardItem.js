// src/components/LeaderboardItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';

const LeaderboardItem = ({ user, rank, isCurrentUser = false }) => {
  const getRankEmoji = () => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  const getRankStyle = () => {
    if (rank <= 3) {
      return styles.topRank;
    }
    return styles.normalRank;
  };

  return (
    <View style={[styles.container, isCurrentUser && styles.currentUserContainer]}>
      {isCurrentUser ? (
        <LinearGradient
          colors={[COLORS.pink, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.content}
        >
          {renderContent()}
        </LinearGradient>
      ) : (
        <View style={styles.content}>
          {renderContent()}
        </View>
      )}
    </View>
  );

  function renderContent() {
    return (
      <>
        {/* Rank */}
        <View style={[styles.rankContainer, getRankStyle()]}>
          {getRankEmoji() ? (
            <Text style={styles.rankEmoji}>{getRankEmoji()}</Text>
          ) : (
            <Text style={[styles.rankText, isCurrentUser && styles.currentUserText]}>
              #{rank}
            </Text>
          )}
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{user.profilePic || '👤'}</Text>
          </LinearGradient>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text 
            style={[styles.username, isCurrentUser && styles.currentUserText]}
            numberOfLines={1}
          >
            {user.displayName}
          </Text>
          <Text 
            style={[styles.handle, isCurrentUser && styles.currentUserSubtext]}
            numberOfLines={1}
          >
            @{user.username}
          </Text>
        </View>

        {/* Level Badge */}
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv {user.level}</Text>
        </View>

        {/* Points */}
        <View style={styles.pointsContainer}>
          <Text style={[styles.points, isCurrentUser && styles.currentUserText]}>
            {user.points.toLocaleString()}
          </Text>
          <Text style={[styles.pointsLabel, isCurrentUser && styles.currentUserSubtext]}>
            points
          </Text>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  currentUserContainer: {
    borderWidth: 2,
    borderColor: COLORS.pink,
    shadowColor: COLORS.pink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.overlay10,
  },
  rankContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topRank: {
    backgroundColor: COLORS.overlay20,
  },
  normalRank: {
    backgroundColor: COLORS.overlay10,
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  rankEmoji: {
    fontSize: 20,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
  },
  userInfo: {
    flex: 1,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  handle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  levelBadge: {
    backgroundColor: COLORS.overlay20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  pointsLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  currentUserText: {
    color: COLORS.white,
  },
  currentUserSubtext: {
    color: COLORS.textLight,
  },
});

export default LeaderboardItem;