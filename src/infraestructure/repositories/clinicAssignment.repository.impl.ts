import { CLinicAssignmentDataSource, ClinicAssignmentEntity, CreateClinicAssignmentDto } from "../../domain";
import { ClinicAssignmentRepository } from '../../domain/repositories/clinicAssignment.repository';

export class ClinicAssignmentRepositoryImpl implements ClinicAssignmentRepository {

    constructor(private readonly datasourse: CLinicAssignmentDataSource) { }

    createAssignment(dto: CreateClinicAssignmentDto): Promise<ClinicAssignmentEntity> {
        return this.datasourse.createAssignment(dto);
    }
    updateAssignment(dto: any): Promise<ClinicAssignmentEntity> {
        return this.datasourse.updateAssignment(dto);
    }
    deleteAssignment(id: string): Promise<boolean> {
        return this.datasourse.deleteAssignment(id);
    }
}