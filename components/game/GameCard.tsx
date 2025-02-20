import { MaterialIcons } from '@expo/vector-icons';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  style?: object;
  flipCard?: () => void;
  handleCorrect?: () => void;
  handleWrong?: () => void;
}>) {
  const position = new Animated.ValueXY();
  const swipeThreshold = 120;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (!animated) return;

      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (event, gesture) => {
      if (!animated) return;

      if (gesture.dx > swipeThreshold) {
        // Swipe right - correct
        Animated.timing(position, {
          toValue: { x: 500, y: 0 },
          duration: 200,
          useNativeDriver: true
        }).start(() => {
          handleCorrect();
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gesture.dx < -swipeThreshold) {
        // Swipe left - wrong
        Animated.timing(position, {
          toValue: { x: -500, y: 0 },
          duration: 200,
          useNativeDriver: true
        }).start(() => {
          handleWrong();
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        // Reset position if not swiped far enough
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true
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

  return animated ? (
    <Animated.View style={[styles.bigCard, style ?? cardStyle]} {...panResponder.panHandlers}>
      <Text style={[styles.cardText, animated ? {} : styles.blur]}>{currentCard?.[showSide] ?? 'Lorem Ipsum'}</Text>
      <Text style={[styles.counter, animated ? {} : styles.blur, { left: 20 }]}>Times correct: {timesShown}/5</Text>
      <TouchableOpacity style={[styles.counter, animated ? {} : styles.blur, { right: 20 }]} onPress={flipCard}>
        {showSide === 'front' ? (
          <MaterialIcons name='flip-to-front' size={24} color='black' />
        ) : (
          <MaterialIcons name='flip-to-back' size={24} color='black' />
        )}
      </TouchableOpacity>
    </Animated.View>
  ) : (
    <View style={[styles.bigCard, style ?? cardStyle]}>
      <Text style={[styles.cardText, styles.blur]}>Lorem Ipsum</Text>
      <Text style={[styles.counter, styles.blur, { left: 20 }]}>Times correct: 0/5</Text>
      <TouchableOpacity style={[styles.counter, styles.blur, { right: 20 }]} onPress={flipCard}>
        <MaterialIcons name='flip-to-back' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bigCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    height: Dimensions.get('screen').height * 0.6,
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
  blur: {
    filter: 'blur(7px)'
  }
});
