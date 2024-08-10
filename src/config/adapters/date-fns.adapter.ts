import { format, addHours } from 'date-fns';
export class DateFnsAdapter {
  static formatDate(): Date {
    return addHours(new Date(), -6);
  }
  static formatDates(date: string): Date {
    return addHours(new Date(date), 1);
  }

  static formatedDateTime() {
    return format(new Date(), 'MM/dd/yyyy, hh:mm:ss a');
  }
}
