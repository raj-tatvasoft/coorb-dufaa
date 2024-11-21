export const checkIsIcon = (imagePath: string) => {
  const extenstion = imagePath.split(".")?.pop()?.toLowerCase();

  const iconsExtension = ["png", "jpg", "jpeg", "svg"];

  return iconsExtension.find((x) => x === extenstion);
};
