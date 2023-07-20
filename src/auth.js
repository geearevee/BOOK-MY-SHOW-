import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { app } from "./firebase";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        return null;
    }
}

export async function authStatus(cb) {
    onAuthStateChanged(auth, (user) => cb(user));
}
