import toast from 'react-hot-toast';
import { IoMdCloseCircle } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { IoWarning } from 'react-icons/io5';

export const errorToast = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } flex gap-2 items-center ring-1 ring-black ring-opacity-5 bg-background border-border border-2 rounded-lg py-4 px-6`}
    >
      <IoMdCloseCircle fill='#ff4b4b' size={24} />
      <p>{message}</p>
    </div>
  ), {
    duration: 1500,
    position: 'top-right',
  });
};

export const successToast = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } flex gap-2 items-center ring-1 ring-black ring-opacity-5 bg-background border-border border-2 rounded-lg py-4 px-6`}
    >
      <FaCheck color='#61d345' size={24} />
      <p>{message}</p>
    </div>
  ), {
    duration: 1500,
    position: 'top-right',
  });
};

export const warningToast = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } flex gap-2 items-center ring-1 ring-black ring-opacity-5 bg-background border-border border-2 rounded-lg py-4 px-6`}
    >
      <IoWarning color='#ffb02e' size={24} />
      <p>{message}</p>
    </div>
  ), {
    duration: 1500,
    position: 'top-right',
  });
};