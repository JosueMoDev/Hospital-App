import { DateFnsAdapter, prisma } from "../../config";
import {
  AppointmentDataSource,
  AppointmentEntity,
  CreateAppointmentDto,
  CustomError,
  PaginationDto,
  PaginationEntity,
  UpdateAppointmentDto,
} from "../../domain";

export class AppointmentDataSourceImpl implements AppointmentDataSource {
  async findOneById(id: string): Promise<AppointmentEntity> {
    const appointment = await prisma.appointment.findFirst({
      where: { id: id },
    });
    if (!appointment) throw CustomError.badRequest("Any appointment found");

    return AppointmentEntity.fromObject(appointment);
  }

  async findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, appointments: AppointmentEntity[] }> {
    return dto as any;
  }

  async create(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
    try {
      const newAppointment = await prisma.appointment.create({
        data: {
          ...dto,
          startDate: new Date(dto.startDate),
          endDate: new Date(dto.endDate),
          createdAt: DateFnsAdapter.formatDate(),
        },
      });
      return AppointmentEntity.fromObject(newAppointment);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async update(dto: UpdateAppointmentDto): Promise<AppointmentEntity> {
    const { id, lastUpdate, ...rest }: any = dto;
    if (Object.keys(rest).length === 0) throw CustomError.badRequest("Nothing to update");
    const appointment = await this.findOneById(id);

    if (rest.startDate) rest.startDate = DateFnsAdapter.formatDates(dto.startDate!);
    if (rest.endDate) rest.endDate = DateFnsAdapter.formatDates(dto.endDate!);

    try {
      const appointmentUpdated = await prisma.appointment.update({
        where: { id: id },
        data: {
          ...rest,
          lastUpdate: [
            ...appointment.lastUpdate,
            {
              account: lastUpdate.account,
              date: DateFnsAdapter.formatDate(),
              action: "UPDATE ACCOUNT",
            },
          ],
        },
      });
      return AppointmentEntity.fromObject(appointmentUpdated);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async delete(id: string): Promise<AppointmentEntity> {
    await this.findOneById(id);
    const appointment = await prisma.appointment.delete({
      where: { id: id },
    });

    return AppointmentEntity.fromObject(appointment);
  }
}
