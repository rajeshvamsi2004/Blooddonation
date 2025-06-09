import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Main.css'


export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 10000,  
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",  
    autoClose: 10000,       
  });
};

export default function ToastNotification() {
  return (
    <ToastContainer 
      position="top-right"
      theme='light'
      id="custom-toast"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
    />
  );
}
