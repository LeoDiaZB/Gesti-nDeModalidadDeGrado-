import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/credentials";

async function postData(table, data) {
    try {
        const docRef = await addDoc(collection(db, table), data)
        return docRef
    } catch (e) {
        window.alert(`Error en el servicio, ${e}`)
        return null
    }
}

export default postData