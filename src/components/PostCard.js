// src/components/PostCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(post.likedByUser);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    if (onLike) onLike(post.id);
  };

  return (
    <View style={styles.card}>
      {/* Author Info */}
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.pink, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{post.author.profilePic}</Text>
        </LinearGradient>
        
        <View style={styles.authorInfo}>
          <Text style={styles.displayName}>{post.author.displayName}</Text>
          <Text style={styles.username}>
            @{post.author.username} • {post.timestamp}
          </Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Media Preview */}
      {post.mediaEmoji && (
        <LinearGradient
          colors={[COLORS.primary, COLORS.pink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mediaContainer}
        >
          <Text style={styles.mediaEmoji}>{post.mediaEmoji}</Text>
        </LinearGradient>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleLike}
        >
          <Text style={styles.actionIcon}>{isLiked ? '❤️' : '🤍'}</Text>
          <Text style={styles.actionText}>{likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onComment && onComment(post.id)}
        >
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.shareButton]}
          onPress={() => onShare && onShare(post.id)}
        >
          <Text style={styles.actionIcon}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.overlay10,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.overlay20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  authorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  username: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  content: {
    fontSize: 15,
    color: COLORS.white,
    lineHeight: 22,
    marginBottom: 12,
  },
  mediaContainer: {
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mediaEmoji: {
    fontSize: 64,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: COLORS.overlay20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.overlay10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  shareButton: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default PostCard;