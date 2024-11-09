import { getStorage, ref, uploadBytes } from "firebase/storage";

async function postFile(file, path) {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, path);
        const response = await uploadBytes(storageRef, file)
        return response
    } catch (e) {
        window.alert(`Error en el servicio, ${e}`)
        return null
    }
}

export default postFile