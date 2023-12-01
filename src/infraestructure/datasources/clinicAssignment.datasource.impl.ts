import { CLinicAssignmentDataSource, ClinicAssignmentEntity, CreateClinicAssignmentDto } from "../../domain";

export class ClinicAssignmentDataSourceImpl implements CLinicAssignmentDataSource {

    async createAssignment(dto: CreateClinicAssignmentDto): Promise<ClinicAssignmentEntity | any> {
        // TODO: check dto due to doctors fiels doesnt match
        const doctorsMapped = dto.doctors.map((doctor) => doctor.doctor);
        return { clinic: dto.clinic, doctor: doctorsMapped };
    }
    async updateAssignment(dto: any): Promise<ClinicAssignmentEntity> {
        return dto as any;
    }
    async deleteAssignment(id: string): Promise<boolean> {
        return id as any;
    }

}