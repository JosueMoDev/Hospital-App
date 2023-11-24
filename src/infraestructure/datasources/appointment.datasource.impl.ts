import { prisma } from "../../config";
import { AppointmentDataSource, AppointmentEntity, CreateAppointmentDto, CustomError, PaginationDto, UpdateAppointmentDto } from "../../domain";

export class AppointmentDataSourceImpl implements AppointmentDataSource {

    async findOneById(id: string): Promise<AppointmentEntity> {
        const appointment = await prisma.appointment.findFirst({
            where: {id: id}
        });
        if(!appointment) throw CustomError.badRequest('Any appointment found');

        return AppointmentEntity.fromObject(appointment);
    }

    async findMany(dto: PaginationDto): Promise<AppointmentEntity[]> {
        return dto as any;
    }

    async create(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
        try {
            const newAppointment = await prisma.appointment.create({
                data: {
                    ...dto,
                    startDate: new Date(dto.startDate),
                    endDate: new Date(dto.endDate),
                    createdAt: new Date()
                }
            });
            return AppointmentEntity.fromObject(newAppointment);
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    async update(dto: UpdateAppointmentDto): Promise<AppointmentEntity> {
        return dto as any;
    }
    async delete(id: string): Promise<AppointmentEntity> {
        await this.findOneById(id);
        const appointment = await prisma.appointment.delete({
            where: { id: id },
        });
        
        return AppointmentEntity.fromObject(appointment);
    }

}