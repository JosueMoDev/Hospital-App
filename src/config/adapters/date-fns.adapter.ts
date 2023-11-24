import { format, addHours } from "date-fns"
export class DateFnsAdapter {
    static formatDate(date?: Date): Date {
        return addHours(new Date(), -6);
    }
}