const getSideNavOptions = (rol) => {
  const menu = [
    {
      title: "Appointments",
      icon: "event",
      url:"/dashboard/calendar"
    }
  ];
  if (rol === "admin") {
    menu.unshift({
      title: "Users",
      icon: "person",
      url:"/dashboard/users"
    },{
      title: "Clinics",
      icon: "domain",
      url:"/dashboard/clinics"
    },{
      title: "Patients",
      icon: "group",
      url:"/dashboard/patients"
    },
    {
      title: "Medical Record",
      icon: "description",
      url:"/dashboard/medical-record"
    });
  }
  if (rol === "operator") {
    menu.unshift({
      title: "Patients",
      icon: "group",
      url:"/dashboard/patients"
    });
  }
  if (rol === "doctor" || rol ==="patient") {
    menu.unshift({
      title: "Medical Record",
      icon: "description",
      url:"/dashboard/medical-record"
    });
  }
  return menu;
};

module.exports = { getSideNavOptions };
