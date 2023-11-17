import { ClinicAssignmentRepository, CreateClinicAssignmentDto } from "../../domain";
import { ClinicAssignmentEntity } from '../../domain/entities/clinicAssigment.entity';

export class ClinicAssignmentService {

    constructor(private readonly repository: ClinicAssignmentRepository){}

    public async creatingClinicAssignment(dto: CreateClinicAssignmentDto): Promise<ClinicAssignmentEntity> {
        return await this.repository.createAssignment(dto);
    }

}