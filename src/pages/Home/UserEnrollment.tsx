import { Grid2 } from "@mui/material";
import ButtonField from "../../components/common/ButtonField";
import InputTextField from "../../components/common/InputTextField";
import { taskService } from "../../service/task/TaskService";
import { transferTaskObjectForPayload } from "../../utils/helperFunction";
import { successToast } from "../../components/common/ToastMsg";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

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
}: {
  handleButtonClick: (
    btnName: string,
    isPreventValidation?: boolean,
    isPreventStepChange?: boolean,
    callback?: (val: any) => any
  ) => void;
  handleNextStep: () => void;
}) => {
  const navigate = useNavigate();
  const handleCommitTask = (val: any) => {
    const payload = transferTaskObjectForPayload(val);
    taskService.commit(payload).then((res) => {
      if (res) {
        successToast(t("userEnrollmentSuccess"));
        navigate("/login");
      }
    });
    // handleNextStep();
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <p className="userRegistrationTitle">{t("userRegistration")}</p>
      </Grid2>
      {Object.values(UserEnrollmentFields).map((name, i) => {
        return (
          name !== UserEnrollmentFields.registerBtn && (
            <Grid2 size={{ xs: 12 }} key={`user-enroll-${i}`}>
              <InputTextField
                name={name}
                placeholder={name}
                showPasswordStrength
                fieldType={
                  name === UserEnrollmentFields.confirmPassword ||
                  name === UserEnrollmentFields.password
                    ? "password"
                    : "text"
                }
                startIcon={
                  name === UserEnrollmentFields.confirmPassword ||
                  name === UserEnrollmentFields.password
                    ? "Password.svg"
                    : "ID.svg"
                }
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
