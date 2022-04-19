export const formatDate = (date?: number) => {
  if (!date) { return; }
  const dateObj = new Date(date * 1000);
  return dateObj.toLocaleDateString([], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
};
