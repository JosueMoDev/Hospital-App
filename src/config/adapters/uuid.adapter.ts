import { v4 } from 'uuid';

export class UuidAdapter {
    static uuidv4 = () => v4();
}