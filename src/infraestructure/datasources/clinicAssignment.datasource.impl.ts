import { Role } from "@prisma/client";
import { prisma } from "../../config";
import {
  AccountEntity,
  CLinicAssignmentDataSource,
  ClinicAssignmentDto,
} from "../../domain";
export class ClinicAssignmentDataSourceImpl
  implements CLinicAssignmentDataSource
{
  public async getAssingnableDoctors(
    doctorsId?: string[]
  ): Promise<AccountEntity[]> {
    const doctorsAvaibleToAssign = await prisma.account.findMany({
      where: {
        id: {
          in: doctorsId,
        },
        role: Role.DOCTOR,
        isAssignable: true,
      },
    });
    return doctorsAvaibleToAssign.map(AccountEntity.fromObject);
  }


  async createAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
    const { doctors, clinic } = dto;
    const doctors_id = doctors.map((doctor) => doctor.doctor);
    const doctorsAvaibleToAssign = await this.getAssingnableDoctors(doctors_id);

    const prismaTx = await prisma.$transaction(async (transaction) => {
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
            in: doctors_id,
          },
        },
        data: {
          isAssignable: false,
        },
      });

      return resp.count !== 0 ? true : false;
    });
    return prismaTx;
  }
  async updateAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
    return dto as any;
  }
  async deleteAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
        const { doctors, clinic } = dto;
        const doctors_id = doctors.map((doctor) => doctor.doctor);
       
        const prismaTx = await prisma.$transaction(async (transaction) => {

          const resp = await transaction.account.updateMany({
            where: {
              id: {
                in: doctors_id,
              },
            },
            data: {
              isAssignable: true,
            },
          });

          await transaction.clinicAssignment.deleteMany({
            where: {
                clinicId: clinic,
                doctorId: {
                    in: doctors_id
                }
            }
          })
          return resp.count !== 0 ? true : false;
        });
        return prismaTx;
  }
}
