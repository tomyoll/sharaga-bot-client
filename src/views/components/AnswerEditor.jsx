import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { TextField } from "@mui/material";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper
        {...props}
        sx={{
          minWidth: "30%",
          backgroundColor: "rgb(15, 16, 16)"
        }}
      />
    </Draggable>
  );
}

export default function AnswerEditor({ open, handleClose, handleSave, setText, setSave }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle
          style={{ cursor: "move", color: "rgba(207, 201, 192, 0.87)" }}
          id="draggable-dialog-title">
          Write your answer
        </DialogTitle>
        <DialogContent>
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
              setText(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await handleSave();
              handleClose();
              setSave(true);
            }}>
            Add answer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
