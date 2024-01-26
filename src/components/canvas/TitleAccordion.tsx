import React from "react";
import FormatTextToolbar from "../FormatTextToolbar";
import useCanvasStore from "../../stores/canvasStore";

const TitleAccordion = () => {
  const {
    title: { isBold },
    setTitleIsBold,
  } = useCanvasStore();

  return (
    <>
      <FormatTextToolbar
        formatStates={{ isBold }}
        setFormatStates={{ setBold: setTitleIsBold }}
      />
    </>
  );
};

export default TitleAccordion;
