import { Link } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.playerInfo}>
        <Text style={styles.playerInfoText}>Welcome!</Text>
      </View>
      <View>
        <Link href='/game' relativeToDirectory style={styles.gameCard}>
          <Text style={styles.gameCardText}>Cards</Text>
        </Link>
      </View>
      {/* <View>
        <Link href='/buy' relativeToDirectory style={styles.newCardsCard}>
          <Text style={styles.newCardsCardText}>Remove ads</Text>
        </Link>
      </View> */}
      <View>
        <Link href='/settings' relativeToDirectory style={styles.settingsCard}>
          <Text style={styles.settingsCardText}>Settings</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f3ffe0',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingTop: 50,
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
    alignItems: 'center'
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
    alignItems: 'center'
  },
  settingsCardText: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white'
  }
});
