import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const handleChange = <T>(
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFormData: Dispatch<SetStateAction<T>>,
  setError?: Dispatch<SetStateAction<string | null>>
) => {
  const { name, value } = e.target;

  if (name === "date" && setError) {
    const minDate = new Date("2020-01-01T00:00");
    const maxDate = new Date();
    const selectedDate = new Date(value);

    if (selectedDate < minDate) {
      setError("Date must be after January 1, 2020.");
    } else if (selectedDate > maxDate) {
      setError("Date cannot be in the future.");
    } else {
      setError(null);
    }
  }
  
  setFormData(prevState => ({ ...prevState, [name]: value }));
};

export default handleChange;