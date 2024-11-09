import { useEffect, useState } from 'react';
import getDocument from '../../services/getDocument';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import formCreateProjectData from '../../utils/constants/formCreateProjectData';
import Form from '../../components/Form';
import updateDocument from '../../services/updateDocument';
import getFile from '../../services/getFile';
import { PaperClipIcon } from '@heroicons/react/20/solid';

function DetailProject() {
    const [comments, setComments] = useState([])
    const [urlDownoload, setUrlDownoload] = useState("")
    const [formData, setFormData] = useState(null)
    const [project, setProject] = useState(null)
    const [formSelectData, setFormSelectData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getInitialData()
    }, []);

    async function getInitialData() {
        const response = await getDocument("projects", id)
        setProject(response)
        setComments(response?.comments ?? [])
        const dataToForm = formCreateProjectData.map((element) => ({
            ...element,
            defaultValue: response[element.id] ?? "",
            required: false
        }))
        setFormData(dataToForm)
        const url = await getFile(`${id}/${response.projectFile}`)
        setUrlDownoload(url)
        const responseFormSelectData = await getDocument("paremetros", "k2yOmcugG1SWVJMhaP3j")
        setFormSelectData(responseFormSelectData ?? {})
        setIsLoading(false)
    }

    async function onSubmit(values, file, formik) {
        setIsLoading(true)
        const storedUserInfo = localStorage.getItem('userInfo')
        var userName = null
        if (storedUserInfo) {
            userName = JSON.parse(storedUserInfo)?.email
        }
        const todayDate = new Date();
        const formattedDate = todayDate.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        const newComments = [{
            name: userName ?? "Anonimo",
            date: formattedDate,
            text: values.comment
        }, ...comments]
        const newData = {
            ...project,
            comments: values.comments != "" ? newComments : comments
        }
        const responseUpdateDocument = await updateDocument("projects", id, newData)
        if (responseUpdateDocument) {
            setComments(newData.comments)
            formik.resetForm()
        }
        setIsLoading(false)
    }

    return (
        <div className="flex justify-center">
            {project != null && formSelectData != null ? (
                <div className='mx-40 my-5'>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-primary">{`Información del proyecto ${project?.projectTitle}`}</h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {
                                formData.map(info => (
                                    <div key={info.id} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{info.label}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.defaultValue}</dd>
                                    </div>
                                ))
                            }
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Documento</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">Documento del proyecto</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a href={urlDownoload} target="_blank" className="font-medium text-primary hover:text-secondary">
                                                    Descargar
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <Form formData={[{
                        label: "Comentario nuevo",
                        type: "textarea",
                        id: "comment",
                        required: true
                    },]}
                        submitButtonText='Publicar'
                        styleFullInput={true}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    />
                    <div>
                        {comments.map((comment, index) => (
                            < article key={index} className="flex flex-col items-start justify-between my-10 pb-5 border-b border-gray-200 w-full" >
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={comment.date} className="text-gray-500">
                                        {comment.date}
                                    </time>
                                </div>
                                <div className="group relative w-full">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <span className="absolute inset-0" />
                                        {comment.name}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                        {comment.text}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            ) :
                <h1>Cargando...</h1>
            }
        </div >
    )
}

export default DetailProject