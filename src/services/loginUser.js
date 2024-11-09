import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../firebase/credentials'
async function loginUser(email, password) {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
}
export default loginUser