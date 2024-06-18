import { createGrid } from "ag-grid-community";
import '../../../node_modules/ag-grid-community/styles//ag-grid.css';
import '../../../node_modules/ag-grid-community/styles//ag-theme-alpine.css';

document.addEventListener("DOMContentLoaded", () => {
    const gridOptions = {
        defaultColDef: {
            floatingFilter: true,
            resizable: true,
            sortable: true,
            filter: false,
            rowGroup: false,
        },
        rowModelType: "infinite",
        cacheBlockSize: 100,
        cacheOverflowSize: 2,
        maxConcurrentDatasourceRequests: 1,
        infiniteInitialRowCount: 500,
        maxBlocksInCache: 10,
        pagination: true,
        paginationAutoPageSize: true,
        paginationPageSizeSelector: [10, 25, 50, 100],
        columnDefs: [
            { headerName: "ID", field: "id", filter: 'agNumberColumnFilter' },
            { headerName: "Аккаунт создан", field: "created",
                cellRenderer: function(params) {
                    try {
                        const wasCreated = params.data.created;
                        return wasCreated?"Создан":"Изменён";
                    } catch (error) {}
                }

            },
            { headerName: "Имя", field: "firstNameChange" },
            { headerName: "Фамилия", field: "lastNameChange" },
            { headerName: "Возраст", field: "ageChange" },
            { headerName: "Пол", field: "genderChange",
                cellRenderer: function(params) {
                    try {
                        const gender = params.data.genderChange;
                        return gender.replace(/female/g, "Ж").replace(/male/g, "М");
                    } catch (error) {}

                }
            },
            { headerName: "Проблемы", field: "hasIssuesChange",
                cellRenderer: function(params) {
                    try {
                        const gender = params.data.hasIssuesChange;
                        return gender.replace(/true/g, "Да").replace(/false/g, "Нет");
                    } catch (error) {
                    }
                }
            },
        ],
    };
    const gridContainer = document.querySelector('#grid');
    const gridApi = createGrid(gridContainer, gridOptions);
    gridApi.autoSizeAllColumns();

    const dataSource = {
        rowCount: undefined,
        getRows: (params) => {
            console.log(params, params.filterModel.id);
            fetch('http://localhost:3000/user_history',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            })
                .then(async (response) => {
                    const responseData = await response.json();
                    const rowData = JSON.parse(responseData.rowData);
                    let lastRow = -1;
                    if (params.endRow > params.startRow + rowData.length) {
                        lastRow = params.startRow + rowData.length;
                    }
                    params.successCallback(rowData, lastRow);
                })


        }
    }
    gridApi.setGridOption("datasource", dataSource);
})
