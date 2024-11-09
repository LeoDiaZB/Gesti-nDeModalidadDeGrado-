import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Form from "../../components/Form"
import formCreateProjectData from "../../utils/constants/formCreateProjectData"
import postData from "../../services/postData"
import postFile from "../../services/postFile"
import getDocument from '../../services/getDocument'

const SignupSchema = Yup.object().shape({
    studentCellphone: Yup.string()
        .length(10, 'El campo debe contener 10 digitos'),
    studentId: Yup.string()
        .matches(/^U/, 'El ID del estudiante debe empezar con la letra U')
})

function CreateProject() {

    const [isLoading, setIsLoading] = useState(false)
    const [formSelectData, setFormSelectData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getInitialData()
    }, []);

    async function getInitialData() {
        const response = await getDocument("paremetros", "k2yOmcugG1SWVJMhaP3j")
        setFormSelectData(response ?? {})
    }

    async function onSubmit(values, file, formik) {
        setIsLoading(true)
        const responsePosDataService = await postData("projects", { ...values, comments: [] })
        const responsePostFileService = await postFile(file, `${responsePosDataService.id}/${file.name}`)
        setIsLoading(false)
        if (responsePosDataService && responsePostFileService) {
            window.alert("Datos guardados")
            navigate('/project')
        }
    }

    return (
        <div className="flex justify-center">
            <div>
                {
                    formSelectData != null ? (
                        <Form formData={formCreateProjectData} selectOptions={formSelectData} onSubmit={onSubmit} isLoading={isLoading} SignupSchema={SignupSchema} title="Nuevo proyecto" />
                    ) : (
                        <h1>Cargando...</h1>
                    )
                }
            </div>
        </div>
    )
}

export default CreateProject