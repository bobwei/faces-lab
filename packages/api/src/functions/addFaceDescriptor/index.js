const fn = ({ canvas, faceapi }) => async (row) => {
  const { display_url: imgUrl } = row;
  const img = await canvas.loadImage(imgUrl);
  const faceDescriptors = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  if (faceDescriptors.length === 1) {
    const [faceDescriptor] = faceDescriptors;
    const descriptor = Array.from(faceDescriptor.descriptor);
    return { ...row, faceDescriptor: { descriptor } };
  }
  return { ...row, faceDescriptor: {} };
};

export default fn;
