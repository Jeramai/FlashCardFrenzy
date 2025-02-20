import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function ShakeDetector({
  shakeThreshold = 1.8,
  onShake = () => {}
}: {
  shakeThreshold?: number;
  onShake?: () => void;
}) {
  const [lastShake, setLastShake] = useState(0);
  const SHAKE_DELAY = 1000; // Minimum time (ms) between shake detections

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      Accelerometer.addListener((accelerometerData) => {
        // Calculate total acceleration magnitude
        const magnitude = Math.sqrt(
          accelerometerData.x * accelerometerData.x +
            accelerometerData.y * accelerometerData.y +
            accelerometerData.z * accelerometerData.z
        );

        const now = Date.now();

        // Check if acceleration exceeds threshold and enough time has passed
        if (magnitude > shakeThreshold && now - lastShake > SHAKE_DELAY) {
          setLastShake(now);
          onShake();
        }
      });

      Accelerometer.setUpdateInterval(100);

      return () => {
        Accelerometer.removeAllListeners();
      };
    }
  }, [shakeThreshold, lastShake, onShake]);

  return null;
}
