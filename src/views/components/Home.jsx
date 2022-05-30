import { React, useState, useEffect } from "react";
import { Button, CircularProgress, Stack, Collapse, Container, Typography } from "@mui/material";
import ListItem from "./ListItem";
import api from "../../api";
import QuestionEditor from "./QuestionEditor";
import Alert from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { accessTokenSelector, userSelector } from "../../store/RecoilState";
import logo from "../../assets/logo.png";

function QuestionsList() {
  const [user] = useRecoilState(userSelector);
  const [accessToken] = useRecoilState(accessTokenSelector);
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState({ error: false, message: "" });

  const [title, setTitle] = useState("");
  const [payload, setPayload] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  async function fetchQuestions() {
    try {
      const data = await api.get({ path: "/question" });
      setQuestions(data);
      setLoading(false);
      setHasError({ error: false });
    } catch (e) {
      setLoading(false);
      setHasError({ error: true, message: e.error });
    }
  }

  async function handleSave() {
    try {
      await api.post({ path: "/question/", data: { title, payload } });
      await fetchQuestions();
    } catch (e) {
      setHasError({ error: true, message: e.error });
    }
  }

  async function removeQuestion(id) {
    console.log(id);
    try {
      await api.delete({ path: `/question/${id}` });
      await fetchQuestions();
    } catch (e) {
      setHasError({ error: true, message: e.error });
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, [open]);

  return (
    <>
      {loading ? (
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: window.innerHeight
          }}>
          <CircularProgress />
        </main>
      ) : (
        <>
          {hasError.error ? (
            <Collapse in={hasError.error}>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 10,
                  maxWidth: "30%"
                }}>
                <Stack>
                  <Alert
                    onClose={() => setHasError({ error: false })}
                    variant="outlined"
                    severity="error">
                    {hasError.message}
                  </Alert>
                  <Button
                    onClick={async () => fetchQuestions()}
                    sx={{ mt: 2, mb: 4 }}
                    variant="outlined">
                    Try again
                  </Button>
                  <img src={logo} alt="Logo" />
                </Stack>
              </Container>
            </Collapse>
          ) : (
            <>
              {open ? (
                <QuestionEditor
                  open={open}
                  handleClose={handleClose}
                  setTitle={setTitle}
                  setPayload={setPayload}
                  handleSave={handleSave}
                />
              ) : null}
              <Stack spacing={2} justifyContent="center" alignItems="center" mt={10}>
                {accessToken ? (
                  <Button onClick={() => handleClickOpen()} variant={"outlined"}>
                    Ask question
                  </Button>
                ) : null}
                {questions.length ? (
                  questions.map((item) => (
                    <ListItem
                      user={user}
                      key={item._id}
                      author={item.author}
                      title={item.title}
                      answersCount={item.answers.length}
                      removeQuestion={removeQuestion}
                      time={new Date(item.createdAt).toDateString()}
                      id={item._id}
                    />
                  ))
                ) : (
                  <>
                    <img src={logo} alt="Logo" />
                    <Typography>No questions yet, be the first!</Typography>
                  </>
                )}
              </Stack>
            </>
          )}
        </>
      )}
    </>
  );
}

export default QuestionsList;
