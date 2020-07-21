import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setLoadingScreen } from "../state/display/actions";
import { Dialog, Box, CircularProgress } from "@material-ui/core";
import AppTypography from "./AppTypography";
import { setLoadScreenFeedback } from "../state/feedback/actions";

const FontLoadScreen = ({
  dispatch,
  componentsLoading,
  loadingScreen,
  loadScreenFeedback,
  bodyFontIsLoading,
  headerFontIsLoading,
  twoFonts,
}) => {
  useEffect(() => {
    dispatch(setLoadingScreen(componentsLoading));
    //eslint-disable-next-line
  }, [componentsLoading]);

  useEffect(() => {
    if (typeof bodyFontIsLoading !== null) {
      const label = twoFonts ? "body font" : "font";
      bodyFontIsLoading
        ? dispatch(
            setLoadScreenFeedback([
              ...loadScreenFeedback,
              `Loading ${label}...`,
            ])
          )
        : dispatch(
            setLoadScreenFeedback([
              ...loadScreenFeedback,
              `${label.charAt(0).toUpperCase() + label.substr(1)} loaded.`,
            ])
          );
    }
    //eslint-disable-next-line
  }, [bodyFontIsLoading]);

  useEffect(() => {
    if (twoFonts) {
      headerFontIsLoading
        ? dispatch(
            setLoadScreenFeedback([
              ...loadScreenFeedback,
              `Loading header font...`,
            ])
          )
        : dispatch(
            setLoadScreenFeedback([
              ...loadScreenFeedback,
              `Header font loaded.`,
            ])
          );
    }
    //eslint-disable-next-line
  }, [headerFontIsLoading]);

  return (
    <Dialog
      fullScreen
      open={loadingScreen}
      transitionDuration={{ enter: 0, exit: 50 }}
    >
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <CircularProgress size={80} color="primary" />
        <Box mt="15px">
          {loadScreenFeedback.map((message) => (
            <AppTypography>{message}</AppTypography>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  componentsLoading: state.components.loading,
  loadingScreen: state.display.loadingScreen,
  loadScreenFeedback: state.feedback.loadScreenFeedback,
  bodyFontIsLoading: state.components.fonts.body.isLoading,
  headerFontIsLoading: state.components.fonts.header.isLoading,
  twoFonts: state.settings.twoFonts,
});

export default connect(mapStateToProps)(FontLoadScreen);
