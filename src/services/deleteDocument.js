import { db } from "../firebase/credentials";
import { doc, deleteDoc } from "firebase/firestore";

async function deleteDocument(collectionName, documentId) {
    try {
        const docRef = doc(db, collectionName, documentId);
        await deleteDoc(docRef);
        return true
    } catch (e) {
        window.alert(`Error en el servicio: ${e}`)
        return false;
    }
}

export default deleteDocument