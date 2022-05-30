import { Button, Container, List, Paper, Stack, TextareaAutosize, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { Box } from "@mui/system";
import axios from "axios";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userName', headerName: 'userName', width: 130 },
    { field: 'telegramId', headerName: 'telegramId', width: 130 },
    {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        flex: 0.2,
        getActions: (params) => [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Видалити запис"
              key={params.row.id}
            />
          ]
    }
  ];

  export default function UsersPage(){
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([])

      async function fetchUsers() {
        // eslint-disable-next-line no-undef
        const result = await api.get({ path: "/users" });
        setUsers(result);
      }

      async function sendMessage() {
          await api.post({ path: "/message", data: { payload: message, users: selectedUsers} })
      }

      React.useEffect(() => {
        fetchUsers();
        console.log(users);
      }, []);

      React.useEffect(() => {
        console.log({selectedUsers});
      }, [selectedUsers]);

  return (
      <Container>
      <Stack spacing={5} direction="row" sx={{ mt: 13 }}>
    <div style={{ height: 800, width: '100%' }}>
    <DataGrid
      rows={users}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      getRowId={(row) => row._id}
      onSelectionModelChange={(ids) => {
        const selectedIDs = new Set(ids);
        const selectedRowData = users.filter((row) =>
          selectedIDs.has(row._id.toString())
        );
        setSelectedUsers(selectedRowData);
      }}
      checkboxSelection
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      disableSelectionOnClick
    />
  </div>
  <div style={{ height: 800, width: '100%' }}>
    <Box>
        <Stack>
        <Typography>Write message to send all users</Typography>
        <TextareaAutosize onChange={(e) => setMessage(e.target.value)}/>
        <Button onClick={async () => sendMessage()}>Send message</Button>
        </Stack>
    </Box>
  </div>
  </Stack>
  </Container>
  );
}