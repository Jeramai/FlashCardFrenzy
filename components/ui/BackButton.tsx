import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

export default function BackButton({ text = undefined }: Readonly<{ text?: string }>) {
  return (
    <Link href='/' style={styles.link} relativeToDirectory>
      {text ? <Text style={styles.backText}>{text}</Text> : <MaterialIcons name='chevron-left' style={styles.backIcon} />}
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    alignSelf: 'flex-start'
  },
  backText: {
    fontSize: 20,
    fontWeight: 600
  },
  backIcon: {
    fontSize: 40,
    fontWeight: 600
  }
});
