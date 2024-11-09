import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginUser from '../../services/loginUser'
import FormAuthentication from '../../components/FormAuthentication'
import getUserById from '../../services/getUserById'

function Login() {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function onPressLogin(email, password) {
        try {
            setIsLoading(true)
            const userInfo = await loginUser(email, password)
            const user = await getUserById("users", userInfo?.user?.uid)
            localStorage.setItem('userInfo', JSON.stringify(user[0]))
            setIsLoading(false)
            navigate('/home')
        } catch (error) {
            setIsLoading(false)
            const errorMessage = error.message
            alert(`Error iniciando sesión: ${errorMessage}`)
        }
    }

    return (
        <FormAuthentication isLoading={isLoading} onPressSubmit={onPressLogin} title='Iniciar sesión' textFooter='¿No tienes una cuenta? ' linkPath='/register' linkText='Regístrate' textButton='Iniciar sesión' />
    )
}

export default Login