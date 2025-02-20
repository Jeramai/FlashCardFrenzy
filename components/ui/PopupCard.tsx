import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

export default function PopupCard({
  show,
  onHide,
  children
}: Readonly<{ show: boolean; onHide: () => void; children: React.ReactNode }>) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: show ? 1 : 0,
      duration: 150, // Adjust duration as needed
      useNativeDriver: true // For better performance
    }).start();
  }, [show]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('screen').height * 0.85, 0] // Slide from bottom
  });

  return (
    <>
      {show && ( // Only render the background if show is true
        <TouchableOpacity style={styles.popupCardBackground} onPress={onHide} />
      )}
      <Animated.View
        style={[
          styles.popupCard,
          {
            transform: [{ translateY }],
            opacity: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1] // Fade in/out
            })
          }
        ]}
      >
        {children}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  popupCardBackground: {
    position: 'absolute', // Changed to absolute
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100
  },
  popupCard: {
    position: 'absolute', // Changed to absolute
    bottom: 0,
    left: 15,
    right: 15,
    zIndex: 101,
    maxHeight: Dimensions.get('screen').height * 0.85,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    // boxShadow is not a valid style in react-native, use elevation for android
    elevation: 3, // For Android shadow
    // For iOS shadow:
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3
  }
});
