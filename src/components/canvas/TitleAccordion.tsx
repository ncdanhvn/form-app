import React from "react";
import FormatTextToolbar from "../FormatTextToolbar";
import useCanvasStore from "../../stores/canvasStore";

const TitleAccordion = () => {
  const {
    title: {
      isBold,
      setTitleIsBold,
      isItalic,
      setTitleIsItalic,
      isUnderline,
      setTitleIsUnderline,
      align,
      setTitleAlign,
      fontSize,
      setFontSize,
    },
  } = useCanvasStore();

  return (
    <>
      <FormatTextToolbar
        formatStates={{ isBold, isItalic, isUnderline, align, fontSize }}
        setFormatStates={{
          setBold: setTitleIsBold,
          setItalic: setTitleIsItalic,
          setUnderline: setTitleIsUnderline,
          setAlign: setTitleAlign,
          setFontSize,
        }}
      />
    </>
  );
};

export default TitleAccordion;
