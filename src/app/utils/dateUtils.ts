import { isValid, parse } from 'date-fns';

export function parseInconsistentDate(dateString: string) {
  const formats = ['yyyy-MM-dd', 'dd-MM-yyyy', 'dd/MM/yyyy', 'dd/MM/yy', 'yy/dd/MM'];

  for (let format of formats) {
    const date = parse(dateString, format, new Date());
    if (isValid(date)) return date;
  }
  return new Date();
}
