import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function BackButton({ text = undefined, title = undefined }: Readonly<{ text?: string; title?: string }>) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
      <Link href='/' style={styles.link} relativeToDirectory>
        {text ? <Text style={styles.backText}>{text}</Text> : <MaterialIcons name='chevron-left' style={styles.backIcon} />}
      </Link>

      {text ? null : <Text style={styles.backText}>{title}</Text>}

      <MaterialIcons name='chevron-left' style={styles.backIcon} color='transparent' />
    </View>
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
