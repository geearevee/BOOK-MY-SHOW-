import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./firebase";
const db = getFirestore(app);

export async function addToUsesFavorites(movie, user) {
    try {
        let data = [movie.id];
        let prevData = await getUserFavorites(user);
        if (prevData) {
            data = [...prevData, movie.id];
            data = new Set(data);
            data = Array.from(data);
        }
        await setDoc(doc(db, "favorites", user.uid), { data });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function removeFavoriteFromUser(movie, user) {
    try {
        let prevData = await getUserFavorites(user);
        if (prevData) {
            prevData = prevData.filter((id) => id !== movie.id);
            // prevData = new Set(prevData);
            // prevData = Array.from(prevData);
            await setDoc(doc(db, "favorites", user.uid), { data: prevData });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getUserFavorites(user) {
    const docRef = doc(db, "favorites", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let { data } = docSnap.data();
        console.log("Document data:", data);
        return data;
    } else {
        console.log("No such document!");
        return null;
    }
}

export async function ifFavorite(movie, user, callback) {
    try {
        let userFavorites = await getUserFavorites(user);
        if (userFavorites) {
            if (userFavorites.includes(movie.id)) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    } catch (error) {
        console.log(error);
        callback(false);
    }
}
