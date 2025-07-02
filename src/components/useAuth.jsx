import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  return { currentUser, checking };
}
