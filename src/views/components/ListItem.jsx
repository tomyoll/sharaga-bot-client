import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Stack, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { accessTokenSelector } from "../../store/RecoilState";

function ListItem({ title, time, id, answersCount, user, author, removeQuestion }) {
  const [accessToken] = useRecoilState(accessTokenSelector);
  console.log(user);
  return (
    <Container
      sx={{
        width: "70%",
        backgroundColor: "rgb(85, 28, 132)"
      }}>
      <Grid container direction="row" wrap="nowrap">
        <Grid item xs={11}>
          <Box>
            <Stack justifyContent="center" spacing={2} ml={3} mt={2}>
              <Typography sx={{ fontStyle: "italic" }} variant="h5">
                {author.userName}
              </Typography>
              <Typography
                sx={{ textDecoration: "none", color: "inherit" }}
                component={Link}
                to={`/question/${id}`}
                variant="h5">
                {title}
              </Typography>
              <Typography variant="h8">{time}</Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs mt={3}>
          <Stack justifyContent="center" alignItems="center">
            {user.role !== 0 || !accessToken ? null : (
              <Button onClick={async () => removeQuestion(id)} variant="outlined" color="warning">
                Remove
              </Button>
            )}
            <Typography textOverflow="hidden" variant="h3">
              {answersCount}
            </Typography>
            <Typography>Answers</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ListItem;
