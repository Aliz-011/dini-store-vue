import { defineStore } from 'pinia';
import {
  collection,
  query,
  doc,
  updateDoc,
  where,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { app, database } from '../firebase/firebase';
import { useAuthStore } from './useAuth';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    products: null,
    quantity: 0,
    total: 0,
  }),
  getters: {
    //
  },
  actions: {
    async addToCart(details) {
      const { product, quantity, total } = details;
      const timestamp = Date.now();
      const storeAuth = useAuthStore();
      await setDoc(doc(collection(database, 'carts')), {
        userId: storeAuth.getProfileId,
        product,
        quantity,
        total,
        date: timestamp,
      });
    },

    async getMyCart(id) {
      const q = query(collection(database, 'carts'), where('userId', '==', id));
      const querySnapshot = await getDocs(q);
      const data = await querySnapshot.docs;
      return data.map((item) => {
        return { ...item.data(), id: item.id };
      });
    },

    async deleteMyCartItem(id) {
      const deleteCartItem = await deleteDoc(doc(database, 'carts', id));
      if (deleteCartItem) {
        return { msg: 'Cart item successfully deleted.' };
      }
      throw new Error('Could not remove the item.');
    },
  },
});
