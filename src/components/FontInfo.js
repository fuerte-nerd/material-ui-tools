import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Popover } from "@material-ui/core";
import { setFontInfo } from "../state/display/actions";

const FontInfo = ({ dispatch, isOpen, body, header }) => {
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.addEventListener("mouseover", (e) => {
      setMouseLocation({ x: e.clientX, y: e.clientY });
    });

    document.addEventListener("mouseout", (e) => {
      dispatch(setFontInfo({ isOpen: false }));
    });
  }, []);

  return (
    <Popover
      open={isOpen}
      anchorReference="anchorPosition"
      anchorPosition={{ top: mouseLocation.y, left: mouseLocation.x }}
    >
      Hello
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.display.fontInfo.isOpen,
  body: state.appState.current.body.family,
  header: state.appState.current.header.family,
});

export default connect(mapStateToProps)(FontInfo);