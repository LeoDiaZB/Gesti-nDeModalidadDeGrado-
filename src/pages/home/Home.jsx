import { useNavigate } from 'react-router-dom'
import { ArrowPathIcon, CloudArrowUpIcon, ClipboardDocumentListIcon, PencilIcon } from '@heroicons/react/24/outline'

const features = [
    {
        name: 'Lista de proyectos',
        description: 'Permite visualizar y filtrar todos los proyectos creados.',
        icon: ClipboardDocumentListIcon,
        path: '/project'
    },
    {
        name: 'Crear proyectos',
        description: 'Permite la creación de nuevos proyectos.',
        icon: CloudArrowUpIcon,
        path: '/project/create'
    },
    {
        name: 'Editar proyectos',
        description: 'Permite la edición de proyectos y agregar comentarios al mismo (Solo para usuarios administrador)',
        icon: PencilIcon,
        path: '/project'
    },
    {
        name: 'Parametros',
        description: 'Permite configurar todos los parametros del formulario de creación de proyectos (Solo para usuarios administrador)',
        icon: ArrowPathIcon,
        path: '/project/params'
    }
]

function Home() {
    const navigate = useNavigate()

    function onPressFeature(path = "") {
        navigate(path)
    }

    return (
        <div className="bg-white py-12 sm:py-15">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">Universidad Surcolombiana</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Inventario documental de proyectos
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Bienvenido a nuestro inventario documental, donde facilitamos la organización y acceso a información crucial. Este sistema está diseñado para optimizar la gestión de documentos.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16" onClick={() => onPressFeature(feature.path)} style={{ cursor: 'pointer' }}>
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                        <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Home