import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.playerInfo}>
        <Text style={styles.playerInfoText}>Welcome!</Text>
      </View>
      <Link href='/game' relativeToDirectory>
        <View style={styles.gameCard}>
          <Text style={styles.gameCardText}>Card overview</Text>
        </View>
      </Link>
      {/* <View>
        <Link href='/buy' relativeToDirectory style={styles.newCardsCard}>
          <Text style={styles.newCardsCardText}>Remove ads</Text>
        </Link>
      </View> */}
      <Link href='/settings' relativeToDirectory>
        <View style={styles.settingsCard}>
          <Text style={styles.settingsCardText}>Settings</Text>
        </View>
      </Link>
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
  playerInfo: {},
  playerInfoText: {
    fontSize: 28,
    fontWeight: 600
  },
  gameCard: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 100,
    borderRadius: 15,
    boxShadow: '0 0 3px 3px hsla(82, 12.50%, 65.50%, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  gameCardText: {
    fontSize: 20,
    fontWeight: 600,
    color: 'gray'
  },
  newCardsCard: {
    backgroundColor: '#449e79',
    padding: 10,
    height: 100,
    borderRadius: 15,
    boxShadow: '0 0 3px 3px hsla(82, 12.50%, 65.50%, 0.1)'
  },
  newCardsCardText: { color: 'white' },
  settingsCard: {
    backgroundColor: '#449e79',
    padding: 10,
    height: 50,
    borderRadius: 15,
    boxShadow: '0 0 3px 3px hsla(82, 12.50%, 65.50%, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  settingsCardText: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white'
  }
});
