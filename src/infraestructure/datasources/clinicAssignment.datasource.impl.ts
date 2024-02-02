import { Role } from "@prisma/client";
import { prisma } from "../../config";
import { AccountEntity, CLinicAssignmentDataSource, ClinicAssignmentEntity, CreateClinicAssignmentDto } from "../../domain";
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

    async createAssignment(dto: CreateClinicAssignmentDto): Promise<ClinicAssignmentEntity | any> {
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

            await transaction.account.updateMany({
                where: {
                    id: {
                        in: doctors_id
                    },
                },
                data: {
                    isAssignable: false
                }
            });

            const assignmentResponse = await transaction.clinicAssignment.findMany({
                where: {
                    clinicId: clinic,
                },
                include: {
                    clinicAssignment_account_doctor: {
                        select: {
                            name: true,
                            lastname: true,
                            duiNumber: true,

                        }
                    },
                    clinicAssignment_clinic: {
                        select: {
                            name: true,
                            address: true
                        }
                    }
                }
            })
            console.log(assignmentResponse)
            return { assignmentResponse }
        });
        return ClinicAssignmentEntity.fromObject(prismaTx.assignmentResponse);
    }
    async updateAssignment(dto: any): Promise<ClinicAssignmentEntity> {
        return dto as any;
    }
    async deleteAssignment(id: string): Promise<boolean> {
        return id as any;
    }

}