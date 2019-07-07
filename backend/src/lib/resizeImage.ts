import appRoot from 'app-root-path';
import path from 'path';
import sharp from 'sharp';

const fileSizes: any = {
  xs: {
    width: 100,
    height: 100,
  },
  sm: {
    width: 300,
    height: 300,
  },
  md: {
    width: 500,
    height: 500,
  },
  lg: {
    width: 800,
    height: 800,
  },
  xlg: {
    width: 1200,
    height: 1200,
  },
};

export const resizeImage = async (
  filepath: string,
  filename: string,
  ext: string,
  sizes: Array<string>
) => {
  const newFilenames: any = {};
  for (const size of sizes) {
    const fileSize = fileSizes[size];
    if (!!fileSize) {
      const newFilename = `${filename}-${size}.${ext}`;
      const newFilePath = path.join(appRoot.path, 'uploads/', newFilename);
      await sharp(filepath)
        .resize(fileSize.width, fileSize.height, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFile(newFilePath);
      newFilenames[size] = newFilename;
    }
  }
  return newFilenames;
};
