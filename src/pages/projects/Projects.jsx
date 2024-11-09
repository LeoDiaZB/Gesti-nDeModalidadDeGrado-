import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import getCollection from '../../services/getCollection';
import formCreateProjectData from '../../utils/constants/formCreateProjectData';
import deleteDocument from '../../services/deleteDocument';
import * as XLSX from 'xlsx'; // Importa XLSX para la exportación a Excel
import { Key } from '@mui/icons-material';

function Projects() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getInitialData()
    }, []);

    async function getInitialData() {
        const response = await getCollection("projects")
        setIsLoading(false)
        setData(response)
    }

    function onPressEdit(id) {
        navigate(`edit/${id}`)
    }

    async function onPressDelete(id) {
        setIsLoading(true)
        const response = await deleteDocument("projects", id)
        setIsLoading(false)
        if (response) {
            const newData = data.filter(project => project.id !== id)
            setData(newData)
            window.alert("Proyecto eliminado")
        }
    }

    function getColumns() {
        const allColumns = formCreateProjectData.filter((column) => column.showColumn)
        const columnsToShow = allColumns.map((column, index) => ({
            id: index,
            field: column.id,
            headerName: column.columnTitle ?? column.label,
            width: 150
        }))
        const storedUserInfo = localStorage.getItem('userInfo')
        if (storedUserInfo) {
            const userRol = JSON.parse(storedUserInfo)?.rol
            if (userRol === "admin") {
                columnsToShow.unshift({
                    field: 'actions',
                    type: 'actions',
                    headerName: 'Acciones',
                    cellClassName: 'actions',
                    getActions: ({ id }) => {
                        return [
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                label="Delete"
                                onClick={() => onPressDelete(id)}
                                sx={{ color: 'red' }}
                            />,
                            <GridActionsCellItem
                                icon={<EditIcon />}
                                label="Edit"
                                className="textPrimary"
                                onClick={() => onPressEdit(id)}
                                sx={{ color: 'gray' }}
                            />
                        ];
                    },
                })
            }
        }
        return columnsToShow
    }

    const handleRowClick = (params) => {
        navigate(`detail/${params.id}`)
    }

    function Toolbar() {
        return (
            <div>
                <GridToolbarFilterButton />
                <button onClick={exportToExcel} style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}>
                    Descargar Excel
                </button>
            </div>
        );
    }

    // Función para exportar a Excel
    const exportToExcel = () => {

        const columnNames = {
            studentName: 'NOMBRE DE ESTUDIANTE',
            studentSurName: 'APELLIDO',
            projectTitle: 'TITULO DEL PROYECTO',
            projectState: 'ESTADO DEL PROYECTO',
            projectDescription: 'DESCRIPCIÓN DEL PROYECTO',
            projectModality: 'MODALIDAD',
            projectType: 'TIPO PROYECTO',
            studentProgram: 'PROGRAMA ACADEMICO',
            projectId: 'ID PROYECTO',
            initialDate: 'FECHA DE INICIO',
            endDate: 'FECHA DE FIN',
            projectAdvisorName: 'ASESOR DEL PROYECTO',
            faculty: 'FACULTAD',
            projectFile: 'ARCHIVO DEL PROYECTO',
            studentCellphone: 'TELÉFONO',
            studentEmail: 'EMAIL',
            studentId: 'ID DEL ESTUDIANTE',
            comments: 'COMENTARIOS',
        };

        // Filtrar solo las columnas necesarias en el orden deseado
        const filteredData = data.map(item => {
            const filteredItem = {};
            // Usamos el orden y nombres de las columnas definidos en `columnNames`
            Object.keys(columnNames).forEach(key => {
                if (item[key] !== undefined) {
                    filteredItem[columnNames[key]] = item[key];
                }
            });
            return filteredItem;
        });

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");

        // Descargar el archivo Excel
        XLSX.writeFile(workbook, "informeGrados.xlsx");
    };

    return (
        <div className="flex justify-center m-10" style={isLoading ? { height: '150px' } : { height: 'auto' }}>
            <DataGrid
                loading={isLoading}
                rows={isLoading ? [] : data}
                columns={getColumns()}
                slots={{ toolbar: Toolbar }}
                onRowClick={handleRowClick}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    },
                    '& .MuiDataGrid-footerContainer': {
                        display: 'none'
                    },
                }}
            />
        </div>
    )
}

export default Projects;
