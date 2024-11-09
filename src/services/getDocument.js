import { db } from "../firebase/credentials";
import { doc, getDoc } from "firebase/firestore";

async function getDocument(collectionName, documentId) {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            window.alert("Error en el servicio")
            return {}
        }
    } catch (e) {
        window.alert(`Error en el servicio: ${e}`)
        return {};
    }
}

export default getDocument