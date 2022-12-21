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

export const usePaymentStore = defineStore('payment', {
  state: () => ({}),
  getters: {
    //
  },
  actions: {
    //
  },
});
