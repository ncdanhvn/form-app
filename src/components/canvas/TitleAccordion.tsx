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
      fontFamily,
      setFontFamily,
    },
  } = useCanvasStore();

  return (
    <>
      <FormatTextToolbar
        formatStates={{
          isBold,
          isItalic,
          isUnderline,
          align,
          fontSize,
          fontFamily,
        }}
        setFormatStates={{
          setBold: setTitleIsBold,
          setItalic: setTitleIsItalic,
          setUnderline: setTitleIsUnderline,
          setAlign: setTitleAlign,
          setFontSize,
          setFontFamily,
        }}
      />
    </>
  );
};

export default TitleAccordion;
