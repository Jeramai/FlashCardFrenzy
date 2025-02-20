import useGameStore from '@/components/context/useGameStore';
import BackButton from '@/components/ui/BackButton';
import PopupCard from '@/components/ui/PopupCard';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CardGroupEdit() {
  const { id } = useLocalSearchParams();
  const { getCardGroup, editCardGroup, addCard, editCard, removeCard } = useGameStore();

  const cardInfo = useMemo(() => {
    try {
      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new Error('Invalid ID format');
      }
      return getCardGroup(numericId);
    } catch (error) {
      console.error('Error getting card group:', error);
    }
  }, [id]);

  const [groupName, setGroupName] = useState('');
  useEffect(() => {
    if (cardInfo?.name) setGroupName(cardInfo.name);
  }, [cardInfo?.name]);
  const onUpdate = () => {
    if (!cardInfo) return;

    editCardGroup(cardInfo.id, groupName);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [frontValue, setFrontValue] = useState('');
  const [backValue, setBackValue] = useState('');
  const onCreate = () => {
    if (!cardInfo || !frontValue || !backValue) return;

    addCard(cardInfo.id, {
      id: Date.now(),
      front: frontValue,
      back: backValue
    });

    setFrontValue('');
    setBackValue('');
    setShowPopup(false);
  };

  const [showEditPopup, setShowEditPopup] = useState<any>(false);
  const onCardClick = (e: any) => {
    setShowEditPopup(e);
    setFrontValue(e.front);
    setBackValue(e.back);
  };
  const onEdit = () => {
    if (!cardInfo || !showEditPopup || !frontValue || !backValue) return;

    editCard(cardInfo.id, showEditPopup.id, frontValue, backValue);

    setShowEditPopup(false);
    setFrontValue('');
    setBackValue('');
  };
  const onRemove = () => {
    if (!cardInfo || !showEditPopup) return;

    removeCard(cardInfo.id, showEditPopup.id);

    setShowEditPopup(false);
    setFrontValue('');
    setBackValue('');
  };

  return (
    <>
      <View style={styles.background}>
        <BackButton />

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Title: {cardInfo?.name}</Text>
          <TextInput style={styles.input} onChangeText={setGroupName} value={groupName} placeholder='Card group name' />
          <Button onPress={onUpdate} title='UPDATE TITLE' />
        </View>
        <View style={{ flex: 1, gap: 10 }}>
          <Text style={styles.title}>Cards ({cardInfo?.cards?.length}):</Text>
          <ScrollView>
            <View style={styles.cardGroupWrapper}>
              {cardInfo?.cards?.map((card) => (
                <TouchableOpacity key={card.id} style={styles.card} onPress={() => onCardClick(card)}>
                  <Text style={styles.cardText}>{card.front}</Text>
                  <Text style={styles.cardText}>{card.back}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.newCard}>
            <Button onPress={() => setShowPopup(true)} title='NEW CARD' />
          </View>
        </View>
      </View>

      <PopupCard show={showPopup} onHide={() => setShowPopup(false)}>
        <View style={styles.createPopup}>
          <Text style={styles.popupText}>Create a new card</Text>
          <TextInput style={styles.input} onChangeText={setFrontValue} value={frontValue} placeholder='Front of the card' />
          <TextInput style={styles.input} onChangeText={setBackValue} value={backValue} placeholder='Back of the card' />
          <Button onPress={onCreate} title='CREATE' />
        </View>
      </PopupCard>

      <PopupCard show={showEditPopup} onHide={() => setShowEditPopup(false)}>
        <View style={styles.createPopup}>
          <View style={styles.titlebar}>
            <Text style={styles.popupText}>Edit card</Text>
            <TouchableOpacity style={styles.iconButton} onPress={onRemove}>
              <MaterialIcons name='delete' size={28} color='black' />
            </TouchableOpacity>
          </View>

          <TextInput style={styles.input} onChangeText={setFrontValue} value={frontValue} placeholder='Front of the card' />
          <TextInput style={styles.input} onChangeText={setBackValue} value={backValue} placeholder='Back of the card' />
          <Button onPress={onEdit} title='EDIT' />
        </View>
      </PopupCard>
    </>
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
  titleWrapper: { display: 'flex', gap: 10 },
  title: {
    fontSize: 16,
    fontWeight: 600
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  createPopup: {
    display: 'flex',
    gap: 15
  },
  popupText: {
    fontSize: 20,
    fontWeight: 600
  },
  cardGroupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    margin: 5
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 100,
    borderRadius: 15,
    boxShadow: '0 0 3px 3px hsla(82, 12.50%, 65.50%, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 16,
    fontWeight: 600,
    color: 'gray'
  },
  newCard: {
    position: 'sticky',
    bottom: 0
  },
  titlebar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconButton: {
    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});
