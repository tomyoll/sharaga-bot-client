import { AppBar, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import api from "../../api";


export default function EditNewsDialog({ open, handleClose, id }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("");
    const [link, setLink] = useState("");
    const [page, setPage] = useState("");

    async function fetchItem(id) {
        const responseData = await api.get({ path: `/news/${id}` })
        
        setTitle(responseData?.title || "");
        setTags(responseData?.tags || "");
        setDate(responseData?.date || "");
        setImage(responseData?.image || "");
        setLink(responseData?.link || "");
        setPage(responseData?.page || "");
    }

    useEffect(() => {
         fetchItem(id);
    }, [])

    return (
        <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
            <DialogTitle>
              
            </DialogTitle>
            <DialogContent>
                <TextField
                margin="dense"
                id="title"
                label="Title"
                fullWidth
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                margin="dense"
                id="tags"
                label="Tags"
                fullWidth
                variant="standard"
                value={tags}
                onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                margin="dense"
                id="date"
                label="Date"
                fullWidth
                variant="standard"
                value={date}
                onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                margin="dense"
                id="image"
                label="Image"
                fullWidth
                variant="standard"
                value={image}
                onChange={(e) => setTitle(e.target.value)}
                />
                    <TextField
                margin="dense"
                id="link"
                label="Link"
                fullWidth
                variant="standard"
                value={link}
                onChange={(e) => setTitle(e.target.value)}
                />
                    <TextField
                margin="dense"
                id="page"
                label="Page"
                fullWidth
                variant="standard"
                value={page}
                onChange={(e) => setTitle(e.target.value)}
                />
            </DialogContent>
        </Dialog>
    )
}