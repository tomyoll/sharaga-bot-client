import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import React, { useEffect, useState } from "react";
import api from "../../api";
import SearchDialog from "../components/searchDialog";
import EditNewsDialog from "../components/NewsEditor";

export default function ContentPage() {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [rowCount, setRowCount] = useState(25);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [openNewsEditor, setOpenNewsEditor] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const columns = [
        { field: '_id', headerName: 'ID', width: 210 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'tags', headerName: 'Tags', width: 200 },
        { field: 'date', headerName: 'Date', width: 80 },
        { field: 'image', headerName: 'Image', width: 130 },
        { field: 'link', headerName: 'Link', width: 300 },
        { field: 'page', headerName: 'Page', width: 60 },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 0.2,
            getActions: (params) => [
                <>
                    <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Remove"
                    key={params.row.id}
                    />
                    <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    key={params.row.id}
                    onClick={() => { setEditItem(params.row._id); handleOpenNewsEditor(params.row) }}
                    />
                     <GridActionsCellItem
                    icon={<SearchIcon />}
                    label="Search"
                    key={params.row.id}
                    onClick={handleOpen}
                    />
              </>
              ]
        }
      ];

    async function fetchNews(forcedSearch) {
        const result = await api.get({ path: `/news?page=${page}&limit=${limit}&search=${(forcedSearch || forcedSearch === "") ? forcedSearch : search}` });
        setNews(result.data);
        setRowCount(result.total)
      }

      async function clearResult() {
        await fetchNews("");
        setSearch("");
      }

      React.useEffect(() => {
        fetchNews();
      }, [page]);
      
      const handleClose = () => {
        setOpen(false);
      };

      const handleCloseNewsEditor = () => {
        setIsEdit(false);
        setOpenNewsEditor(false)
      }

      const handleOpen = () => {
        setOpen(true);
      };

      const handleOpenNewsEditor = () => {
        setIsEdit(true);
        setOpenNewsEditor(true);
      };

    return (
       <Container fluid maxWidth="100%">
         <SearchDialog open={open} handleClose={handleClose} fetchNews={fetchNews} setSearch={setSearch} clearResult={clearResult}/>
         {isEdit ? (<EditNewsDialog open={openNewsEditor} handleClose={handleCloseNewsEditor} id={editItem}/>) : null}
        <Box sx={{ mt:13 }} style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={news}
          columns={columns}
          getRowId={(row) => row._id}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
          rowCount={rowCount}
          page={page}
          pageSize={limit}
          paginationMode="server"
          pagination
          checkboxSelection
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableSelectionOnClick
        />
            </Box>
            </Container>
       

    )
}