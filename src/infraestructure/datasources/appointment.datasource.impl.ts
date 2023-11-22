import { prisma } from "../../config";
import { AppointmentDataSource, AppointmentEntity, CreateAppointmentDto, CustomError, PaginationDto, UpdateAppointmentDto } from "../../domain";

export class AppointmentDataSourceImpl implements AppointmentDataSource {

    async findOneById(id: string): Promise<AppointmentEntity> {
        return id as any;
    }
    async findMany(dto: PaginationDto): Promise<AppointmentEntity[]> {
        return dto as any;
    }
    async create(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
        try {
            const newAppointment = await prisma.appointment.create({
                data: {
                    startDate: new Date(dto.startDate),
                    endDate: new Date(dto.endDate),
                    doctorId: dto.doctor,
                    patientId: dto.patient,
                    accountId: dto.doctor,
                    createdAt: new Date()
                }
            });
            console.log(newAppointment)
            return AppointmentEntity.fromObject(newAppointment);
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    async update(dto: UpdateAppointmentDto): Promise<AppointmentEntity> {
        return dto as any;
    }
    async delete(id: string): Promise<AppointmentEntity> {
        return id as any;
    }

}