import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../../context/settingContext";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";

export default function AlertDialog() {
  const { postDays, daysData } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          handleClickOpen();
        }}
        size="large"
      >
        ارسال التقرير
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-send-title"
        aria-describedby="confirm-send-description"
      >
        <DialogTitle id="confirm-send-title">تأكيد إرسال الدرجات</DialogTitle>

        <DialogContent>
          <DialogContentText id="confirm-send-description">
            هل أنت متأكد أنك تريد إرسال الدرجات الآن؟ لن تتمكن من تعديلها بعد
            الإرسال.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            إلغاء
          </Button>
          <Box/>
          <Button
            onClick={() => {
              handleClose();
              postDays(daysData[1][0]);
            }}
            variant="contained"
            color="primary"
          >
            تأكيد الإرسال
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
