// src/screens/RewardsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import REWARDS_DATA from '../data/rewards';

const RewardsScreen = ({ navigation }) => {
  const { user, deductPoints, addBadge } = useUser();
  const [rewards] = useState(REWARDS_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(rewards.map(r => r.category))];

  const filteredRewards = selectedCategory === 'All'
    ? rewards
    : rewards.filter(r => r.category === selectedCategory);

  const handleRedeem = (reward) => {
    if (user.points < reward.cost) {
      Alert.alert(
        'Insufficient Points',
        `You need ${reward.cost - user.points} more points to redeem this reward.`,
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Redeem "${reward.name}" for ${reward.cost} points?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => {
            const result = deductPoints(reward.cost);
            if (result.success) {
              if (reward.type === 'badge') {
                addBadge(reward.emoji);
              }
              Alert.alert(
                'Success! 🎉',
                `You've redeemed "${reward.name}"!\n\nCheck your profile to use it.`,
                [{ text: 'Awesome!' }]
              );
            }
          }
        }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Points Balance Card */}
      <LinearGradient
        colors={[COLORS.pink, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.balanceCard}
      >
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceValue}>{user.points.toLocaleString()}</Text>
        <Text style={styles.balanceSubtext}>points available</Text>
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

      <Text style={styles.sectionTitle}>Available Rewards</Text>
    </View>
  );

  const renderReward = ({ item }) => {
    const canAfford = user.points >= item.cost;

    return (
      <TouchableOpacity
        style={styles.rewardCard}
        onPress={() => handleRedeem(item)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={canAfford ? [COLORS.primary, COLORS.pink] : ['#6b7280', '#4b5563']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.rewardGradient}
        >
          {/* Icon */}
          <View style={styles.rewardIcon}>
            <Text style={styles.rewardEmoji}>{item.emoji}</Text>
          </View>

          {/* Info */}
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.rewardDescription} numberOfLines={2}>
              {item.description}
            </Text>

            {/* Cost & Type */}
            <View style={styles.rewardFooter}>
              <View style={styles.costContainer}>
                <Text style={styles.costIcon}>⭐</Text>
                <Text style={styles.costText}>{item.cost} pts</Text>
              </View>

              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
            </View>

            {/* Redeem Button */}
            <View style={[styles.redeemButton, !canAfford && styles.redeemButtonDisabled]}>
              <Text style={styles.redeemButtonText}>
                {canAfford ? 'Redeem Now' : 'Need More Points'}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primary]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <Header 
        title="Rewards Store"
        subtitle="Redeem your hard-earned points! 🎁"
        showBack
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={filteredRewards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReward}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>
              No rewards in this category
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
  balanceCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 16,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  rewardCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  rewardGradient: {
    padding: 16,
    flexDirection: 'row',
  },
  rewardIcon: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: COLORS.overlay20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rewardEmoji: {
    fontSize: 36,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 6,
  },
  rewardDescription: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 12,
  },
  rewardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.overlay20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  costIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  costText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  typeBadge: {
    backgroundColor: COLORS.overlay20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: '600',
  },
  redeemButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  redeemButtonDisabled: {
    backgroundColor: COLORS.overlay20,
  },
  redeemButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
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

export default RewardsScreen;