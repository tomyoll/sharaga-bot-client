/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from "react";
import { Container, Box, Stack, Typography, CssBaseline, Button } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AnswerEditor from "./AnswerEditor";
import api from "../../api";
import { useParams } from "react-router-dom";
import { accessTokenSelector, userSelector } from "../../store/RecoilState";
import { useRecoilState } from "recoil";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Question() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [save, setSave] = useState(false);
  const [user] = useRecoilState(userSelector);
  const [token] = useRecoilState(accessTokenSelector);
  const params = useParams();

  async function fetchQuestion() {
    const response = await api.get({ path: `/question/${params.qId}` });
    setQuestion(response.question);
    setAnswers(response.answers);
  }

  useEffect(() => {
    fetchQuestion();
    setSave(false);
  }, [save]);

  async function handleSave() {
    await api.post({ path: "/question/answer", data: { payload: text, question: question._id } });
  }

  async function handleRemove(answerId, questionId) {
    await api.put({ path: "/question/answer/", data: { answerId, questionId } });
    setSave(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <main>
      <Container maxWidth="lg" sx={{ height: window.innerHeight, pt: 10 }}>
        <CssBaseline />
        {open ? (
          <AnswerEditor
            open={open}
            handleClose={handleClose}
            handleSave={handleSave}
            setText={setText}
            text={text}
            setSave={setSave}
          />
        ) : null}

        <Box sx={{ width: "100%" }}>
          <Stack>
            <Typography variant="h3">{question.title}</Typography>
            <ReactMarkdown
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              children={question.payload}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      style={a11yDark}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}></ReactMarkdown>
            {token ? (
              <Button
                sx={{ maxWidth: 240 }}
                variant="outlined"
                color="success"
                onClick={handleClickOpen}>
                Add my answer
              </Button>
            ) : null}
            <Container>
              <Stack>
                {answers?.map((answer) => {
                  return (
                    <Stack spacing={2} key={answer._id}>
                      <Box sx={{ borderBottom: 2, mt: 6 }} />
                      <Typography sx={{ mt: 6, fontStyle: "italic" }} variant="h5">
                        {answer.author.userName} answer :
                      </Typography>
                      <ReactMarkdown
                        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                        children={answer.payload}
                        components={{
                          code({ inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                              <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
                                style={a11yDark}
                                language={match[1]}
                                PreTag="div"
                              />
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          }
                        }}></ReactMarkdown>
                      {user.role !== 0 || !token ? null : (
                        <Button
                          sx={{ maxWidth: 240 }}
                          onClick={async () => handleRemove(answer._id, question._id)}
                          variant="outlined"
                          color="error">
                          Remove this answer
                        </Button>
                      )}
                    </Stack>
                  );
                })}
              </Stack>
            </Container>
          </Stack>
        </Box>
      </Container>
    </main>
  );
}
