import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyAGrVGU1u8hKqVvMzpA0zcxZbrHhrq887w",
  authDomain: "car-dealership-auth.firebaseapp.com",
  projectId: "car-dealership-auth",
  storageBucket: "car-dealership-auth.firebasestorage.app",
  messagingSenderId: "532660494536",
  appId: "1:532660494536:web:bd360dbc0007ce09f745fd",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber };
