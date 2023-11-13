import { prisma } from "./config/constant/primisaClient";

(async () => {
  main();
})();

async function main() {

    // await prisma.clinic.create({
    //     data: {
    //         registerNumber: 121212121222,
    //         name: 'Clinica dental',
    //         phone: '23232323',
    //         address: {
    //             street:"2da Av Ote",
    //             city:"Sensuntepeque",
    //             state:"cabañas"
    //         },
    //         photoURl:"",
    //         photoId:"",
    //         createdAt: new Date(),
    //         accountId: "6545b4e81107047ebbfef321"
    //     }
    // });

    await prisma.appointment.create({
        data: {
            startDate: new Date(),
            endDate: new Date(2023/11/5),
            doctorId:'6545b4e81107047ebbfef321',
            patientId: '6546661a34a50f2ceebd5744',
        }
    });
}
