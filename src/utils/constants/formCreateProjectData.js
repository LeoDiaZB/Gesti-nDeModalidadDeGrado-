const formCreateProjectData = [
    {
        label: "Título del proyecto",
        type: "text",
        id: "projectTitle",
        columnTitle: "Titulo",
        showColumn: true,
        required: true
    },
    {
        label: "Descripción del proyecto",
        type: "textarea",
        id: "projectDescription",
        required: true
    },
    {
        label: "ID del proyecto",
        type: "text",
        id: "projectId",
        showColumn: true,
        required: true
    },
    {
        label: "Modalidad del proyecto",
        type: "select",
        id: "projectModality",
        showColumn: true,
        required: true
    },
    {
        label: "Tipo del proyecto",
        type: "select",
        id: "projectType",
        showColumn: true,
        required: true
    },
    {
        label: "ID del estudiante",
        type: "text",
        id: "studentId",
        required: true
    },
    {
        label: "Nombres del estudiante",
        type: "text",
        id: "studentName",
        showColumn: true,
        required: true
    },
    {
        label: "Apellidos del estudiante",
        type: "text",
        id: "studentSurName",
        showColumn: true,
        required: true
    },
    {
        label: "Correo electrónico del estudiante",
        type: "email",
        id: "studentEmail",
        required: true
    },
    {
        label: "Número de celular del estudiante",
        type: "number",
        id: "studentCellphone",
        required: true
    },
    {
        label: "Programa Académico del estudiante",
        type: "select",
        id: "studentProgram",
        showColumn: true,
        required: true
    },
    {
        label: "Asesor del proyecto",
        type: "select",
        id: "projectAdvisorName",
        showColumn: true,
        required: true
    },
    {
        label: "Facultad",
        type: "select",
        id: "faculty",
        showColumn: true,
        required: true
    },
    {
        label: "Estado del proyecto",
        type: "select",
        id: "projectState",
        showColumn: true,
        required: true
    },
    {
        label: "Archivo del proyecto",
        type: "file",
        id: "projectFile",
        required: true
    },
    {
        label: "Fecha de inicio",
        type: "date",
        id: "initialDate",
        required: true,
        showColumn: true
    },
    {
        label: "Fecha de finalización",
        type: "date",
        id: "endDate",
        required: false
    }
]

export default formCreateProjectData
