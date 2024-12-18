import { Grid2 } from "@mui/material";
import InputTextField from "../../components/common/InputTextField";
import ButtonField from "../../components/common/ButtonField";
import { IObject } from "../../service/commonModel";
import { taskService } from "../../service/task/TaskService";
import { transferTaskObjectForPayload } from "../../utils/helperFunction";
import { FormikContextType, useFormikContext } from "formik";
import { CONST_WORDS } from "../../utils/constant";

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
    callback?: (val: any) => any
  ) => void;
  handleNextStep: () => void;
}) => {
  const { values }: FormikContextType<IObject> = useFormikContext();
  const handleCommitTask = (val: any) => {
    const payload = transferTaskObjectForPayload(val);
    taskService.commit(payload).then((res) => {
      if (res) {
        const token = `${values[UserEnrollmentFields.userName]}:${
          values[UserEnrollmentFields.password]
        }`;
        localStorage.setItem(CONST_WORDS.token, btoa(token));
        handleNextStep();
      }
    });
    // handleNextStep();
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
              (val: any) => {
                handleCommitTask(val);
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
