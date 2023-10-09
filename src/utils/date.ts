import { format } from 'date-fns';

export const formatToDayMonthTime12H = (timestamp: Date) => {
  const date = new Date(timestamp);
  const pattern = 'dd MMM hh:mm a';
  return format(date, pattern);
};
