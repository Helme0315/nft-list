import {ToastContainer} from 'react-toastify';

export const ErrorAlert = () => (
    <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        // theme="colored"
        // transition={Zoom}
    />
);