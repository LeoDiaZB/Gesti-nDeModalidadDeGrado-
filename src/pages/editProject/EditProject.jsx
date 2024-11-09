import { useEffect, useState } from 'react';
import getDocument from '../../services/getDocument';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup'
import formCreateProjectData from '../../utils/constants/formCreateProjectData';
import Form from '../../components/Form';
import updateDocument from '../../services/updateDocument';
import postFile from '../../services/postFile';

const SignupSchema = Yup.object().shape({
    studentCellphone: Yup.string()
        .length(10, 'El campo debe contener 10 digitos'),
    studentId: Yup.string()
        .matches(/^U/, 'El ID del estudiante debe empezar con la letra U')
})

function EditProject() {
    const [formData, setFormData] = useState(null)
    const [formSelectData, setFormSelectData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getInitialData()
    }, []);

    async function getInitialData() {
        const response = await getDocument("projects", id)
        const dataToForm = formCreateProjectData.map((element) => ({
            ...element,
            defaultValue: response[element.id] ?? "",
            required: false
        }))
        setFormData(dataToForm)
        const responseFormSelectData = await getDocument("paremetros", "k2yOmcugG1SWVJMhaP3j")
        setFormSelectData(responseFormSelectData ?? {})
        setIsLoading(false)
    }

    async function onSubmit(values, file, formik) {
        setIsLoading(true)
        const responseUpdateDocument = await updateDocument("projects", id, values)
        var responsePostFileService = true
        if (file != null) {
            responsePostFileService = await postFile(file, `${id}/${file.name}`)
        }
        if (responseUpdateDocument && responsePostFileService) {
            window.alert("Datos actualizados")
            navigate('/project')
        }
        setIsLoading(false)
    }

    return (
        <div className="flex justify-center">
            {formData != null && formSelectData != null ? (
                <div className='mb-10'>
                    <Form formData={formData} selectOptions={formSelectData ?? {}} onSubmit={onSubmit} SignupSchema={SignupSchema} isLoading={isLoading} submitButtonText='Actualizar' />
                </div>
            ) :
                <h1>Cargando...</h1>
            }
        </div>
    )
}

export default EditProject