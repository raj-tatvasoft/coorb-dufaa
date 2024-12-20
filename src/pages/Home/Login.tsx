import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonField from "../../components/common/ButtonField";
import InputTextField from "../../components/common/InputTextField";
import { workflowService } from "../../service/workflow/WorkflowService";
import { CONST_WORDS, yup } from "../../utils/constant";

export interface Login {
  userName: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
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
          localStorage.setItem(CONST_WORDS.username, values.userName);
          navigate("/finance-simulation");
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
                <div className="mt-4">
                  <Grid container spacing={2} size={12} width={"100%"}>
                    <Grid size={6}>
                      <ButtonField
                        variant="contained"
                        className="secondaryBtn"
                        handleClick={() => {
                          resetForm();
                        }}
                        lbl={t("reset")}
                        name={t("reset")}
                        variableStyle={{
                          size: "large",
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <ButtonField
                        handleClick={() => {}}
                        variant="contained"
                        buttonType="submit"
                        lbl={"login"}
                        name={"login"}
                        variableStyle={{
                          color: "white",
                          bgColor: "black",
                          size: "large",
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
              </form>
            );
          }}
        </Formik>
      </Card>
    </Box>
  );
};
