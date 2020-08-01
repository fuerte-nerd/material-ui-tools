import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Grid,
  Button,
  Container,
  Divider,
  Typography,
  Box,
} from "@material-ui/core";
import Text from "./Text";
import Buttons from "./Buttons";

const Preview = ({ name, twoFonts, primary, secondary, current }) => {
  const [heroImage, setHeroImage] = useState();
  const [colorNames, setColorNames] = useState({ primary: "", secondary: "" });

  const getImage = (query) => {
    axios
      .get(`https://source.unsplash.com/1901x968/?${query}`)
      .then((res) => setHeroImage(res.request.responseURL));
  };

  useEffect(() => {
    axios
      .get(
        `https://api.color.pizza/v1/${primary.substr(1)},${secondary.substr(1)}`
      )
      .then((res) => {
        setColorNames({
          primary: res.data.colors[0].name,
          secondary: res.data.colors[1].name,
        });
      });
  }, [primary, secondary]);

  useEffect(() => {
    getImage(name.replace(/ /g, "+"));
  }, [name]);

  return current ? (
    <>
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        p={current.backgrounds.box !== "transparent" ? 4 : 0}
        pb={10}
        bgcolor={current.backgrounds.box}
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Typography variant="h1">Welcome to your new theme!</Typography>
          <Typography variant="subtitle1" paragraph>
            The {twoFonts ? `header font ` : `font `} is{" "}
            {twoFonts
              ? `${current.header.family} and the body font is ${current.body.family}`
              : current.body.family}
            . The primary color is {colorNames.primary} and the secondary color
            is {colorNames.secondary}.
          </Typography>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary">
                  See more
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => getImage(name.replace(/ /g, "+"))}
                >
                  No thanks
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Container>
        <Text />
        <Buttons />
        <Divider />
      </Container>
    </>
  ) : null;
};

const mapStateToProps = (state) => ({
  current: state.appState.current,
  twoFonts: state.appState.current.twoFonts,
  name: state.appState.current.name,
  primary: state.appState.current.primary,
  secondary: state.appState.current.secondary,
});

export default connect(mapStateToProps)(Preview);
