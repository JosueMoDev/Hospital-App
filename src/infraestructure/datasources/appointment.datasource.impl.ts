import { prisma, DateFnsAdapter } from "@config";
import { AppointmentDataSource } from "@domain/datasources";
import { PaginationDto, CreateAppointmentDto, UpdateAppointmentDto } from "@domain/dtos";
import { AppointmentEntity, PaginationEntity } from "@domain/entities";
import { CustomError } from "@handler-errors";


export class AppointmentDataSourceImpl implements AppointmentDataSource {
  async findOneById(id: string): Promise<AppointmentEntity> {
    const appointment = await prisma.appointment.findFirst({
      where: { id: id },
      include: {
        appointment_clinic: true,
        appointment_doctor: true,
        appointment_patient: true,
      },
    });
    if (!appointment) throw CustomError.badRequest('Any appointment found');

    return AppointmentEntity.fromObject(appointment);
  }

  async findMany(
    dto: PaginationDto,
  ): Promise<{
    pagination: PaginationEntity;
    appointments: AppointmentEntity[];
  }> {
    const { page: currentPage, pageSize } = dto;
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        include: {
          appointment_clinic: true,
          appointment_doctor: true,
          appointment_patient: true,
        },
      }),
      prisma.appointment.count(),
    ]);

    const appointmentsMapped = appointments.map(AppointmentEntity.fromObject);
    const pagination = PaginationEntity.setPagination({ ...dto, total });
    return { pagination, appointments: appointmentsMapped };
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
    if (Object.keys(rest).length === 0)
      throw CustomError.badRequest('Nothing to update');
    const appointment = await this.findOneById(id);

    if (rest.startDate) rest.startDate = new Date(dto.startDate!);
    if (rest.endDate) rest.endDate = new Date(dto.endDate!);

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
              action: 'UPDATE',
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
