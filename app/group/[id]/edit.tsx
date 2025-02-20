import BackButton from '@/components/ui/BackButton';
import useGameStore from '@/components/useGameStore';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CardGroupEdit() {
  const { id } = useLocalSearchParams();
  const { getCardGroup, editCardGroup } = useGameStore();

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

  return (
    <View style={styles.background}>
      <BackButton text='< Back to home' />

      <View style={styles.titleWrapper}>
        <Text>Title: {cardInfo?.name}</Text>
        <TextInput style={styles.input} onChangeText={setGroupName} value={groupName} placeholder='Card group name' />
        <Button onPress={onUpdate} title='UPDATE' />
      </View>

      <View>
        <Text>Cards ({cardInfo?.cards?.length}):</Text>
        <ScrollView>
          {cardInfo?.cards?.map((card) => (
            <View key={card.id}>
              <Text>{card.name}</Text>
            </View>
          ))}
          <View>Add card</View>
        </ScrollView>
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
  titleWrapper: { display: 'flex', gap: 10 },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  }
});
