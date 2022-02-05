const range = (start: number, end: number): number[] => {
  const list = [];
  for (let i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
};

export default range;
