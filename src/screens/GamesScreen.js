// src/screens/GamesScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/colors';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { GAME_TYPES, LYRICS_QUESTIONS } from '../data/games';

const GamesScreen = ({ navigation }) => {
  const { user, addPoints } = useUser();
  const [games] = useState(GAME_TYPES);
  const [showLyricsGame, setShowLyricsGame] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handlePlayGame = (game) => {
    if (game.id === 'lyrics') {
      setShowLyricsGame(true);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
    } else {
      Alert.alert('Coming Soon', `${game.name} will be available soon!`);
    }
  };

  const handleAnswerSelect = (index) => {
    const question = LYRICS_QUESTIONS[currentQuestion];
    setSelectedAnswer(index);

    setTimeout(() => {
      const isCorrect = index === question.correctIndex;
      
      if (isCorrect) {
        const newScore = score + 1;
        setScore(newScore);
        addPoints(30);
      }

      if (currentQuestion < LYRICS_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Game finished
        const finalScore = isCorrect ? score + 1 : score;
        const totalPoints = finalScore * 30;
        setShowLyricsGame(false);
        Alert.alert(
          '🎉 Game Complete!',
          `You got ${finalScore}/${LYRICS_QUESTIONS.length} correct!\n\n+${totalPoints} points earned!`,
          [{ text: 'Awesome!' }]
        );
      }
    }, 800);
  };

  const renderLyricsGame = () => {
    if (currentQuestion >= LYRICS_QUESTIONS.length) return null;
    
    const question = LYRICS_QUESTIONS[currentQuestion];

    return (
      <Modal
        visible={showLyricsGame}
        animationType="slide"
        onRequestClose={() => setShowLyricsGame(false)}
      >
        <LinearGradient
          colors={[COLORS.primaryDark, COLORS.primary, COLORS.pink]}
          style={styles.gameModal}
        >
          <StatusBar barStyle="light-content" />
          
          {/* Header */}
          <View style={styles.gameHeader}>
            <TouchableOpacity 
              onPress={() => setShowLyricsGame(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.gameTitle}>Complete the Lyrics</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{score}pts</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Question {currentQuestion + 1} of {LYRICS_QUESTIONS.length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestion + 1) / LYRICS_QUESTIONS.length) * 100}%` }
                ]}
              />
            </View>
          </View>

          {/* Question */}
          <View style={styles.questionContainer}>
            <View style={styles.songBadge}>
              <Text style={styles.songIcon}>🎵</Text>
              <Text style={styles.songName}>{question.song}</Text>
            </View>

            <Text style={styles.lyric}>{question.lyric}</Text>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{question.difficulty}</Text>
            </View>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctIndex;
              const showResult = selectedAnswer !== null;

              let backgroundColor = COLORS.overlay20;
              if (showResult) {
                if (isSelected && isCorrect) {
                  backgroundColor = '#10b981';
                } else if (isSelected && !isCorrect) {
                  backgroundColor = '#ef4444';
                } else if (isCorrect) {
                  backgroundColor = '#10b981';
                }
              }

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectedAnswer === null && handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  activeOpacity={0.8}
                >
                  <View style={[styles.optionButton, { backgroundColor }]}>
                    <Text style={styles.optionText}>{option}</Text>
                    {showResult && isCorrect && (
                      <Text style={styles.resultIcon}>✓</Text>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <Text style={styles.resultIcon}>✗</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Game Stats */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.pink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statsCard}
      >
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>🎮</Text>
          <Text style={styles.statValue}>{user.gamesWon}</Text>
          <Text style={styles.statLabel}>Games Won</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>⭐</Text>
          <Text style={styles.statValue}>{user.points}</Text>
          <Text style={styles.statLabel}>Total Points</Text>
        </View>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Choose a Game</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.primary]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <Header 
        title="Mini Games"
        subtitle="Play, compete & earn points! 🎮"
      />

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={handlePlayGame}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {renderLyricsGame()}
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
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
  statDivider: {
    width: 1,
    backgroundColor: COLORS.overlay20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  
  // Game Modal Styles
  gameModal: {
    flex: 1,
    padding: 20,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.overlay20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.white,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  scoreContainer: {
    backgroundColor: COLORS.overlay20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.overlay20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.pink,
    borderRadius: 4,
  },
  questionContainer: {
    backgroundColor: COLORS.overlay20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },
  songBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  songName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.pinkLight,
  },
  lyric: {
    fontSize: 18,
    color: COLORS.white,
    lineHeight: 28,
    marginBottom: 12,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.pink,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    flex: 1,
  },
  resultIcon: {
    fontSize: 24,
    marginLeft: 12,
  },
});

export default GamesScreen;