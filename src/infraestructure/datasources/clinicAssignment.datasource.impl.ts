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
  public async getAssingnableDoctors(): Promise<AccountEntity[]> {
    const doctorsAvaibleToAssign = await prisma.account.findMany({
      where: {
        role: Role.DOCTOR,
        isAssignable: true,
      },
    });
    return doctorsAvaibleToAssign.map(AccountEntity.fromObject);
  }

  private async checkIfDoctorsExicist(
    doctors: any
  ): Promise<string[]> {
    const doctors_id = doctors.map((doctor: any) => doctor.doctor);
    const response = await prisma.account.findMany({
      where: {
        id: {
          in: doctors_id,
        },
        role: Role.DOCTOR,
      },
    });
    return response.map((doctor)=>doctor.id);
  }

  async createAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
    const { doctors, clinic } = dto;
    const doctorsAvaibleToAssign = await this.checkIfDoctorsExicist(doctors as []);

    const prismaTx = await prisma.$transaction(async (transaction) => {
      const assignments = doctorsAvaibleToAssign.map((doctor) => {
        return transaction.clinicAssignment.create({
          data: {
            clinicId: clinic,
            doctorId: doctor,
          },
        });
      });

      await Promise.all(assignments);

      const resp = await transaction.account.updateMany({
        where: {
          id: {
            in: doctorsAvaibleToAssign,
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
    const { doctors, clinic } = dto;
    const doctors_id = await this.checkIfDoctorsExicist(doctors as []);
    const prismaTx = await prisma.$transaction(async (transaction) => {

      const resp = await transaction.clinicAssignment.updateMany({
        where: {
          doctorId: {
            in: doctors_id,
          },
        },
        data: {
          clinicId: clinic
        },
      });
      return resp.count !== 0 ? true : false;
    });
    return prismaTx;
  }
  
  async deleteAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
    const { doctors, clinic } = dto;
    const doctors_id = await this.checkIfDoctorsExicist(doctors as []);
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
            in: doctors_id,
          },
        },
      });
      return resp.count !== 0 ? true : false;
    });
    return prismaTx;
  }
}
