import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memoriesLogo from "./images/logo.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./App.module.css";
import "@fontsource/mulish";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, Arial, sans-serif",
  },
});

const mediaQuery = (theme) => ({
  root: {
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
});

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ pb: 3 }} maxWidth="lg">
        <AppBar
          sx={{
            my: 3,
            p: 1,
            borderRadius: "20px",
            bgcolor: "rgba(255, 255, 255, 0.7)",
          }}
          className={styles.appBar}
          position="static"
          color="inherit"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontFamily: "Mulish",
              color: "#2e47ad",
              textTransform: "uppercase",
            }}
            variant="h5"
            align="center"
          >
            Happy Memories
            <img
              className={styles.image}
              src={memoriesLogo}
              alt="memories"
              height="40"
            />
          </Typography>
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              className={styles.mainContainer}
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
  );
};

export default App;
