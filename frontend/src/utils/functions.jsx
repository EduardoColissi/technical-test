export const cpfMask = (value) => {
  if (!value) return "";
  let mask = value.replace(/\D/g, "");
  mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
  mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
  mask = mask.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return mask;
};

export const removeCpfMask = (value) => {
  if (!value) return "";
  let mask = value.replace(".", "");
  mask = mask.replace(".", "");
  mask = mask.replace("-", "");
  return mask;
};
