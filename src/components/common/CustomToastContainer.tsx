import { Slide, ToastContainer } from 'react-toastify';
import '@/styles/toast-custom.css';

export default function CustomToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      transition={Slide}
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      closeButton={({ closeToast }) => <button onClick={closeToast}>✕</button>}
    />
  );
}
