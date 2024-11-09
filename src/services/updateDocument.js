import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/credentials";

async function updateDocument(table, id, data) {
    try {
        const docRef = doc(db, table, id)
        await updateDoc(docRef, data)
        return true
    } catch (e) {
        window.alert(`Error en el servicio, ${e}`)
        return false
    }
}

export default updateDocument