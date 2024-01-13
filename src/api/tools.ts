export const logger = {
  info(message: any) {
    console.log(message);
  },
  error(message: any) {
    console.error(message);
  },
};

export const prettyDate = (date: string) => {
  return date?.substring(0, 10) || '';
};
