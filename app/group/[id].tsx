import useGameStore from '@/components/context/useGameStore';
import GameCard from '@/components/game/GameCard';
import ShakeDetector from '@/components/game/ShakeDetector';
import BackButton from '@/components/ui/BackButton';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      if (id != '[id]') {
        console.error('Error getting card group:', error);
        console.error('ID:', id);
      }
    }
  }, [id, getCardGroup]);

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
  }, [cardGroupInfo, cardCounts, shuffleCards]);

  const currentCard = useMemo(() => availableCards[currentCardIndex], [availableCards, currentCardIndex]);

  const flipCard = () => {
    setShowSide((side) => (side === 'front' ? 'back' : 'front'));
  };
  const handleWrong = () => {
    if (!currentCard) return;

    setShowSide('front');
    // Move to next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % availableCards.length);

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      impactAsync(ImpactFeedbackStyle.Rigid);
    }
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

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      impactAsync(ImpactFeedbackStyle.Soft);
    }
  };
  const onShake = () => {
    if (!currentCard) return;

    setShowSide('front');
    // Move to next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % availableCards.length);
  };

  // Show completion message when all cards have been shown 5 times
  if (!availableCards.length) {
    return (
      <View style={styles.background}>
        <BackButton />
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
    <>
      <View style={styles.background}>
        <BackButton title={cardGroupInfo?.name} />

        <View style={styles.stats}>
          <Text style={styles.statsText}>Cards remaining: {remainingCards}</Text>
        </View>

        <View style={{ display: 'flex', justifyContent: 'space-around', flex: 1, gap: 20 }}>
          <View style={styles.bigCardContainer}>
            {remainingCards > 1 && <GameCard animated={false} style={styles.bigCardLeft} />}
            {remainingCards > 2 && <GameCard animated={false} style={styles.bigCardRight} />}
            <GameCard
              currentCard={currentCard}
              showSide={showSide}
              timesShown={timesShown}
              flipCard={flipCard}
              handleCorrect={handleCorrect}
              handleWrong={handleWrong}
              animated
            />
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
      </View>

      <ShakeDetector onShake={onShake} />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f3ffe0',
    height: '100%',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    gap: 20
  },
  bigCardContainer: {
    position: 'relative',
    height: '60%',
    display: 'flex',
    justifyContent: 'center'
  },
  bigCardLeft: {
    position: 'absolute',
    transform: 'rotate(3deg)',
    width: '100%'
  },
  bigCardRight: {
    position: 'absolute',
    transform: 'rotate(-3deg)',
    width: '100%'
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
