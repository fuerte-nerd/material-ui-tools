import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Divider, Typography, Box } from "@material-ui/core";
import { setPrimaryColorName } from "../state/actions";

const ParagraphPreview = ({
  dispatch,
  bodyFont,
  headerFont,
  twoFonts,
  primary,
  secondary,
  primaryColorName,
  secondaryColorName,
}) => {
  useEffect(() => {
    axios
      .get(`https://api.color.pizza/v1/${primary.substr(1)}`)
      .then((response) => {
        setPrimaryColorName(response.data.colors[0].name);
      });
  }, [primary]);
  return (
    <>
      <Box my={4}>
        <Typography variant="h1">
          Welcome to your new Material-UI theme!
        </Typography>
        <Typography paragraph>
          The {twoFonts ? "body font" : "font"} is {bodyFont.themeName}
          {twoFonts && ` and the header font is ${headerFont.themeName}`}. The
          primary color is {primaryColorName} and the secondary color is{" "}
          {secondaryColorName}.
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

const mapStateToProps = (state) => ({
  bodyFont: state.font,
  headerFont: state.headerFont,
  twoFonts: state.twoFonts,
  primary: state.primary,
  secondary: state.secondary,
  primaryColorName: state.primaryColorName,
  secondaryColorName: state.secondaryColorName,
});

export default connect(mapStateToProps)(ParagraphPreview);