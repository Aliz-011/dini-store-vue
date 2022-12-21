import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
  signOut,
} from 'firebase/auth';
import { app, database } from '../firebase/firebase';
import { collection, addDoc, getDoc, doc, setDoc } from 'firebase/firestore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    profileFirstName: null,
    profileLastName: null,
    profileEmail: null,
    profileId: null,
    profileInitials: null,
  }),

  getters: {
    getUser: (state) => (state.user ? state.user : null),
    getProfileId: (state) => state.profileId,
  },

  actions: {
    login(details) {
      const { email, password } = details;

      signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          this.user = user;
          console.log(getAuth().currentUser);
        })
        .catch((err) => console.log(err.message));
    },

    async register(details) {
      const { email, firstName, lastName, password } = details;

      const auth = getAuth();
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      this.user = createUser.user;

      const docRef = await setDoc(doc(database, 'users', createUser.user.uid), {
        email,
        firstName,
        lastName,
      });
      console.log('Document written with ID: ', docRef.id);
    },

    async getCurrentUser() {
      const docSnap = await getDoc(
        doc(database, 'users', getAuth().currentUser.uid)
      );
      this.user = docSnap.data();
      const { firstName, lastName, email } = docSnap.data();
      this.profileEmail = email;
      this.profileFirstName = firstName;
      this.profileLastName = lastName;
      this.profileId = getAuth().currentUser.uid;
      this.profileInitials =
        firstName.match(/(\b\S)?/g).join('') +
        lastName.match(/(\b\S)?/g).join('');
    },

    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log('logged out!');
      } catch (error) {
        console.log(error.message);
      }
    },

    async resetPassword(email) {
      await sendPasswordResetEmail(getAuth(), email);
    },
  },
});
