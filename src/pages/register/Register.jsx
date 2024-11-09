import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import registerUser from '../../services/registerUser'
import FormAuthentication from '../../components/FormAuthentication'
import postData from '../../services/postData'

function Register() {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function onPressRegister(email, password) {
        try {
            setIsLoading(true)
            const userInfo = await registerUser(email, password)
            await postData("users", { email, rol: "user", uid: userInfo?.user?.uid })
            setIsLoading(false)
            navigate('/login')
        } catch (error) {
            setIsLoading(false)
            const errorMessage = error.message
            alert(`Error creando el usuario: ${errorMessage}`)
        }
    }

    return (
        <FormAuthentication isLoading={isLoading} onPressSubmit={onPressRegister} title='Crea tu cuenta' textFooter='¿Ya tienes una cuenta? ' linkPath='/login' linkText='Inicia sesión' textButton='Crear cuenta' />
    )
}

export default Register