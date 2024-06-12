import { ReactNode } from "react";

import Button, { ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";

interface ModalButtonProps {
  title: string;
  modalEl: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  endIcon?: ReactNode;
  buttonProps?: ButtonProps;
}

const ModalButton = ({
  title,
  modalEl,
  open,
  setOpen,
  endIcon,
  buttonProps,
}: ModalButtonProps) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        size="medium"
        variant="contained"
        endIcon={endIcon}
        onClick={handleOpen}
        {...buttonProps}
      >
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 350,
            maxWidth: 600,
            bgcolor: "background.default",
            border: "1px solid #333",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CancelIcon
            onClick={handleClose}
            sx={{
              color: "error.main",
              fontSize: 30,
              position: "absolute",
              top: 12,
              right: 12,
              cursor: "pointer",
            }}
          />
          {modalEl}
        </Box>
      </Modal>
    </>
  );
};

export default ModalButton;
