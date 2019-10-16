import createFaceDescriptors from '../createFaceDescriptors';

const fn = async (data) => {
  const { source } = data;
  const descriptors = await createFaceDescriptors(source).catch(() => []);
  return descriptors.map((descriptor) => ({ ...data, ...descriptor }));
};

export default fn;
