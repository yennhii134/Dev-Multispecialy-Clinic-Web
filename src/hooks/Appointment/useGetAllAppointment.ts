import { AppointmentService } from "@/services/appointment.service";
import { Appointment, StatusAppointment } from "@/types/Appointment";
import { useEffect, useState } from "react";

export const useGetAllAppointment = () => {
  const { getAppointments } = AppointmentService();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const dateNow = new Date();

  const sortAppointmentList = (appointmentList: Appointment[]) => {
    let length = appointmentList.length;
    appointmentList.sort((a: Appointment, b: Appointment) => b.id - a.id);
    const updatedAppointments = appointmentList.map(
      (appointment: Appointment) => {
        let isCancel = false;
        const appointmentDate = new Date(appointment.date);
        const [hour, minute] = appointment.time.split(":").map(Number);
        appointmentDate.setHours(hour, minute);
        if (dateNow < appointmentDate) {
          if (
            appointment.status === StatusAppointment.caceled ||
            appointment.status === StatusAppointment.arrived
          ) {
            isCancel = false;
          } else {
            isCancel = true;
          }
        }

        const index = length--;

        return {
          ...appointment,
          isCancel: isCancel,
          index: index,
        };
      }
    );
    return updatedAppointments;
  }

  const handleGetAppointments = () => {
    const dateNow = new Date();

    getAppointments().then((response) => {
      if (response?.status) {
        const appointmentsData = sortAppointmentList(response.data);
        // let length = appointmentsData.length;
        // appointmentsData.sort((a: Appointment, b: Appointment) => b.id - a.id);
        // const updatedAppointments = appointmentsData.map(
        //   (appointment: Appointment) => {
        //     let isCancel = false;
        //     const appointmentDate = new Date(appointment.date);
        //     const [hour, minute] = appointment.time.split(":").map(Number);
        //     appointmentDate.setHours(hour, minute);
        //     if (dateNow < appointmentDate) {
        //       if (
        //         appointment.status === StatusAppointment.caceled ||
        //         appointment.status === StatusAppointment.arrived
        //       ) {
        //         isCancel = false;
        //       } else {
        //         isCancel = true;
        //       }
        //     }

        //     const index = length--;

        //     return {
        //       ...appointment,
        //       isCancel: isCancel,
        //       index: index,
        //     };
        //   }
        // );

        setAppointments(appointmentsData);
      }
    });
  };

  useEffect(() => {
    handleGetAppointments();
  }, []);

  return {
    appointments,
    handleGetAppointments,
  };
};
