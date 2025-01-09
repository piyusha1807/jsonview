export function formatTimestamp(timestamp): any {
  if (!timestamp) {
    return '';
  }
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function getColor(value) {
  return typeof value === 'string'
    ? 'rgb(83, 83, 83)'
    : typeof value === 'number'
      ? 'rgb(253, 0, 121)'
      : typeof value === 'boolean'
        ? 'rgb(116, 135, 0)'
        : value === null
          ? 'rgb(175, 175, 175)'
          : 'black';
}
