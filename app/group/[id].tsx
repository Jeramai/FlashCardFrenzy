import BackButton from '@/components/ui/BackButton';
import useGameStore from '@/components/useGameStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CardGroupEdit() {
  const { id } = useLocalSearchParams();
  const { getCardGroup } = useGameStore();

  const [showSide, setShowSide] = useState<'front' | 'back'>('front');
  const [cardCounts, setCardCounts] = useState<Record<number, number>>({});

  const cardGroupInfo = useMemo(() => {
    try {
      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new Error('Invalid ID format');
      }
      return getCardGroup(numericId);
    } catch (error) {
      console.error('Error getting card group:', error);
    }
  }, [id]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const shuffleCards = useCallback((cards: any) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCurrentCardIndex(0);
    return shuffled;
  }, []);
  const availableCards = useMemo(() => {
    if (!cardGroupInfo) return [];
    const filteredCards = cardGroupInfo.cards.filter((card) => (cardCounts[card.id] || 0) <= 5);
    return shuffleCards(filteredCards);
  }, [cardGroupInfo, cardCounts]);

  const currentCard = useMemo(() => {
    return availableCards[currentCardIndex];
  }, [currentCardIndex]);

  const flipCard = () => {
    setShowSide((side) => (side === 'front' ? 'back' : 'front'));
  };
  const handleWrong = () => {
    if (!currentCard) return;

    setShowSide('front');
    // Move to next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % availableCards.length);
  };
  const handleCorrect = () => {
    if (!currentCard) return;

    setShowSide('front');
    setCardCounts((prevCounts) => ({
      ...prevCounts,
      [currentCard.id]: (prevCounts[currentCard.id] || 0) + 1
    }));
    // Move to next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % availableCards.length);
  };

  // Show completion message when all cards have been shown 5 times
  if (!availableCards.length) {
    return (
      <View style={styles.background}>
        <BackButton text='< Back to home' />
        <View style={styles.completionContainer}>
          <Text style={styles.completionText}>Congratulations! 🎉</Text>
          <Text style={styles.completionSubtext}>You've completed all cards 5 times!</Text>
        </View>
      </View>
    );
  }

  const timesShown = currentCard ? cardCounts[currentCard.id] || 0 : 0;
  const remainingCards = availableCards.length;

  return (
    <View style={styles.background}>
      <BackButton text='< Back to home' />

      <View style={styles.stats}>
        <Text style={styles.statsText}>Cards remaining: {remainingCards}</Text>
      </View>

      <View style={styles.bigCard}>
        <Text style={styles.cardText}>{currentCard?.[showSide]}</Text>
        <Text style={[styles.counter, { left: 20 }]}>Times correct: {timesShown}/5</Text>
        <TouchableOpacity style={[styles.counter, { right: 20 }]} onPress={flipCard}>
          {showSide === 'front' ? (
            <MaterialIcons name='flip-to-front' size={24} color='black' />
          ) : (
            <MaterialIcons name='flip-to-back' size={24} color='black' />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#e05d5d' }]} onPress={handleWrong}>
          <Text style={styles.buttonText}>Wrong</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#4CAF50' }]} onPress={handleCorrect}>
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f3ffe0',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    gap: 20
  },
  bigCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    height: Dimensions.get('screen').height * 0.7,
    borderRadius: 15,
    boxShadow: '0 0 3px 3px hsla(82, 12.50%, 65.50%, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 38,
    fontWeight: 600,
    color: 'gray'
  },
  counter: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#666'
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10
  },
  nextButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  stats: {
    alignItems: 'center',
    padding: 5
  },
  statsText: {
    fontSize: 16,
    color: '#666'
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  completionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  completionSubtext: {
    fontSize: 18,
    color: '#666'
  }
});
