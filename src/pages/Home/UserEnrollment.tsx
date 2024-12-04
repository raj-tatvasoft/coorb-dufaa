import { Grid2 } from "@mui/material";
import InputTextField from "../../components/common/InputTextField";
import ButtonField from "../../components/common/ButtonField";

export const UserEnrollmentFields = {
  userName: "user_name",
  name: "name",
  email: "email",
  password: "password",
  confirmPassword: "confirm_password",
  registerBtn: "register_button",
};
const UserEnrollment = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
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
            handleButtonClick(UserEnrollmentFields.registerBtn)
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
