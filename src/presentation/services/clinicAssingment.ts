import { AccountEntity, ClinicAssignmentRepository, ClinicAssignmentDto } from "../../domain";

export class ClinicAssignmentService {

    constructor(private readonly repository: ClinicAssignmentRepository) { }

    public async gettingAssignableDoctor(): Promise<AccountEntity[]> {
        return await this.repository.getAssingnableDoctors();
    };

    public async creatingClinicAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
        return await this.repository.createAssignment(dto);
    }

    public async updatingClinicAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
        return await this.repository.updateAssignment(dto);
    }

    public async deletingClinicAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
        return this.repository.deleteAssignment(dto);
    }

}