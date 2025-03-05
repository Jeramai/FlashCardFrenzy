import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameCard({
  currentCard = {},
  showSide = 'front',
  timesShown = 0,
  flipCard = () => {},
  swipeLeft = () => {},
  swipeRight = () => {},
  animated = true,
  style = undefined,
  position = new Animated.ValueXY()
}: Readonly<{
  currentCard?: any;
  showSide?: 'front' | 'back';
  timesShown?: number;
  animated?: boolean;
  style?: object;
  position?: Animated.ValueXY;
  flipCard?: () => void;
  swipeLeft?: () => void;
  swipeRight?: () => void;
}>) {
  // Create a double tap handler function
  const DOUBLE_TAP_DELAY = 300;
  const [lastTap, setLastTap] = useState(0);
  const handleDoubleTap = () => {
    if (!animated) return;

    const now = Date.now();
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      handleFlip();
    }
    setLastTap(now);
  };

  // SWIPE
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
        swipeRight();
      } else if (gesture.dx < -swipeThreshold) {
        swipeLeft();
      } else {
        // Reset position if not swiped far enough
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true
        }).start();
      }
    },
    onPanResponderGrant: () => handleDoubleTap()
  });
  const backgroundColorInterpolation = position.x.interpolate({
    inputRange: [-swipeThreshold, 0, swipeThreshold],
    outputRange: ['#ffebee', '#ffffff', '#e8f5e9'] // Light red to white to light green
  });
  const cardStyleBackground = {
    backgroundColor: backgroundColorInterpolation
  };
  const cardStyleTransform = {
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

  // FLIP
  const isFlipped = showSide === 'back';
  const flipAnimation = useRef(new Animated.Value(isFlipped ? 180 : 0)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  // Add interpolation for the flip animation
  const frontAnimatedStyle = {
      transform: [
        {
          rotateX: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
          })
        }
      ],
      zIndex: isFlipped ? 0 : 1
    },
    backAnimatedStyle = {
      transform: [
        {
          rotateX: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
          })
        }
      ],
      zIndex: isFlipped ? 1 : 0
    };

  // Modify the flipCard function to include animation
  const handleFlip = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const toValue = isFlipped ? 0 : 180;
    Animated.timing(flipAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      flipCard();
      setIsAnimating(false);
    });
  };

  return animated ? (
    <Animated.View style={[styles.container, cardStyleTransform]} {...panResponder.panHandlers}>
      <Animated.View style={[styles.cardFace, cardStyleBackground, frontAnimatedStyle]}>
        <Text style={[styles.cardText]}>{currentCard?.front ?? 'Lorem Ipsum'}</Text>
        <Text style={[styles.counter, { left: 20 }]}>Times correct: {timesShown}/5</Text>
        <TouchableOpacity style={[styles.counter, { right: 20 }]} onPress={handleFlip}>
          <MaterialIcons name='flip-to-back' size={24} color='black' />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.cardFace, styles.cardBack, cardStyleBackground, backAnimatedStyle]}>
        <Text style={[styles.cardText]}>{currentCard?.back ?? 'Lorem Ipsum'}</Text>
        <Text style={[styles.counter, { left: 20 }]}>Times correct: {timesShown}/5</Text>
        <TouchableOpacity style={[styles.counter, { right: 20 }]} onPress={handleFlip}>
          <MaterialIcons name='flip-to-front' size={24} color='black' />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  ) : (
    <View style={[styles.cardFace, style]}>
      <Text style={[styles.cardText, styles.blur]}>Lorem Ipsum</Text>
      <Text style={[styles.counter, styles.blur, { left: 20 }]}>Times correct: 0/5</Text>
      <TouchableOpacity style={[styles.counter, styles.blur, { right: 20 }]} onPress={flipCard}>
        <MaterialIcons name='flip-to-back' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  cardFace: {
    backgroundColor: '#ffffff',
    padding: 20,
    height: '100%',
    borderRadius: 15,
    boxShadow: '0 0 10px 3px hsla(82, 12.50%, 65.50%, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%'
  },
  cardBack: {
    position: 'absolute',
    transform: [{ rotateX: '180deg' }],
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  cardText: {
    fontSize: 38,
    fontWeight: 600,
    color: 'gray',
    userSelect: 'none'
  },
  counter: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#666',
    userSelect: 'none'
  },
  blur: {
    filter: 'blur(7px)'
  }
});
