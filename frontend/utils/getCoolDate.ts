const niceFilter: any[] = [
  { unit: 31536000000, nice: "년" },
  { unit: 2592000000, nice: "달" },
  { unit: 86400000, nice: "일" },
  { unit: 3600000, nice: "시간" },
  { unit: 60000, nice: "분" },
  { unit: 1000, nice: "초" },
];

export default (lastModifiedDate: string) => {
  const emptyString = "";
  if (!lastModifiedDate) {
    return emptyString;
  }
  const lastDateTime = new Date(lastModifiedDate).getTime();
  if (lastModifiedDate !== lastModifiedDate) {
    return emptyString;
  }
  const diffTime = new Date().getTime() - lastDateTime;
  if (diffTime < 0) return emptyString;
  return niceFilter.reduce((accum, { unit, nice }) => {
    if (accum) return accum;
    const d = Math.floor(diffTime / unit);
    return d === 0 ? emptyString : `${d}${nice} 전`;
  }, emptyString);
}