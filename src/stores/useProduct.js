import { defineStore } from 'pinia';
import {
  collection,
  query,
  doc,
  updateDoc,
  where,
  getDocs,
  setDoc,
  getDoc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { app, database, storage } from '../firebase/firebase';
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { useAuthStore } from './useAuth';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    productPhotoName: '',
    productPhotoFileUrl: null,
    productPhotoPreview: null,
    percentage: null,
  }),
  getters: {
    getProductPhotoPreview(state) {
      return state.productPhotoPreview;
    },
  },
  actions: {
    async addProduct(details) {
      const { title, price, desc, categories, productPhotoName, productPhoto } =
        details;
      const storageRef = ref(storage, 'images/' + productPhotoName);
      const uploadProductPhoto = uploadBytesResumable(storageRef, productPhoto);
      uploadProductPhoto.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.percentage = progress;
          console.log('upload is ' + progress + '% done');
        },
        (error) => console.log(error.message),
        async () => {
          const downloadURL = await getDownloadURL(
            uploadProductPhoto.snapshot.ref
          );
          const timestamp = Date.now();
          const storeAuth = useAuthStore();
          await setDoc(doc(collection(database, 'products')), {
            productTitle: title,
            productPrice: price,
            productDesc: desc,
            productCategories: categories,
            productImgUrl: downloadURL,
            userId: storeAuth.getProfileId,
            date: timestamp,
          });
        }
      );
    },

    async getProducts() {
      const response = await getDocs(collection(database, 'products'));
      const data = await response.docs;
      return data.map((item) => {
        return { ...item.data(), id: item.id };
      });
    },

    async getProduct(id) {
      const docSnap = await getDoc(doc(database, 'products', id));
      const docUserSnap = await getDoc(
        doc(database, 'users', docSnap.data().userId)
      );
      return { ...docSnap.data(), user: docUserSnap.data() };
    },

    async getMyProducts(id) {
      const q = query(
        collection(database, 'products'),
        where('userId', '==', id)
      );
      const querySnapshot = await getDocs(q);
      const data = await querySnapshot.docs;
      const docUserSnap = await getDoc(doc(database, 'users', id));

      return {
        data,
        user: docUserSnap.data(),
      };
    },
  },
});
