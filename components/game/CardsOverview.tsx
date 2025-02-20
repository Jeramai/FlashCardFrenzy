import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PopupCard from '../ui/PopupCard';
import useGameStore from '../useGameStore';

export default function CardsOverview() {
  const { cardGroups } = useGameStore();
  const [showPopup, setShowPopup] = useState<any>(false);

  return (
    <>
      <ScrollView>
        <View style={styles.cardGroupWrapper}>
          {cardGroups?.map((cardGroup) => {
            return (
              <TouchableOpacity key={cardGroup.id} style={styles.gameCard} onPress={() => setShowPopup(cardGroup)}>
                <Text>{cardGroup.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <PopupCard show={showPopup} onHide={() => setShowPopup(false)}>
        <View>{showPopup?.name}</View>
      </PopupCard>
    </>
  );
}

const styles = StyleSheet.create({
  cardGroupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    margin: 5
  },
  gameCard: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 100,
    borderRadius: 15,
    boxShadow: '0 0 3px 3px hsla(82, 12.50%, 65.50%, 0.1)'
  }
});
