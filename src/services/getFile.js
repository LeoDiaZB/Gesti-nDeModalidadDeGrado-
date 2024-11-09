import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
async function getFile(path) {
    try {
        const url = await getDownloadURL(ref(storage, path))
        return url
    } catch (e) {
        window.alert(`Error en el servicio: ${e}`)
        return ""
    }
}

export default getFile