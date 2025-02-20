import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define proper interfaces for better type safety
interface CardGroup {
  id: number;
  name: string;
  cards: Card[];
}
interface Card {
  id: number;
  front: string;
  back: string;
}

interface GameState {
  cardGroups: CardGroup[];
  getCardGroup: (id: CardGroup['id']) => CardGroup | undefined;
  addCardGroup: (newCardGroup: CardGroup) => void;
  editCardGroup: (id: CardGroup['id'], name: string) => void;
  removeCardGroup: (id: CardGroup['id']) => void;
  addCard: (groupId: CardGroup['id'], newCard: Card) => void;
  editCard: (groupId: CardGroup['id'], cardId: Card['id'], front: string, back: string) => void;
  removeCard: (groupId: CardGroup['id'], cardId: Card['id']) => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      cardGroups: [],
      getCardGroup: (id) => {
        return get().cardGroups?.find((cardGroup) => cardGroup.id === id);
      },
      addCardGroup: (newCardGroup) => {
        set({
          cardGroups: [...get().cardGroups, newCardGroup]
        });
      },
      editCardGroup: (id, name) => {
        set({
          cardGroups: get().cardGroups.map((card) => {
            if (card.id === id) {
              card.name = name;
            }
            return card;
          })
        });
      },
      removeCardGroup: (id) => {
        set({
          cardGroups: get().cardGroups.filter((card) => card.id !== id)
        });
      },
      addCard: (groupId, newCard) => {
        set({
          cardGroups: get().cardGroups.map((cardGroup) => {
            if (cardGroup.id === groupId) {
              cardGroup.cards = [...cardGroup.cards, newCard];
            }
            return cardGroup;
          })
        });
      },
      editCard: (groupId, cardId, front, back) => {
        set({
          cardGroups: get().cardGroups.map((cardGroup) => {
            if (cardGroup.id === groupId) {
              cardGroup.cards = cardGroup.cards.map((card) => {
                if (card.id === cardId) {
                  card.front = front;
                  card.back = back;
                }
                return card;
              });
            }
            return cardGroup;
          })
        });
      },
      removeCard: (groupId, cardId) => {
        set({
          cardGroups: get().cardGroups.map((cardGroup) => {
            if (cardGroup.id === groupId) {
              cardGroup.cards = cardGroup.cards.filter((card) => card.id !== cardId);
            }
            return cardGroup;
          })
        });
      }
    }),
    {
      name: 'cards'
    }
  )
);

export default useGameStore;
