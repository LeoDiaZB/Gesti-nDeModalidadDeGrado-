import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../firebase/credentials'
async function registerUser(email, password) {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password)
}
export default registerUser