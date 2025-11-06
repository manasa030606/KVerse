// src/screens/FeedScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { POINTS } from '../utils/constants';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import POSTS_DATA from '../data/posts';

const FeedScreen = ({ navigation }) => {
  const { user, addPoints } = useUser();
  const [posts, setPosts] = useState(POSTS_DATA);
  const [refreshing, setRefreshing] = useState(false);

  const handleCreatePost = () => {
    Alert.alert(
      'Create Post',
      'What would you like to share?',
      [
        { text: 'Text Only', onPress: () => createPost('text') },
        { text: 'With Media', onPress: () => createPost('media') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const createPost = (type) => {
    const points = type === 'media' ? POINTS.CREATE_POST_WITH_MEDIA : POINTS.CREATE_POST;
    addPoints(points);
    Alert.alert('Success', `Post created! +${points} points earned! 🎉`);
    // In real app, would navigate to create post screen
  };

  const handleLike = (postId) => {
    addPoints(POINTS.LIKE_POST);
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likedByUser: !post.likedByUser }
        : post
    ));
  };

  const handleComment = (postId) => {
    addPoints(POINTS.COMMENT);
    Alert.alert('Comment', 'Comment feature coming soon! +2 points');
  };

  const handleShare = (postId) => {
    Alert.alert('Share', 'Share feature coming soon!');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Feed updated!');
    }, 1000);
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* User Stats */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.pink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statsCard}
      >
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.points}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>Lv {user.level}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.postsCount}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
      </LinearGradient>

      {/* Create Post Button */}
      <TouchableOpacity 
        style={styles.createPostButton}
        onPress={handleCreatePost}
      >
        <LinearGradient
          colors={[COLORS.pink, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.createPostGradient}
        >
          <Text style={styles.createPostIcon}>✍️</Text>
          <Text style={styles.createPostText}>Share your thoughts...</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Feed Title */}
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Latest Posts</Text>
        <TouchableOpacity>
          <Text style={styles.filterText}>🔥 Trending</Text>
        </TouchableOpacity>
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
        title="KVerse Feed"
        subtitle={`Welcome back, ${user.displayName}! 👋`}
        rightElement={
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <LinearGradient
              colors={[COLORS.pink, COLORS.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerAvatar}
            >
              <Text style={styles.headerAvatarText}>{user.profilePic}</Text>
            </LinearGradient>
          </TouchableOpacity>
        }
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
    paddingTop: 0,
  },
  headerContent: {
    marginBottom: 20,
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statItem: {
    flex: 1,
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
    color: COLORS.textLight,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.overlay20,
    marginHorizontal: 12,
  },
  createPostButton: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  createPostGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  createPostIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  createPostText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.pinkLight,
    fontWeight: '600',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontSize: 18,
  },
});

export default FeedScreen;