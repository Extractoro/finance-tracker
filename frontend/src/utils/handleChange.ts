import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const handleChange = <T>(
  e: ChangeEvent<HTMLInputElement>,
  setFormData: Dispatch<SetStateAction<T>>,
) => {
  const { name, value } = e.target;
  setFormData(prevState => ({ ...prevState, [name]: value }));
};

export default handleChange;