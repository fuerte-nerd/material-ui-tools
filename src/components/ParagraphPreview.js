import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Divider, Typography, Box } from "@material-ui/core";
import tinycolor from "tinycolor2";

const ParagraphPreview = ({ bodyFont, headerFont, twoFonts, primary }) => {
  useEffect(() => {
    axios
      .get(`https://api.color.pizza/v1/${primary.substr(1)}`)
      .then((response) => console.log(response));
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
          primary color is {tinycolor(primary).toName()}
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
});

export default connect(mapStateToProps)(ParagraphPreview);
