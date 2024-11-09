import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from "../../components/Form"
import formCreateProjectData from "../../utils/constants/formCreateProjectData"
import getDocument from '../../services/getDocument'
import updateDocument from '../../services/updateDocument'

function Params() {
    const [isLoading, setIsLoading] = useState(false)
    const [formSelectData, setFormSelectData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo')
        if (storedUserInfo) {
            const userRol = JSON.parse(storedUserInfo)?.rol
            if (userRol === "admin") {
                getInitialData()
            } else {
                navigate("/home")
            }
        }
    }, []);

    async function getInitialData() {
        const response = await getDocument("paremetros", "k2yOmcugG1SWVJMhaP3j")
        setFormSelectData(response ?? {})
    }

    function getFormData() {
        const formFilterByType = formCreateProjectData.filter(value => value.type === "select")
        const formData = formFilterByType.map(inputData => ({
            label: inputData.label,
            type: "textarea",
            id: inputData.id,
            rows: 4,
            required: true,
            defaultValue: formSelectData[inputData.id].map(value => value.value).join('-')
        }))
        return formData
    }

    async function onUpdate(values) {
        setIsLoading(true)
        const newData = {}
        for (const key in values) {
            newData[key] = values[key].split('-').map(item => ({ value: item.trim() }))
        }
        const response = await updateDocument("paremetros", "k2yOmcugG1SWVJMhaP3j", newData)
        setIsLoading(false)
        if (response) {
            navigate('/project/create')
        }
    }

    return (
        <div className="flex justify-center">
            <div>
                {
                    formSelectData != null ? (
                        <Form formData={getFormData()} onSubmit={onUpdate} submitButtonText="Actualizar" styleFullInput={true} title="Actualiza los parámetros" isLoading={isLoading} />
                    ) : (
                        <h1>Cargando...</h1>
                    )
                }
            </div>
        </div>
    )
}

export default Params