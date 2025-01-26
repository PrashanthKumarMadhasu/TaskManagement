import {  toast } from 'sonner';

export const handleToast = (message, color) => {
    return toast(`${message}`, {
        style: {
            color: color,
            background: "none",
            padding: "5px",
            borderRadius: "8px",
            margin: "50px 0 0 0",
            fontSize: "18px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        position: "top-center",
    });
};

