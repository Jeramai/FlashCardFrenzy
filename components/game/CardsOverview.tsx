import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useGameStore from '../context/useGameStore';
import PopupCard from '../ui/PopupCard';

export default function CardsOverview() {
  const { cardGroups, removeCardGroup } = useGameStore();
  const [showPopup, setShowPopup] = useState<any>(false);

  const handleRemove = () => {
    removeCardGroup(showPopup.id);
    setShowPopup(false);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.cardGroupWrapper}>
          {cardGroups?.map((cardGroup) => {
            return (
              <TouchableOpacity key={cardGroup.id} style={styles.gameCard} onPress={() => setShowPopup(cardGroup)}>
                <Text style={styles.gameCardText}>{cardGroup.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <PopupCard show={showPopup} onHide={() => setShowPopup(false)}>
        <View style={styles.popupContentWrapper}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>{showPopup?.name}</Text>
            <Text>Card amount: {showPopup?.cards?.length}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.iconButton}>
              <Link href={{ pathname: '/group/[id]/edit', params: { id: showPopup.id } }}>
                <MaterialIcons name='edit' size={28} color='black' />
              </Link>
            </View>

            <View style={styles.iconButton}>
              {showPopup?.cards?.length ? (
                <Link href={{ pathname: '/group/[id]', params: { id: showPopup.id } }}>
                  <MaterialIcons name='play-arrow' size={28} color='black' />
                </Link>
              ) : (
                <MaterialIcons name='play-arrow' size={28} color='#c9c9c9' />
              )}
            </View>

            <TouchableOpacity style={styles.iconButton} onPress={handleRemove}>
              <MaterialIcons name='delete' size={28} color='black' />
            </TouchableOpacity>
          </View>
        </View>
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
  popupContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    gap: 50
  },
  popupContent: {
    alignItems: 'center',
    padding: 20
  },
  popupTitle: {
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 10,
    color: 'gray'
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 20
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
