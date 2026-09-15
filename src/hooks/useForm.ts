import { useMemo, useState, type ChangeEvent } from "react";

// Regla de validación tipada con el tipo real de cada propiedad (V)
export type ValidationRule<V> = [(value: V) => boolean, string];

//  Mapeo estricto de validaciones según las propiedades de T
export type FormValidations<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

// Plantilla literal tipada para los campos válidos (ej: "titleValid": string | null)
export type FormValidationState<T> = {
  [K in keyof T as `${string & K}Valid`]: string | null;
};

// Restricción genérica usando unknown en lugar de any
export const useForm = <T extends Record<string, unknown>>(
  initialForm: T,
  formValidations: FormValidations<T> = {},
) => {
  const [formState, setFormState] = useState<T>(initialForm);

  // Cálculo sincrónico derivado: cero useEffect, cero cascading renders
  const formValidation = useMemo(() => {
    const checkedValues: Record<string, string | null> = {};

    for (const key of Object.keys(formValidations) as Array<keyof T>) {
      const validation = formValidations[key];
      if (!validation) continue;

      const [validatorFn, errorMessage] = validation;
      const isValid = validatorFn(formState[key]);

      checkedValues[`${String(key)}Valid`] = isValid ? null : errorMessage;
    }

    // Se castea únicamente el objeto completo al retornar
    return checkedValues as FormValidationState<T>;
  }, [formState, formValidations]);

  const isFormValid = useMemo(() => {
    return Object.values(formValidation).every((value) => value === null);
  }, [formValidation]);

  const onInputChange = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    const { name, value } = target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
