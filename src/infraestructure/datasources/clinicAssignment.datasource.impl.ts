import { Role } from "@prisma/client";
import { prisma } from "../../config";
import { AccountEntity, CLinicAssignmentDataSource, ClinicAssignmentDto } from "../../domain";
export class ClinicAssignmentDataSourceImpl implements CLinicAssignmentDataSource {
    
    public async getAssingnableDoctors(): Promise<AccountEntity[]> {
        const assignableDoctors = await prisma.account.findMany({
            where: {
                isAssignable: true,
                role: Role.DOCTOR
            },
        });
        return assignableDoctors.map(AccountEntity.fromObject);
    }

    async createAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
        const { doctors, clinic } = dto;
        const doctors_id = doctors.map((doctor) => doctor.doctor);
        const prismaTx = await prisma.$transaction(async (transaction) => {

            const doctorsAvaibleToAssign = await transaction.account.findMany({
                where: {
                    id: {
                        in: doctors_id
                    },
                    role: Role.DOCTOR,
                    isAssignable: true
                }
            });


            const assignments = doctorsAvaibleToAssign.map((doctor) => {
              return transaction.clinicAssignment.create({
                data: {
                  clinicId: clinic,
                  doctorId: doctor.id,
                },
              });
            });

            await Promise.all(assignments);

           const resp = await transaction.account.updateMany({
                where: {
                    id: {
                        in: doctors_id
                    },
                },
                data: {
                    isAssignable: false
                }
            });

            return resp.count !== 0 ? true : false
       
        });
        return prismaTx
    }
    async updateAssignment(dto: any): Promise<boolean> {
        return dto as any;
    }
    async deleteAssignment(id: string): Promise<boolean> {
        return id as any;
    }

}