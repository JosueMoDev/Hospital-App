import { PaginationDto } from "@domain/dtos";
import { PaginationEntity, ClinicEntity } from "@domain/entities";
import { ClinicRepository } from "@domain/repositories";


interface FindManyClinicsUseCase {
  execute(
    paginationDto: PaginationDto,
    sort?: string | undefined,
  ): Promise<{ pagination: PaginationEntity; clinics: ClinicEntity[] }>;
}

export class FindManyClinics implements FindManyClinicsUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}
  async execute(
    paginationDto: PaginationDto,
    sort?: string | undefined,
  ): Promise<{ pagination: PaginationEntity; clinics: ClinicEntity[] }> {
    return this.clinicRepository.findMany(paginationDto, sort);
  }
}
