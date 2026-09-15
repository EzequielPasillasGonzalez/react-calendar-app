import { useMemo, useState, type ChangeEvent, type SubmitEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { addHours, differenceInSeconds } from "date-fns";
import Swal from "sweetalert2";

import type { FormCalendarValues } from "@/calendar/interfaces/formCalendarValues.ts";

interface Props {
  initialFormValues: FormCalendarValues | null;

  onEventSubmit: (values: FormCalendarValues) => void;
}

export const CalendarForm = ({ onEventSubmit, initialFormValues }: Props) => {
  const [formValues, setFormValues] = useState({
    title: initialFormValues?.title ?? "",
    notes: initialFormValues?.notes ?? "",
    start: initialFormValues?.start ?? new Date(),
    end: initialFormValues?.end ?? addHours(new Date(), 2),
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length === 0 ? "is-invalid" : "";
  }, [formValues.title, formSubmitted]);

  const onInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (date: Date | null, changing: "start" | "end") => {
    if (!date) return;

    setFormValues({
      ...formValues,
      [changing]: date,
    });
  };

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    if (formValues.title.trim().length <= 0) {
      Swal.fire("Título incorrecto", "Revisar el título ingresado", "error");
      return;
    }

    //  Pasamos los datos limpios al padre
    onEventSubmit(formValues);
  };

  return (
    <form className="container" onSubmit={onSubmit}>
      <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <DatePicker
          selected={formValues.start}
          className="form-control"
          onChange={(date: Date | null) => onDateChange(date, "start")}
          dateFormat={"Pp"}
          showTimeSelect
        />
      </div>

      <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <DatePicker
          selected={formValues.end}
          className="form-control"
          onChange={(date: Date | null) => onDateChange(date, "end")}
          minDate={formValues.start}
          dateFormat={"Pp"}
          showTimeSelect
        />
      </div>

      <hr />
      <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input
          type="text"
          className={`form-control ${titleClass}`}
          placeholder="Título del evento"
          name="title"
          autoComplete="off"
          value={formValues.title}
          onChange={onInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">
          Una descripción corta
        </small>
      </div>

      <div className="form-group mb-2">
        <textarea
          value={formValues.notes}
          onChange={onInputChange}
          className="form-control"
          placeholder="Notas"
          rows={5}
          name="notes"
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">
          Información adicional
        </small>
      </div>

      <button type="submit" className="btn btn-outline-primary btn-block">
        <i className="far fa-save"></i>
        <span> Guardar</span>
      </button>
    </form>
  );
};
