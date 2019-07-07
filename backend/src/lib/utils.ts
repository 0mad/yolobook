export const seperateFilename = (filenameWithExt: string) => {
  const lastDotIdx = filenameWithExt.lastIndexOf('.');
  const filename = filenameWithExt.substring(0, lastDotIdx);
  const ext = filenameWithExt.substring(lastDotIdx + 1);

  return {
    ext,
    filename,
  };
};
