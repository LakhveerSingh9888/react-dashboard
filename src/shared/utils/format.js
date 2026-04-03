export const formatUserName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
