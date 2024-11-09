import { db } from "../firebase/credentials";
import { collection, query, where, getDocs } from "firebase/firestore";

async function getUserById(collectionName, id) {
    try {
        const collectionRef = query(collection(db, collectionName), where('uid', '==', id))
        const querySnapshot = await getDocs(collectionRef);
        if (!querySnapshot.empty) {
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return docs;
        } else {
            window.alert("Sin datos");
            return [];
        }
    } catch (e) {
        window.alert(`Error en el servicio: ${e}`);
        return [];
    }
}

export default getUserById