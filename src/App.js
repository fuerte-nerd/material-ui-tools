import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Container,
  Dialog,
  Toolbar,
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  Box,
  Fab,
  Tooltip,
  responsiveFontSizes,
} from "@material-ui/core";

import { Refresh, Lock } from "@material-ui/icons";

import Menu from "./components/Menu";
import FontLoadDialog from "./components/FontLoadDialog";
import ThemeCode from "./components/ThemeCode";
import TypographySection from "./components/Typography";
import Buttons from "./components/Buttons";
import Sidebar from "./components/Sidebar";
import ParagraphPreview from "./components/ParagraphPreview";
import theme from "./components/theme";

import {
  setFontLoading,
  setFonts,
  setFont,
  setPrimary,
  setSecondary,
  setStaticFont,
  setHeaderFont,
  setColorPicker,
  setFontPicker,
  setRandomFontSelect,
  setChangeHistory,
  setUndo,
} from "./state/actions";
import randomFont from "./functions/randomFont";
import randomColor from "./functions/randomColor";
import getSecondaryColor from "./functions/getSecondaryColor";
import FontFaceObserver from "fontfaceobserver";
import { SketchPicker } from "react-color";
import FontPicker from "./components/FontPicker";

function App(props) {
  const {
    dispatch,
    mode,
    font,
    headerFont,
    twoFonts,
    fonts,
    secondaryMode,
    primary,
    secondary,
    staticFontLoaded,
    spacing,
    buttonTextTransform,
    rounding,
    fontSize,
    colorPicker,
    fontPicker,
    randomFontSelect,
    responsiveText,
    backgrounds,
    locked,
    changeHistory,
    undo,
  } = props;

  useEffect(() => {
    dispatch(setPrimary(randomColor()));
    axios
      .get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_APIKEY}`
      )
      .then((response) => {
        const fonts = response.data.items.map((i, ind) => {
          return {
            id: ind,
            linkName: i.family.replace(/ /g, "+"),
            themeName: i.family,
            category: i.category,
          };
        });
        dispatch(setFonts(fonts));
      });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(setSecondary(getSecondaryColor(primary, secondaryMode)));
    //eslint-disable-next-line
  }, [primary, secondaryMode]);

  useEffect(() => {
    if (!staticFontLoaded) {
      const staticFont = new FontFaceObserver("Roboto");
      staticFont.load().then(
        () => {
          dispatch(setStaticFont(true));
        },
        () => {}
      );
    }
    fonts && dispatch(setFont(randomFont()));
    fonts && dispatch(setHeaderFont(randomFont()));
    //eslint-disable-next-line
  }, [fonts]);

  useEffect(() => {
    if (fonts && font) {
      const newFont = new FontFaceObserver(font.themeName);
      newFont.load().then(
        () => {
          dispatch(setFontLoading(false));
        },
        async () => {
          if (randomFontSelect) {
            await dispatch(
              setChangeHistory({
                ...changeHistory,
                changes: changeHistory.changes.slice(
                  0,
                  changeHistory.currentPosition + 1
                ),
                currentPosition: changeHistory.changes.length - 1,
              })
            );
            dispatch(setFont(randomFont()));
          } else {
            await dispatch(
              setChangeHistory({
                ...changeHistory,
                changes: changeHistory.changes.slice(
                  0,
                  changeHistory.currentPosition + 1
                ),
                currentPosition: changeHistory.changes.length - 1,
              })
            );
            await dispatch(setUndo(true));
            dispatch(setFont(fontPicker.revertFont));
            await dispatch(setUndo(false));
            dispatch(setFontPicker({ ...fontPicker, notFound: true }));
          }
        }
      );
    }
    //eslint-disable-next-line
  }, [font]);

  useEffect(() => {
    if (fonts && headerFont && twoFonts) {
      const newFont = new FontFaceObserver(headerFont.themeName);
      newFont.load().then(
        () => {
          dispatch(setFontLoading(false));
        },
        async () => {
          if (randomFontSelect) {
            await dispatch(
              setChangeHistory({
                ...changeHistory,
                changes: changeHistory.changes.slice(
                  0,
                  changeHistory.currentPosition + 1
                ),
                currentPosition: changeHistory.changes.length - 1,
              })
            );
            dispatch(setHeaderFont(randomFont()));
          } else {
            await dispatch(
              setChangeHistory({
                ...changeHistory,
                changes: changeHistory.changes.slice(
                  0,
                  changeHistory.currentPosition + 1
                ),
                currentPosition: changeHistory.changes.length - 1,
              })
            );
            await dispatch(setUndo(true));
            dispatch(setHeaderFont(fontPicker.revertFont));
            await dispatch(setUndo(false));
            dispatch(setFontPicker({ ...fontPicker, notFound: true }));
          }
        }
      );
    }
    //eslint-disable-next-line
  }, [headerFont]);

  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    if (!undo && fonts) {
      if (timerId) {
        clearTimeout(timerId);
      }
      if (changeHistory.currentPosition === changeHistory.changes.length - 1) {
        return setTimerId(
          setTimeout(() => {
            dispatch(
              setChangeHistory({
                ...changeHistory,
                currentPosition: changeHistory.changes.length,
                changes: [
                  ...changeHistory.changes,
                  { font, headerFont, primary },
                ],
              })
            );
          }, 500)
        );
      } else {
        return setTimerId(
          setTimeout(() => {
            const newArray = changeHistory.changes.slice(
              0,
              changeHistory.currentPosition + 1
            );
            dispatch(
              setChangeHistory({
                ...changeHistory,
                currentPosition: newArray.length,
                changes: [...newArray, { font, headerFont, primary }],
              })
            );
          }, 500)
        );
      }
    }
    //eslint-disable-next-line
  }, [font, headerFont, primary]);

  return (
    <ThemeProvider
      theme={theme && responsiveText ? responsiveFontSizes(theme) : theme}
    >
      <CssBaseline />
      <Helmet>
        {fonts && (
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
        )}
        {twoFonts && font && headerFont ? (
          <link
            href={`https://fonts.googleapis.com/css2?family=${font.linkName}&family=${headerFont.linkName}&display=swap`}
            rel="stylesheet"
          />
        ) : (
          font && (
            <link
              href={`https://fonts.googleapis.com/css2?family=${font.linkName}&display=swap`}
              rel="stylesheet"
            />
          )
        )}
      </Helmet>
      <FontPicker />
      <Dialog
        open={colorPicker}
        onClose={() => dispatch(setColorPicker(false))}
        PaperProps={{ style: { backgroundColor: "transparent" } }}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <SketchPicker
          color={primary}
          onChange={(c) => dispatch(setPrimary(c.hex))}
        />
      </Dialog>
      <Sidebar />
      <FontLoadDialog />
      <ThemeCode />
      <Box
        minHeight="100vh"
        maxWidth="100vw"
        bgcolor={backgrounds.page}
        style={{ transition: "all .25s" }}
        py={4}
      >
        <Tooltip title="Refresh">
          <Fab
            style={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              zIndex: 5,
            }}
            color="secondary"
            disabled={
              twoFonts
                ? locked.bodyFont && locked.headerFont && locked.palette
                  ? true
                  : false
                : locked.bodyFont && locked.palette
                ? true
                : false
            }
            onClick={() => {
              !locked.bodyFont &&
                dispatch(setRandomFontSelect(true)) &&
                dispatch(setFontLoading(true));
              twoFonts &&
                !locked.headerFont &&
                dispatch(setRandomFontSelect(true)) &&
                dispatch(setFontLoading(true));
              !locked.palette && dispatch(setPrimary(randomColor()));
            }}
          >
            {twoFonts ? (
              locked.bodyFont && locked.headerFont && locked.palette ? (
                <Lock />
              ) : (
                <Refresh />
              )
            ) : locked.bodyFont && locked.palette ? (
              <Lock />
            ) : (
              <Refresh />
            )}
          </Fab>
        </Tooltip>
        <Menu />
        <Toolbar />
        <Container>
          <ParagraphPreview />
          <TypographySection />
          <Buttons />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  font: state.font,
  fonts: state.fonts,
  primary: state.primary,
  secondary: state.secondary,
  mode: state.mode,
  fontLoading: state.fontLoading,
  secondaryMode: state.secondaryMode,
  staticFontLoaded: state.staticFontLoaded,
  spacing: state.spacing,
  headerFont: state.headerFont,
  twoFonts: state.twoFonts,
  buttonTextTransform: state.buttonTextTransform,
  rounding: state.rounding,
  fontSize: state.fontSize,
  colorPicker: state.colorPicker,
  fontPicker: state.fontPicker,
  randomFontSelect: state.randomFontSelect,
  responsiveText: state.responsiveText,
  backgrounds: state.backgrounds,
  locked: state.locked,
  changeHistory: state.changeHistory,
  undo: state.undo,
});

export default connect(mapStateToProps)(App);
