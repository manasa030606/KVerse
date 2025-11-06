// src/components/GameCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';

const GameCard = ({ game, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => !game.isLocked && onPress && onPress(game)}
      activeOpacity={game.isLocked ? 1 : 0.8}
      disabled={game.isLocked}
    >
      <LinearGradient
        colors={game.isLocked ? ['#6b7280', '#4b5563'] : [COLORS.primary, COLORS.pink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {game.isLocked && (
          <View style={styles.lockOverlay}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}

        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{game.emoji}</Text>
        </View>

        <Text style={styles.gameName}>{game.name}</Text>
        <Text style={styles.description}>{game.description}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🎯</Text>
            <Text style={styles.infoText}>{game.totalQuestions} Questions</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>⭐</Text>
            <Text style={styles.infoText}>{game.pointsPerCorrect} pts each</Text>
          </View>
        </View>

        {!game.isLocked && (
          <View style={styles.playButton}>
            <Text style={styles.playButtonText}>Play Now →</Text>
          </View>
        )}

        {game.isLocked && (
          <View style={styles.lockedButton}>
            <Text style={styles.lockedButtonText}>Coming Soon</Text>
          </View>
        )}
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
    padding: 20,
    minHeight: 200,
  },
  lockOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: COLORS.overlay20,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 20,
  },
  emojiContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.overlay20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 36,
  },
  gameName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '500',
  },
  playButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  lockedButton: {
    backgroundColor: COLORS.overlay20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  lockedButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default GameCard;