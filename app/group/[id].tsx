import BackButton from '@/components/ui/BackButton';
import useGameStore from '@/components/useGameStore';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function CardGroupEdit() {
  const { id } = useLocalSearchParams();
  const { getCardGroup } = useGameStore();

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

  return (
    <View style={styles.background}>
      <BackButton text='< Back to home' />
      <Text>Title: {cardInfo?.name}</Text>
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
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  }
});
