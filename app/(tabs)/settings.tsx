import BackButton from '@/components/ui/BackButton';
import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.background}>
      <BackButton />

      <Text>SETTINGS</Text>
    </View>
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
  }
});
