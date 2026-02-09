export const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;

  return (
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 1)
  );
};
