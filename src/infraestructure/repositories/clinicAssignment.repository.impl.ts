import { CLinicAssignmentDataSource } from '@domain/datasources';
import { ClinicAssignmentDto } from '@domain/dtos';
import { AccountEntity } from '@domain/entities';
import { ClinicAssignmentRepository } from '@domain/repositories';

export class ClinicAssignmentRepositoryImpl
  implements ClinicAssignmentRepository
{
  constructor(private readonly datasourse: CLinicAssignmentDataSource) {}
  getAssignedDoctors(id: string): Promise<AccountEntity[]> {
    return this.datasourse.getAssignedDoctors(id);
  }

  getAssingnableDoctors(): Promise<AccountEntity[]> {
    return this.datasourse.getAssingnableDoctors();
  }

  createAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
    return this.datasourse.createAssignment(dto);
  }
  updateAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
    return this.datasourse.updateAssignment(dto);
  }
  deleteAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
    return this.datasourse.deleteAssignment(dto);
  }
}
