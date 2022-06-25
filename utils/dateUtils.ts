export const toDateTimeString = (today: Date): string => {
  let date = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;
  return date;
};
