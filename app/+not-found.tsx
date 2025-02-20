import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.background}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.mainText}>This screen doesn't exist.</Text>
        <Link href='/' style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  mainText: {
    fontSize: 30,
    fontWeight: 600
  },
  link: {
    paddingVertical: 15,
    textDecorationLine: 'underline',
    color: '#007AFF',
    fontSize: 18
  }
});
