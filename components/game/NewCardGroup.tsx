import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useGameStore from '../context/useGameStore';
import PopupCard from '../ui/PopupCard';

export default function NewCardGroup() {
  const { addCardGroup } = useGameStore();
  const [showPopup, setShowPopup] = useState(false);

  const [groupName, setGroupName] = useState('');
  const onCreate = () => {
    addCardGroup({ id: Date.now(), name: groupName, cards: [] });
    setGroupName('');
    setShowPopup(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.newCardsCard} onPress={() => setShowPopup(true)}>
        <Text style={styles.newCardsCardText}>CREATE</Text>
      </TouchableOpacity>

      <PopupCard show={showPopup} onHide={() => setShowPopup(false)}>
        <View style={styles.createPopup}>
          <Text style={styles.popupText}>Create a new card group</Text>
          <TextInput style={styles.input} onChangeText={setGroupName} value={groupName} placeholder='Card group name' />
          <Button onPress={onCreate} title='CREATE' />
        </View>
      </PopupCard>
    </>
  );
}

const styles = StyleSheet.create({
  newCardsCard: {
    backgroundColor: '#449e79',
    padding: 10,
    height: 50,
    borderRadius: 15,
    boxShadow: '0 0 3px 3px hsla(82, 12.50%, 65.50%, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    bottom: 10
  },
  newCardsCardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 600
  },
  createPopup: {
    display: 'flex',
    gap: 15
  },
  popupText: {
    fontSize: 20,
    fontWeight: 600
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10
  }
});
