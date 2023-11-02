import { useRoutes } from "react-router-dom";
import router from "./router";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { Id, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import {
  useToastErrorStore,
  useToastInfoStore,
  useToastSuccessStore,
  useToastWarningStore,
} from "./config/ZustandStorage";

export const dismissToast = (e: any) => toast.dismiss(e);
export const dismissAll = () => toast.dismiss();
export const updateToast = (id: Id, options: any) => toast.update(id, options);
import ThemeProvider from "./theme/ThemeProvider";
function App() {
  const content = useRoutes(router);
  const { toastError, shiftToastError } = useToastErrorStore();
  const { toastSuccess, shiftToastSuccess } = useToastSuccessStore();
  const { toastWarning, shiftToastWarning } = useToastWarningStore();
  const { toastInfo, shiftToastInfo } = useToastInfoStore();

  useEffect(() => {
    if (toastError) {
      toastError.map((item) => {
        toast.error(item);
        shiftToastError();
      });
    }
    if (toastSuccess) {
      toastSuccess.map((item) => {
        toast.success(item);
        shiftToastSuccess();
      });
    }
    if (toastWarning) {
      toastWarning.map((item) => {
        toast.warning(item);
        shiftToastWarning();
      });
    }
    if (toastInfo) {
      toastInfo.map((item) => {
        toast.info(item);
        shiftToastInfo();
      });
    }
  }, [toastError, toastSuccess, toastWarning, toastInfo]);
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <ToastContainer />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
