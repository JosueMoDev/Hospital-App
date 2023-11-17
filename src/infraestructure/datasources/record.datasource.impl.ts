import { RecordDataSource, RecordEntity } from "../../domain";

export class RecordDataSourceImpl implements RecordDataSource {
    
    async findMany(): Promise<RecordEntity[]> {
        throw new Error("Method not implemented.");
    }
    async create(dto: any): Promise<RecordEntity> {
        return dto;
    }
    async uptate(dto: any): Promise<RecordEntity> {
        throw new Error("Method not implemented.");
    }
    async hiddeRecords(id: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }

}