import Modal from "react-modal";

import { useUiStore, useCalendarStore } from "@/store/index.ts";
import { CalendarForm } from "@/calendar/components/CalendarForm.tsx";
import type { FormCalendarValues } from "@/calendar/interfaces/formCalendarValues.ts";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  //  Suscribirse directamente al valor booleano en el store
  const isDateModalOpen = useUiStore((state) => state.isDateModalOpen);
  const onCloseDateModal = useUiStore((state) => state.onCloseDateModal);
  const activeEvent = useCalendarStore((state) => state.activeEvent);

  const onSubmit = (formData: FormCalendarValues) => {
    console.log("Datos listos para guardar en Zustand/API:", formData);

    // Aquí llamarías a tu acción del store:
    // startSavingEvent(formData);

    onCloseDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseDateModal}
      style={customStyles}
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1 className="text-black">
        {activeEvent ? "Editar evento" : "Nuevo evento"}
      </h1>
      <hr />

      <CalendarForm
        initialFormValues={activeEvent}
        onEventSubmit={onSubmit}
        key={activeEvent?.user._id ?? activeEvent?.title ?? "new-event"}
      />
    </Modal>
  );
};
