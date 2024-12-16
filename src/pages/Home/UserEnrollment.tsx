import { Grid2 } from "@mui/material";
import InputTextField from "../../components/common/InputTextField";
import ButtonField from "../../components/common/ButtonField";
import { IObject } from "../../service/commonModel";
import { taskService } from "../../service/task/TaskService";
import { transferTaskObjectForPayload } from "../../utils/helperFunction";
import { FormikContextType, useFormikContext } from "formik";

export const UserEnrollmentFields = {
  userName: "user_name",
  // name: "name",
  // email: "email",
  password: "password",
  confirmPassword: "confirm_password",
  registerBtn: "register_button",
};
const UserEnrollment = ({
  handleButtonClick,
  handleNextStep,
}: {
  handleButtonClick: (
    btnName: string,
    isPreventValidation?: boolean,
    isPreventStepChange?: boolean,
    callback?: () => any
  ) => void;
  handleNextStep: () => void;
}) => {
  const { values }: FormikContextType<IObject> = useFormikContext();
  const handleCommitTask = () => {
    const payload = transferTaskObjectForPayload(values);
    taskService.commit(payload).then((res) => {
      if (res) {
        handleNextStep();
      }
    });
  };

  return (
    <Grid2 container spacing={2}>
      {Object.values(UserEnrollmentFields).map((name, i) => {
        return (
          name !== UserEnrollmentFields.registerBtn && (
            <Grid2 size={{ xs: 12 }} key={`user-enroll-${i}`}>
              <InputTextField
                name={name}
                placeholder={name}
                fieldType={
                  name === UserEnrollmentFields.confirmPassword ||
                  name === UserEnrollmentFields.password
                    ? "password"
                    : "text"
                }
                startIcon={"SmartPhone.svg"}
              />
            </Grid2>
          )
        );
      })}
      <Grid2 size={{ xs: 12 }}>
        <ButtonField
          lbl={UserEnrollmentFields.registerBtn}
          handleClick={() =>
            handleButtonClick(
              UserEnrollmentFields.registerBtn,
              false,
              true,
              () => {
                handleCommitTask();
              }
            )
          }
          name={UserEnrollmentFields.registerBtn}
          variableStyle={{
            bgColor: "var(--btnDarkGreyBg)",
            size: "large",
          }}
        />
      </Grid2>
    </Grid2>
  );
};

export default UserEnrollment;
