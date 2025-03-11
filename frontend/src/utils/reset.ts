import { Dispatch, SetStateAction } from 'react';

const reset = <T>(setFormData: Dispatch<SetStateAction<T>>, initialFormData: T) => {
  setFormData(initialFormData);
};

export default reset;
