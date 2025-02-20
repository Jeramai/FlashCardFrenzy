import { MaterialIcons } from '@expo/vector-icons';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function GameCard({
  currentCard = {},
  showSide = 'front',
  timesShown = 0,
  flipCard = () => {},
  handleCorrect = () => {},
  handleWrong = () => {},
  animated = true,
  style = undefined
}: Readonly<{
  currentCard?: any;
  showSide?: 'front' | 'back';
  timesShown?: number;
  animated?: boolean;
  style?: {};
  flipCard?: () => void;
  handleCorrect?: () => void;
  handleWrong?: () => void;
}>) {
  const position = new Animated.ValueXY();
  const swipeThreshold = 120;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > swipeThreshold) {
        // Swipe right - correct
        Animated.timing(position, {
          toValue: { x: 500, y: 0 },
          duration: 200,
          useNativeDriver: false
        }).start(() => {
          handleCorrect();
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gesture.dx < -swipeThreshold) {
        // Swipe left - wrong
        Animated.timing(position, {
          toValue: { x: -500, y: 0 },
          duration: 200,
          useNativeDriver: false
        }).start(() => {
          handleWrong();
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        // Reset position if not swiped far enough
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    }
  });
  const backgroundColorInterpolation = position.x.interpolate({
    inputRange: [-swipeThreshold, 0, swipeThreshold],
    outputRange: ['#ffebee', '#ffffff', '#e8f5e9'] // Light red to white to light green
  });
  const cardStyle = {
    backgroundColor: backgroundColorInterpolation,
    transform: [
      { translateX: position.x },
      {
        rotate: position.x.interpolate({
          inputRange: [-500, 0, 500],
          outputRange: ['-30deg', '0deg', '30deg']
        })
      }
    ]
  };

  return (
    <Animated.View style={[styles.bigCard, style ?? cardStyle]} {...panResponder.panHandlers}>
      <Text style={[styles.cardText, animated ? {} : styles.blur]}>{currentCard?.[showSide] ?? 'Lorem Ipsum'}</Text>
      {/* <Text style={[styles.counter, animated ? {} : styles.blur, { top: 20, left: 20, textTransform: 'capitalize' }]}>
        {showSide}
      </Text> */}
      <Text style={[styles.counter, animated ? {} : styles.blur, { left: 20 }]}>Times correct: {timesShown}/5</Text>
      <TouchableOpacity style={[styles.counter, animated ? {} : styles.blur, { right: 20 }]} onPress={flipCard}>
        {showSide === 'front' ? (
          <MaterialIcons name='flip-to-front' size={24} color='black' />
        ) : (
          <MaterialIcons name='flip-to-back' size={24} color='black' />
        )}
      </TouchableOpacity>
    </Animated.View>
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
  bigCardContainer: {
    position: 'relative'
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
  },
  blur: {
    filter: 'blur(7px)'
  }
});
