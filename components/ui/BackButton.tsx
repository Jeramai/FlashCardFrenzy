import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

export default function BackButton({ text = 'Back' }) {
  return (
    <Link href='/'>
      <Text style={styles.backText}>{text}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  backText: {
    fontSize: 20,
    fontWeight: 600
  }
});
