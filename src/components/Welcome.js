import React, { useState } from "react";
import { connect } from "react-redux";
import { setWelcome } from "../state/display/actions";
import {
  Box,
  Link,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Divider,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";

import { Close } from "@material-ui/icons";

const Welcome = ({ dispatch, isOpen, onStart, welcome }) => {
  const [dismiss, setDismiss] = useState(false);
  const handleChange = (e) => {
    setDismiss(!dismiss);
  };
  const handleClose = (e) => {
    if (dismiss) {
      localStorage.setItem("dismissWelcome", "true");
    }

    dispatch(setWelcome({ ...welcome, isOpen: false }));
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <IconButton style={{ top: 10, right: 10, position: "absolute" }}>
        <Close />
      </IconButton>
      <DialogTitle disableTypography>
        <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
          Welcome to MUITA
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h4" style={{ fontFamily: "Roboto" }}>
          "What is MUITA?.."
        </Typography>
        <Typography style={{ fontFamily: "Roboto" }} paragraph>
          MUITA (Material UI Theme Assistant) is a tool to help you quickly and
          intuitively find a Material UI theme for your next React project!
        </Typography>
        <Divide />
        <Typography variant="h4" style={{ fontFamily: "Roboto" }}>
          "How does it work?.."
        </Typography>
        <Typography style={{ fontFamily: "Roboto" }} paragraph>
          It's very simple! You just hit the refresh button (bottom right of
          your screen) and MUITA will provide you with a new theme at random,
          including fonts (provided by Google Fonts), colors and an image. If
          you like certain elements of it, you can lock them in the settings
          menu and they will remain upon subsequent refreshes. You can narrow
          the random search parameters via the settings menu. When you are happy
          with everything, you can copy the code and paste it directly into your
          project. The images are provided by the{" "}
          <Link href="https://www.unsplash.com" target="_blank">
            Unsplash
          </Link>{" "}
          API and even though they are royalty-free, they are meant as more of a
          guide.
        </Typography>
        <Divide />
        <Typography variant="h4" style={{ fontFamily: "Roboto" }}>
          "Can I save my theme?.."
        </Typography>
        <Typography style={{ fontFamily: "Roboto" }} paragraph>
          Absolutely! For now, you can save (and of course load!) them to the
          storage built into your browser. In the future, there are plans to
          offer online storage/sharing of themes.
        </Typography>
        <Divide />
        <Typography variant="h4" style={{ fontFamily: "Roboto" }}>
          "I would like to help improve MUITA..."
        </Typography>
        <Typography style={{ fontFamily: "Roboto" }} paragraph>
          Great! Please feel free to fork the repo on GitHub and play with it!
          There is a lot more functionality that could be built into the app,
          but time is my enemy! ;)
        </Typography>
        <Divide />
        <Typography variant="h4" style={{ fontFamily: "Roboto" }}>
          "I would like to contact you..."
        </Typography>
        <Typography style={{ fontFamily: "Roboto" }} paragraph>
          If you would like to report a bug, donate to the project, help develop
          MUITA, hire me, or get in touch with me for any other reason, my email
          address is{" "}
          <Link href="mailto:fuertenerd@gmail.com" target="_blank">
            fuertenerd@gmail.com
          </Link>
          .
        </Typography>
      </DialogContent>
      {onStart && (
        <DialogActions>
          <FormControlLabel
            control={<Checkbox checked={dismiss} onChange={handleChange} />}
            label="Don't show this again"
            labelPlacement="start"
          />
        </DialogActions>
      )}
    </Dialog>
  );
};

const Divide = () => {
  return (
    <Box my={2}>
      <Divider />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  welcome: state.display.welcome,
  isOpen: state.display.welcome.isOpen,
  onStart: state.display.welcome.showOnStart,
});

export default connect(mapStateToProps)(Welcome);
