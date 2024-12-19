import { Box, Button, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { CONST_WORDS, yup } from "../../utils/constant";
import InputTextField from "../../components/common/InputTextField";
import ButtonField from "../../components/common/ButtonField";
import { workflowService } from "../../service/workflow/WorkflowService";

export interface Login {
  userName: string;
  password: string;
}

export const Login = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    userName: yup.string().required(t("userName") + " " + t("isRequired")),
    password: yup.string().required(t("password") + " " + t("isRequired")),
  });

  const handleLoginClick = async (values: Login) => {
    const token = `${values.userName}:${values.password}`;
    localStorage.setItem(CONST_WORDS.token, btoa(token));
    workflowService
      .getpendingWorkflows()
      .then((res) => {
        if (res?.data) {
          handleButtonClick("nextButton");
        }
      })
      .catch(() => {
        localStorage.removeItem(CONST_WORDS.token);
      });
  };

  return (
    <Box className="loginContainer">
      <Card className="loginCard">
        <div className="loginLabelWrapper">
          <Typography>{t("loginTo")}</Typography>
          {/* <img src="/logo2.png" alt="" /> */}
        </div>
        <Formik
          initialValues={{
            password: "",
            userName: "",
          }}
          validationSchema={schema}
          validateOnChange
          onSubmit={handleLoginClick}
        >
          {({ resetForm, handleSubmit }) => {
            return (
              <form className="loginForm" onSubmit={handleSubmit}>
                <InputTextField
                  placeholder={t("userName")}
                  name={"userName"}
                  startIcon="ID.svg"
                  hideHelp
                  className="loginField"
                />
                <InputTextField
                  placeholder={t("password")}
                  name={"password"}
                  startIcon="Password.svg"
                  fieldType={"password"}
                  hideHelp
                  className="loginField"
                />
                <Grid container spacing={2} size={12} width={"100%"}>
                  <Grid size={6}>
                    <ButtonField
                      variant="contained"
                      handleClick={() => {
                        resetForm();
                      }}
                      lbl={t("reset")}
                      name={t("reset")}
                      variableStyle={{
                        color: "white",
                        bgColor: "black",
                        size: "large",
                      }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Button
                      type="button"
                      size="large"
                      onClick={() => handleSubmit()}
                      fullWidth
                      variant="contained"
                    >
                      {t("login")}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Card>
    </Box>
  );
};
