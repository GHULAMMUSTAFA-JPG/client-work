export const isValidUrl = (url: string | undefined) => {
  try {
    if (!url) return false;
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};
