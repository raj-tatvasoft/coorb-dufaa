/* eslint-disable @typescript-eslint/no-unused-expressions */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = (msg: string | Element) => {
  msg
    ? toast.success(<div dangerouslySetInnerHTML={{ __html: msg }}></div>)
    : "";
};

export const errorToast = (msg: string | Element) => {
  msg ? toast.error(<div dangerouslySetInnerHTML={{ __html: msg }}></div>) : "";
};
