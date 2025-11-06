// src/screens/ChallengesScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { POINTS } from '../utils/constants';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import ChallengeCard from '../components/ChallengeCard';
import CHALLENGES_DATA from '../data/challenges';

const ChallengesScreen = ({ navigation }) => {
  const { user, addPoints } = useUser();
  const [challenges, setChallenges] = useState(CHALLENGES_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Dance', 'Art', 'Vocal', 'Fashion'];

  const filteredChallenges = selectedCategory === 'All'
    ? challenges
    : challenges.filter(c => c.category === selectedCategory);

  const handleJoinChallenge = (challenge) => {
    Alert.alert(
      'Join Challenge',
      `Join "${challenge.title}"?\n\nYou'll earn ${challenge.prize} points if you win!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Join & Upload', 
          onPress: () => uploadSubmission(challenge) 
        },
      ]
    );
  };

  const uploadSubmission = (challenge) => {
    // Simulate upload
    setTimeout(() => {
      addPoints(POINTS.CHALLENGE_SUBMISSION);
      Alert.alert(
        'Success! 🎉',
        `Your submission has been uploaded!\n+${POINTS.CHALLENGE_SUBMISSION} points earned!`,
        [{ text: 'Great!' }]
      );
    }, 500);
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* User Challenge Stats */}
      <LinearGradient
        colors={[COLORS.pink, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statsCard}
      >
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statValue}>{challenges.length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statValue}>{user.challengesWon}</Text>
            <Text style={styles.statLabel}>Won</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>{user.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  selectedCategory === item
                    ? [COLORS.pink, COLORS.primary]
                    : [COLORS.overlay20, COLORS.overlay20]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.categoryChip}
              >
                <Text style={styles.categoryText}>{item}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Challenges</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filteredChallenges.length}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primary]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <Header 
        title="Challenges"
        subtitle="Compete and win amazing prizes! 🏆"
      />

      <FlatList
        data={filteredChallenges}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChallengeCard
            challenge={item}
            onJoin={handleJoinChallenge}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>
              No challenges in this category yet
            </Text>
          </View>
        }
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
  statsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 12,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  countBadge: {
    backgroundColor: COLORS.pink,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});

export default ChallengesScreen;