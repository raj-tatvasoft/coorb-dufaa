import { IconButton, InputLabel } from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps, IObject } from "../../../service/commonModel";
import { UploadFile, Visibility } from "@mui/icons-material";
import ViewUploadedFile from "./ViewUploadedFileModal";
import {
  ALLOWED_FILE_EXTENSION,
  ALLOWED_FILE_SIZE,
} from "../../../utils/constant";
import { errorToast } from "../ToastMsg";
import { fileService } from "../../../service/file/FileService";

export type ViewFileDetail = {
  show: boolean;
  fileData: string;
  fileType: string;
};

const FileUploadField: FC<IGenericFieldProps & { isServerUpload?: boolean }> = (
  props
) => {
  const { t } = useTranslation();
  const {
    name,
    required,
    readOnly,
    lbl,
    isServerUpload = false,
    showLbl = false,
  } = props;
  const { setFieldValue, values, setValues }: FormikContextType<IObject> =
    useFormikContext();

  const [viewFileDetail, setViewFileDetail] = useState<ViewFileDetail>({
    fileData: "",
    fileType: "",
    show: false,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    let errMsg = "";
    if (file) {
      const isValidFile = ALLOWED_FILE_EXTENSION.includes(
        file.name.split(".").pop()!.toLowerCase()
      );
      const isFileSizeAllowed = file.size <= ALLOWED_FILE_SIZE;
      if (isValidFile && isFileSizeAllowed) {
        if (isServerUpload) {
          const reader = new FileReader();

          reader.onloadend = () => {
            fileService
              .upload(
                {
                  fileName: file.name,
                  flowInstanceId: values.initialDetails.workflowInstanceId,
                  flowInstanceTokenId: values.initialDetails.data[8],
                  taskInstanceId: values.initialDetails.taskInstanceId,
                  taskInstanceTokenId: values.initialDetails.data[5],
                  variableTypeId: props.id!,
                  variableTypeTokenId: Number(props.tokenId),
                },
                reader.result!.toString()
              )
              .then((res) => {
                if (res?.data?.message) {
                  const existingValues = JSON.parse(JSON.stringify(values));
                  // const varName = name?.split(".")?.pop() ?? name;
                  // Object.values(
                  //   existingValues.initialDetails.variables
                  // ).forEach((x: any) => {
                  //   if (x.i18nName === varName) {
                  //     existingValues.initialDetails.variables[
                  //       x.id
                  //     ].textValue = res?.data?.message;
                  //   }
                  // });
                  setValues(existingValues);
                  setFieldValue(name, res?.data?.message, true);
                  setViewFileDetail({
                    fileData: "",
                    fileType: "",
                    show: false,
                  });
                  event.target.value = "";
                }
              });
          };

          reader.readAsDataURL(file);
        } else {
          setFieldValue(name, file, true);
        }
      } else {
        if (!isValidFile) errMsg = t("allowedFileExtensionError");
        if (!isFileSizeAllowed)
          errMsg +=
            (errMsg ? " " : "") +
            t("fileSizeLessThanOrEqual", {
              size: `${ALLOWED_FILE_SIZE / (1024 * 1024)} MB`,
            });
        if (errMsg) errorToast(errMsg);
      }
    }
  };
  return (
    <>
      <Field name={name}>
        {({ meta, field }: FieldProps) => (
          <div className="fieldWrapper">
            {lbl && showLbl && (
              <InputLabel
                htmlFor={`textfield-${name}`}
                className="inputLabel"
                error={Boolean(meta.touched && meta.error)}
              >
                {`${t(lbl)} ${required ? "*" : ""}`}
              </InputLabel>
            )}
            <input
              id={`upload-button-${name}`}
              type="file"
              className="dNone"
              onChange={handleFileChange}
              disabled={Boolean(readOnly)}
              accept=".pdf,.jpeg,.jpg,.png"
            />
            <div>
              <label
                className={`fileUploadLabel ${
                  readOnly === 1 ? "disabled" : ""
                } ${meta.touched && meta.error ? "errorBorderDashed" : ""}`}
                // onClick={() => setFieldTouched(name, true, true)}
                htmlFor={readOnly === 1 ? "" : `upload-button-${name}`}
              >
                <div className="svgWrapper">
                  <UploadFile />
                </div>
                <div
                  className={`labelWrapper ${
                    field.value ? "fieldWithViewIcon" : ""
                  }`}
                >
                  <span>
                    {t(lbl ? lbl : `uploadFile`) + (required ? "*" : "")}
                  </span>
                  <p>
                    {t("uploadFileDesc")} -{" "}
                    {t("allowedFiles", {
                      files: ALLOWED_FILE_EXTENSION.join(", "),
                    })}
                  </p>
                </div>
                {field.value && (
                  <IconButton
                    title={t("viewFile")}
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewFileDetail({ ...viewFileDetail, show: true });
                    }}
                    className="viewFileButton"
                  >
                    <Visibility fontSize={"small"} />
                  </IconButton>
                )}
              </label>

              {meta.touched && meta.error && (
                <div className="errorText">{meta.error}</div>
              )}
            </div>
          </div>
        )}
      </Field>

      {viewFileDetail.show && (
        <ViewUploadedFile
          handleClose={() =>
            setViewFileDetail({ ...viewFileDetail, show: false })
          }
          setFileDetail={(fileData, fileType) => {
            setViewFileDetail({ ...viewFileDetail, fileData, fileType });
          }}
          viewFileDetail={viewFileDetail}
          taskInstanceId={values.initialDetails.taskInstanceId}
          taskInstanceTokenId={values.initialDetails.data[5]}
          variableTypeId={props.id!}
          variableTypeTokenId={Number(props.tokenId)}
        />
      )}
    </>
  );
};

export default FileUploadField;
