export function mapSizesToProps(sizes: any) {
  const { width } = sizes;
  return {
    isMobileMode: width < 768,
  };
}
