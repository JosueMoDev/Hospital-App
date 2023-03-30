const getMenuFrontEnd = (role) => {
  const menu = [
    {
      tittle: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Progress Bar",
          url: "progress",
        },
        {
          name: "Charts",
          url: "chart",
        },
        {
          name: "Promises",
          url: "promise",
        },
        {
          name: "RXJS",
          url: "rxjs",
        },
      ],
    },
    {
      tittle: "Apps",
      icon: "mdi mdi-bullseye",
      submenu: [
        {
          name: "Hospitals",
          url: "hospitals",
        },
        {
          name: "Doctors",
          url: "doctors",
        },
      ],
    },
  ];
  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({
      name: "Users",
      url: "users",
    });
  }

  return menu;
};
module.exports = { getMenuFrontEnd };
