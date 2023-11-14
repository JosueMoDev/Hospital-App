import 'reflect-metadata'
// import { Doctors, createAssignmentDto } from "./domain/dtos/assignment/createAssignment.dto";

import { CreateClinicDto } from "./domain/dtos/clinic/createClinic.dto";

(async () => {
  main();
})();

async function main() {
  const [error, loginDto] = CreateClinicDto.create({
    registerNumber: '123456789',
    name: 'Clinica dental la foca',
    phone:'23820789',
    address: {
      street: '2da avenida norte',
      city: 'Sensuntepeque',
      province: 'Cabanas'
    },
    createdBy: '65455f45fd3f25bfdd5f58a2'
  })
  console.log({ error, loginDto})
}
