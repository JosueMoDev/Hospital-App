import { Role } from "@prisma/client";
import { prisma } from "../../config";
import { AccountEntity, CLinicAssignmentDataSource, ClinicAssignmentEntity, CreateClinicAssignmentDto } from "../../domain";
Role
export class ClinicAssignmentDataSourceImpl implements CLinicAssignmentDataSource {
    
    public async getAssingnableDoctors(): Promise<AccountEntity[]> {
        const assignableDoctors = await prisma.account.findMany({
            where: {
                isAssignable: false,
                role: Role.DOCTOR
            },
        });
        return assignableDoctors.map(AccountEntity.fromObject);
    }

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