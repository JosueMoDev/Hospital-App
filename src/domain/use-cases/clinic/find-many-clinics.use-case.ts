import {
  ClinicEntity,
  ClinicRepository,
  PaginationEntity,
} from "../../../domain";
import { PaginationDto } from "../../dtos/pagination/pagination.dto";

interface FindManyClinicsUseCase {
  execute(
    paginationDto: PaginationDto,
    sort?: string | undefined
  ): Promise<{ pagination: PaginationEntity; clinics: ClinicEntity[] }>;
}

export class FindManyClinics implements FindManyClinicsUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}
  async execute(
    paginationDto: PaginationDto,
    sort?: string | undefined
  ): Promise<{ pagination: PaginationEntity; clinics: ClinicEntity[] }> {
    return this.clinicRepository.findMany(paginationDto, sort);
  }
}
