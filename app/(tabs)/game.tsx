import useGameStore from '@/components/context/useGameStore';
import CardsOverview from '@/components/game/CardsOverview';
import NewCardGroup from '@/components/game/NewCardGroup';
import BackButton from '@/components/ui/BackButton';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function GameScreen() {
  const { cardGroups } = useGameStore();

  return (
    <View style={styles.background}>
      <BackButton text='< Back to home' />

      {!cardGroups ? (
        <Text style={styles.card}>Loading..</Text>
      ) : !cardGroups.length ? (
        <Text style={styles.card}>No cards found. Go and create some!</Text>
      ) : (
        <CardsOverview />
      )}

      <NewCardGroup />
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
  card: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 100,
    borderRadius: 15,
    boxShadow: '0 0 3px 3px hsla(82, 12.50%, 65.50%, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
