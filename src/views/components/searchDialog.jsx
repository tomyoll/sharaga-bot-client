import React, { useState } from "react";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography} from "@mui/material";

export default function SearchDialog({ open, handleClose, fetchNews, setSearch, clearResult }) {
    const [localSearch, setLocalSearch] = useState("");

    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Search
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
            <Typography>
                Type search request by ID or title
            </Typography>
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="search"
            label="Search request"
            fullWidth
            variant="standard"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onBlur={(e) => setSearch(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={ async () => clearResult().then(setLocalSearch(""))}>Clear result</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={async () => fetchNews(localSearch)}>Search</Button>
        </DialogActions>
        </Dialog>
    )
}