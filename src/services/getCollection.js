import { db } from "../firebase/credentials";
import { collection, getDocs } from "firebase/firestore";

async function getCollection(collectionName) {
    try {
        const collectionRef = collection(db, collectionName);
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

export default getCollection