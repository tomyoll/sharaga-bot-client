import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper
} from "@mui/material";

function PaperComponent(props) {
  return (
    <Paper
      {...props}
      sx={{
        minWidth: "30%",
        backgroundColor: "rgb(15, 16, 16)"
      }}
    />
  );
}

export default function QuestionEditor({ open, handleClose, setTitle, setPayload, handleSave }) {
  return (
    <Dialog PaperComponent={PaperComponent} open={open}>
      <DialogTitle style={{ color: "rgba(207, 201, 192, 0.87)" }}>
        What you want to ask?
      </DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-textarea"
          placeholder="Type title"
          fullWidth
          multiline
          inputProps={{
            sx: {
              "&::placeholder": {
                color: "rgba(207, 201, 192, 0.87)"
              },
              color: "rgba(207, 201, 192, 0.87)"
            }
          }}
          minRows={1}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-textarea"
          placeholder="What you think?"
          fullWidth
          multiline
          inputProps={{
            sx: {
              "&::placeholder": {
                color: "rgba(207, 201, 192, 0.87)"
              },
              color: "rgba(207, 201, 192, 0.87)"
            }
          }}
          minRows={7}
          onChange={(e) => {
            setPayload(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="warning" variant="outlined" autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={async () => {
            await handleSave();
            handleClose();
          }}>
          Add question
        </Button>
      </DialogActions>
    </Dialog>
  );
}
