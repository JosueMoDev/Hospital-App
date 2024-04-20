import { AllowedFolder, DateFnsAdapter, prisma } from "../../config";
import { ClinicDataSource, ClinicEntity, UpdateClinicDto, PaginationDto, CreateClinicDto, CustomError, PaginationEntity, UploadDto } from "../../domain";
import { FileService } from "../../presentation";
import { FileRepositoryImpl, FileDataSourceImpl } from "../../infraestructure";
import { UploadedFile } from "express-fileupload";

export class ClinicDataSourceImpl implements ClinicDataSource {

  private readonly datasource = new FileDataSourceImpl();
  private readonly repository = new FileRepositoryImpl(this.datasource);
  private readonly fileservice = new FileService(this.repository);


  async uploadPhoto(dto: UploadDto, file: UploadedFile): Promise<boolean> {
    const { id, lastUpdate } = dto;
    const clinic = await this.findOneById(id);
    if (!file) throw CustomError.badRequest("File no enviado");
    const { fileUrl, fileId } = await this.fileservice.uploadingFile({
      file: {
        ...file,
        name: clinic.id
      },
      args: {
        folder: AllowedFolder.clinic,
        public_id: clinic.id
      }
    });
    const updateClinicPhoto = await prisma.clinic.update({
      where: { id: id },
      data: {
        photoId: fileId,
        photoUrl: fileUrl,
        lastUpdate: [...clinic.lastUpdate],
      },
    });
    if (updateClinicPhoto) return true;
    return false;
  }

  async deletePhoto(dto: any): Promise<any> {
    const clinic = await this.findOneById(dto.id);
    if (!clinic.photoUrl.length && !clinic.photoId.length) throw CustomError.notFound('that clinic not have any photo associeted');

    const { result } = await this.fileservice.deletingFile(clinic.photoId);
    if (result === 'not found') throw CustomError.internalServer('we couldnt delete photo');
    const clinicUpdated = await prisma.clinic.update({
      where: { id: dto.id },
      data: {
        photoId: '',
        photoUrl: '',
        lastUpdate: [...clinic.lastUpdate, {
          account: dto.lastUpdate.account,
          date: DateFnsAdapter.formatDate(),
          action: "UPDATE ACCOUNT",
        },]
      }
    });

    if (!clinicUpdated) return false;
    return true;
  }

  async findOneById(id: string): Promise<ClinicEntity> {
    const clinic = await prisma.clinic.findFirst({
      where: { id: id },
    });

    if (!clinic) throw CustomError.badRequest("Any clinic found");

    return ClinicEntity.fromObject(clinic);
  }


  async findMany(
    dto: PaginationDto,
    sort?: string | undefined,
  ): Promise<{ pagination: PaginationEntity; clinics: ClinicEntity[] }> {
    const sortting = sort !== undefined ? sort === "true" ? true : false : undefined;
    const { page: currentPage, pageSize } = dto;
    const [clinics, total] = await Promise.all([
      prisma.clinic.findMany({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        where: {
          status: sortting,
        },
      }),
      prisma.clinic.count({ where: { status: sortting } }),
    ]);
    const totalPages = Math.ceil(total / pageSize);

    const nextPage =
      currentPage < totalPages
        ? `/api/record/find-many?page=${currentPage + 1}&pageSize=${pageSize}`
        : null;

    const previousPage =
      currentPage > 1
        ? `/api/record/find-many?page=${currentPage - 1}&pageSize=${pageSize}`
        : null;

    const pagination = PaginationEntity.pagination({
      currentPage,
      total,
      pageSize,
      nextPage,
      previousPage,
    });
    const clinicsMapped = clinics.map(ClinicEntity.fromObject);
    return { pagination, clinics: clinicsMapped };
  }

  async create(dto: CreateClinicDto): Promise<ClinicEntity> {
    try {
      const newClinic = await prisma.clinic.create({
        data: {
          ...dto,
          createdAt: DateFnsAdapter.formatDate(),
        },
      });
      return ClinicEntity.fromObject(newClinic);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async update(dto: UpdateClinicDto): Promise<ClinicEntity> {
    const { id, lastUpdate, ...rest } = dto;

    if (Object.keys(rest).length === 0)
      throw CustomError.badRequest("Nothing to update");

    const clinic = await this.findOneById(id);

    if (rest.address)
      rest.address = {
        ...clinic.address,
        ...rest.address,
      };

    try {
      const clinicUpdated = await prisma.clinic.update({
        where: { id: id },
        data: {
          ...rest,
          lastUpdate: [
            ...clinic.lastUpdate,
            {
              account: lastUpdate.account,
              date: DateFnsAdapter.formatDate(),
              action: "UPDATE CLINIC",
            },
          ],
        },
      });
      return ClinicEntity.fromObject(clinicUpdated);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async changeStatus(dto: UpdateClinicDto): Promise<ClinicEntity> {
    const clinic = await this.findOneById(dto.id);
    try {
      const clinicInvalidated = await prisma.clinic.update({
        where: {
          id: clinic.id,
        },
        data: {
          status: !clinic.status,
          lastUpdate: [
            ...clinic.lastUpdate,
            {
              ...dto.lastUpdate,
              date: DateFnsAdapter.formatDate(),
              action: "CHANGE CLINIC STATUS",
            },
          ],
        },
      });
      return ClinicEntity.fromObject(clinicInvalidated);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}