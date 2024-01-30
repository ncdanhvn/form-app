import html2canvas from "html2canvas";

export const onExport = async () => {
  const formElement = document.getElementById("targetCanvas");

  const canvasImage = await html2canvas(formElement!, {
    onclone: (_, element) => {
      if (element) element.scrollTop = 0;
    },
    windowWidth: 1100,
  });
  const image = resizeCanvas(canvasImage, 200).toDataURL("image/png");
  downloadThumbnail(image, "myFormThumbnail.png");
};

const resizeCanvas = (
  originalCanvas: HTMLCanvasElement,
  targetWidth: number
): HTMLCanvasElement => {
  // Calculate the new height to maintain the aspect ratio
  const aspectRatio = originalCanvas.height / originalCanvas.width;
  const targetHeight = targetWidth * aspectRatio;

  let resizedCanvas = document.createElement("canvas");
  let resizedContext = resizedCanvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  resizedCanvas.width = targetWidth;
  resizedCanvas.height = targetHeight;

  resizedContext.drawImage(
    originalCanvas,
    0,
    0,
    originalCanvas.width,
    originalCanvas.height,
    0,
    0,
    targetWidth,
    targetHeight
  );
  return resizedCanvas;
};

const downloadThumbnail = (
  imageDataUrl: string,
  filename = "thumbnail.png"
) => {
  const link = document.createElement("a");
  link.href = imageDataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
