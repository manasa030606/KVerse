// src/components/ChallengeCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';

const ChallengeCard = ({ challenge, onJoin }) => {
  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
      case 'Easy':
        return '#10b981';
      case 'Medium':
        return '#f59e0b';
      case 'Hard':
        return '#ef4444';
      default:
        return COLORS.white;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onJoin && onJoin(challenge)}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.pink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>{challenge.emoji}</Text>
          </View>

          {/* Info */}
          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>
                {challenge.title}
              </Text>
              <View 
                style={[
                  styles.difficultyBadge, 
                  { backgroundColor: getDifficultyColor() }
                ]}
              >
                <Text style={styles.difficultyText}>
                  {challenge.difficulty}
                </Text>
              </View>
            </View>

            <Text style={styles.description} numberOfLines={2}>
              {challenge.description}
            </Text>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statIcon}>🏆</Text>
                <Text style={styles.statText}>{challenge.prize} pts</Text>
              </View>
              
              <View style={styles.stat}>
                <Text style={styles.statIcon}>👥</Text>
                <Text style={styles.statText}>{challenge.participants}</Text>
              </View>
              
              <View style={styles.stat}>
                <Text style={styles.statIcon}>⏰</Text>
                <Text style={styles.statText}>{challenge.deadline}</Text>
              </View>
            </View>

            {/* Category Badge */}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{challenge.category}</Text>
            </View>
          </View>
        </View>

        {/* Join Button */}
        <View style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Challenge →</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: COLORS.overlay20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    flex: 1,
    marginRight: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.white,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  statText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '500',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.overlay20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default ChallengeCard;