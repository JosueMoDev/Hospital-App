import { Gender, Role } from "@prisma/client";

export const seedData = {
  users: [
    {
      duiNumber: "000007907",
      email: "josuemodev124@gmail.com",
      password: "$2a$10$4UpvCCRfjtYHc64mytUPTulbxNSY.INhfTOxpE0EPVHR.hmIWPkIa",
      name: "josuemo",
      lastname: "echeverria",
      gender: Gender.MALE,
      phone: "60436759",
      isValidated: false,
      isAssignable: true,
      role: Role.DOCTOR,
      photoUrl: "",
      photoId: "",
    },
    {
      duiNumber: "048507000",
      email: "jonasjosuemorales@gmail.com",
      password: "$2a$10$59YsLDm.C1XEJQLI4Fa.Zu888hR0RSAa3IYQ35v.o0kzeHrJPmUB6",
      name: "josue",
      lastname: "morales",
      gender: Gender.MALE,
      phone: "60436759",
      isValidated: false,
      isAssignable: false,
      role: Role.ADMIN,
      photoUrl:
        "https://res.cloudinary.com/the-clinic-app/image/upload/v1721430477/admins/65bcf9df2ad1b0f93e96173a.jpeg.jpg",
      photoId: "admins/65bcf9df2ad1b0f93e96173a.jpeg",
    },
  ],
};