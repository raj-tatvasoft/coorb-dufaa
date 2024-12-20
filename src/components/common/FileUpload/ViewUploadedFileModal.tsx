import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ViewFileDetail } from "./FileUploadField";
import { fileService } from "../../../service/file/FileService";
import i18next from "i18next";

type Props = {
  handleClose: () => void;
  viewFileDetail: ViewFileDetail;
  taskInstanceId: string;
  taskInstanceTokenId: string;
  variableTypeId: string;
  variableTypeTokenId: number;
  setFileDetail: (file: string, fileType: string) => void;
};

const ViewUploadedFile: FC<Props> = (props) => {
  const {
    handleClose,
    taskInstanceId,
    taskInstanceTokenId,
    variableTypeId,
    variableTypeTokenId,
    viewFileDetail,
    setFileDetail,
  } = props;
  const { t } = useTranslation();

  useEffect(() => {
    if (!viewFileDetail.fileData) getFileDetails();
  }, []);

  const getFileType = (base64Data: string) => {
    if (/^data:application\/pdf/.test(base64Data)) return "pdf";
    if (/^data:text\/plain/.test(base64Data)) return "text";
    if (/^data:image\/(jpeg|png|gif)/.test(base64Data)) return "image";
    return "unknown";
  };

  const getFileDetails = async () => {
    fileService
      .download({
        taskInstanceId,
        taskInstanceTokenId,
        variableTypeId,
        variableTypeTokenId,
      })
      .then((res) => {
        if (res?.data) {
          setFileDetail(res.data, getFileType(res.data));
        }
      })
      .catch(() => {
        setFileDetail("", "");
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={true}
      maxWidth="md"
      fullWidth={
        viewFileDetail.fileType === "pdf" || viewFileDetail.fileType === "txt"
      }
    >
      <DialogTitle>{t("viewFile")}</DialogTitle>
      <IconButton
        onClick={handleClose}
        className={i18next.dir() === "ltr" ? "right" : "left"}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          maxWidth: "100%",
          maxHeight: "70vh",
          minHeight: "300px",
          minWidth: "300px",
        }}
      >
        {(viewFileDetail.fileType === "pdf" ||
          viewFileDetail.fileType === "txt") && (
          <iframe
            className="pdf-viewer"
            src={`${viewFileDetail.fileData}#view=fitH`}
            width="100%"
            height="100%"
            style={{
              border: "none",
              overflow: "hidden",
            }}
          />
        )}

        {viewFileDetail.fileType === "image" && (
          <img
            src={viewFileDetail.fileData}
            alt="Preview"
            style={{
              maxHeight: "inherit",
              maxWidth: "100%",
              objectFit: "contain",
            }} // Ensure the image fits within the available space
          />
        )}

        {viewFileDetail.fileType === "unknown" && (
          <p>{t("canNotPreviewFile")}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose} variant="contained">
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUploadedFile;
