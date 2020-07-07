import React from "react";
import { connect } from "react-redux";
import {
  setLocked,
  setDialogs,
  setSecondaryMode,
  setSpacing,
  set2Fonts,
  setButtonTextTransform,
} from "../state/actions";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  FormControl,
  Radio,
  RadioGroup,
  FormGroup,
  Divider,
  makeStyles,
  Slider,
} from "@material-ui/core";
import AppTypography from "./AppTypography";
import Locks from "./settings/Locks";
const useStyles = makeStyles({
  label: {
    fontFamily: "Roboto",
  },
});

const Settings = ({
  dispatch,
  dialogs,
  locks,
  secondaryMode,
  twoFonts,
  spacing,
  font,
  headerFont,
  buttonTextTransform,
}) => {
  const classes = useStyles();
  const handleChange = (e) => {
    console.log(e.target.id);
    const { id } = e.currentTarget;
    switch (id) {
      case "lock-header-font":
        return dispatch(setLocked({ ...locks, headerFont: !locks.headerFont }));
      case "complement":
      case "desaturate":
        return dispatch(setSecondaryMode(id));
      case "use-two-fonts":
        return dispatch(set2Fonts(!twoFonts));
      default:
        return;
    }
  };

  const handleClose = () => {
    return dispatch(setDialogs({ ...dialogs, settings: false }));
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={dialogs.settings}
      onClose={handleClose}
    >
      <DialogTitle disableTypography>
        <AppTypography variant="h4">Settings</AppTypography>
      </DialogTitle>
      <DialogContent dividers>
        <Locks />
        <Box my="20px">
          <AppTypography variant="h6">Lock</AppTypography>
        </Box>
        <Divider />
        <Box my="20px">
          <AppTypography variant="h6">Secondary color mode</AppTypography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              id="change-secondary-mode"
              value={secondaryMode}
              onChange={(e) => dispatch(setSecondaryMode(e.target.value))}
            >
              <FormControlLabel
                classes={{ label: classes.label }}
                id="complement"
                value="complement"
                label="Complement"
                control={<Radio />}
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                id="desaturate"
                value="desaturate"
                label="Desaturate"
                control={<Radio />}
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                id="saturate"
                value="saturate"
                label="Saturate"
                control={<Radio />}
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                id="darken"
                value="darken"
                label="Darken"
                control={<Radio />}
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                id="lighten"
                value="lighten"
                label="Lighten"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Divider />
        <Box my="20px">
          <AppTypography variant="h6">Spacing</AppTypography>
          <Slider
            min={0}
            max={50}
            value={spacing}
            valueLabelDisplay="auto"
            onChange={(e, v) => {
              dispatch(setSpacing(v));
            }}
            classes={{ valueLabel: classes.label }}
          />
        </Box>
        <Divider />
        <Box my="20px">
          <AppTypography variant="h6">Fonts</AppTypography>
          <FormControlLabel
            control={
              <Switch
                id="use-two-fonts"
                onChange={handleChange}
                checked={twoFonts}
              />
            }
            label="Two Fonts?"
            classes={{ label: classes.label }}
          />
        </Box>
        <Divider />
        <Box my="20px">
          <AppTypography variant="h6">Buttons</AppTypography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              id="change-button-text-transform"
              value={buttonTextTransform}
              onChange={(e) => dispatch(setButtonTextTransform(e.target.value))}
            >
              <FormControlLabel
                classes={{ label: classes.label }}
                id="uppercase"
                value="uppercase"
                label="UPPERCASE"
                control={<Radio />}
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                id="capitalize"
                value="capitalize"
                label="Capitalize"
                control={<Radio />}
              />
              <FormControlLabel
                classes={{ label: classes.label }}
                id="lowercase"
                value="lowercase"
                label="lowercase"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button style={{ fontFamily: "Roboto" }} onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  dialogs: state.dialogs,
  locks: state.locked,
  secondaryMode: state.secondaryMode,
  spacing: state.spacing,
  twoFonts: state.twoFonts,
  font: state.font,
  headerFont: state.headerFont,
  buttonTextTransform: state.buttonTextTransform,
});

export default connect(mapStateToProps)(Settings);
