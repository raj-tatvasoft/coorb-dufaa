import { Box, Dialog, DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik, FormikProps } from "formik";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ObjectSchema } from "yup";
import WorkflowFormField from "../components/common/WorkflowFormField";
import { IObject, ISelectOpt, Variable } from "../service/commonModel";
import { ITaskDetail } from "../service/task/TaskModel";
import { taskService } from "../service/task/TaskService";
import {
  CONST_WORDS,
  JDBC_TYPE,
  WORKFLOW_DETAIL,
  yup,
} from "../utils/constant";

export const DynamicForm = () => {
  const { t, i18n } = useTranslation();
  const { taskInstanceId, taskInstanceTokenId } = useParams();

  const taskSessionKey =
    taskInstanceId +
    "_" +
    taskInstanceTokenId +
    "_" +
    CONST_WORDS.sessionTaskDetail;

  const formRef = useRef<FormikProps<IObject>>(null);

  const [validationSchema, setValidationSchema] =
    useState<ObjectSchema<IObject> | null>(yup.object().shape({}));
  const [initValues, setInitialValues] = useState<IObject>({
    formField: {},
  });
  const [groupedVariables, setGroupedVariables] = useState<IObject>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [, setCommitStatus] = useState<ISelectOpt[]>([]);

  const requestInitiated = useRef(false);

  useLayoutEffect(() => {
    if (taskInstanceId && taskInstanceTokenId) {
      getTaskDetail(taskInstanceId, taskInstanceTokenId);
    }
    setupInitialValues(WORKFLOW_DETAIL as any);
  }, []);

  useEffect(() => {
    if (i18n.language && initValues.variables) {
      const newValidationSchema: Record<string, any> = {};
      Object.values((initValues as ITaskDetail).variables).forEach(
        (variable) => {
          if (
            ![JDBC_TYPE.Button, JDBC_TYPE.Label, JDBC_TYPE.URL].includes(
              variable.jdbcType
            )
          ) {
            if (variable.required && !variable.hidden) {
              newValidationSchema[variable.i18nName] = yup
                .mixed()
                .required(t(variable.i18nName) + " " + t("isRequired"));
            }
          }
        }
      );
      setValidationSchema(
        yup.object().shape({
          formField: yup.object().shape(newValidationSchema),
        })
      );

      setCommitStatus(
        Object.keys(initValues.statuses).map((x) => ({
          ...initValues.statuses[x],
          value: initValues.statuses[x].id,
          label: t(initValues.statuses[x].i18nName),
        }))
      );

      setTimeout(() => {
        formRef.current?.validateForm();
      }, 0);
    }
  }, [i18n.language]);

  const getTaskDetail = (
    taskInstanceId: string,
    taskInstanceTokenId: string
  ) => {
    const existingTaskDetail = localStorage.getItem(taskSessionKey);
    if (existingTaskDetail) {
      setupInitialValues(JSON.parse(existingTaskDetail) as ITaskDetail);
    } else if (!requestInitiated.current) {
      requestInitiated.current = true;
      taskService.load(taskInstanceId, taskInstanceTokenId).then((res) => {
        if (res?.data) {
          setupInitialValues(res.data, true);
        }
      });
    }
  };

  const setupInitialValues = (data: ITaskDetail, isUpdateStorage?: boolean) => {
    if (isUpdateStorage)
      localStorage.setItem(taskSessionKey, JSON.stringify(data));

    const newInitVal: Record<string, any> = {};
    const newValidationSchema: Record<string, any> = {};
    const newGrpVariables: Record<string, Variable[]> = {};
    Object.keys(data.variables).forEach((key) => {
      const variable = data.variables[key];
      // validation schema
      if (
        variable.jdbcType !== JDBC_TYPE.Button &&
        variable.jdbcType !== JDBC_TYPE.Label &&
        variable.jdbcType !== JDBC_TYPE.URL &&
        variable.required &&
        !variable.hidden
      ) {
        newValidationSchema[variable.i18nName] = yup
          .mixed()
          .required(`${t(variable.i18nName)} ${t("isRequired")}`);
      }

      // initial value
      if (variable.jdbcType === JDBC_TYPE.Checkbox) {
        newInitVal[variable.i18nName] =
          variable.numericValue?.toString() === "1" ? true : false;
      } else if (
        variable.jdbcType === JDBC_TYPE.IntegerInput &&
        variable.comboListName &&
        variable.textValue &&
        variable.numericValue
      ) {
        newInitVal[variable.i18nName] = {
          value: variable.numericValue,
          label: variable.textValue,
        };
      } else {
        newInitVal[variable.i18nName] = variable.textValue;
      }

      // grouped variable
      const group = variable.i18nGroupName;
      newGrpVariables[group] = newGrpVariables[group] || [];
      newGrpVariables[group].push({ ...variable });
    });

    // sort the fields based on display order
    Object.keys(newGrpVariables).forEach((key) => {
      return newGrpVariables[key].sort(
        (a, b) => a.displayOrder - b.displayOrder
      );
    });
    setGroupedVariables(newGrpVariables);

    setValidationSchema(
      yup.object().shape({
        formField: yup.object().shape(newValidationSchema),
      })
    );
    const newInitialValues = {
      ...data,
      formField: newInitVal,
      taskInstanceTokenId: data.data[5],
    };

    const statuses = data.statuses;
    if (statuses) {
      setCommitStatus(
        Object.keys(statuses).map((x) => ({
          ...statuses[x],
          value: statuses[x].id,
          label: t(statuses[x].i18nName),
        }))
      );
    }

    if (data.selectedTaskStatus.i18nName) {
      newInitialValues["selectedTaskStatus"] = {
        ...data.selectedTaskStatus,
        value: data.selectedTaskStatus.id,
        label: t(data.selectedTaskStatus.i18nName),
      };
    } else if (Object.keys(statuses)?.length === 1) {
      const val = Object.values(statuses)[0];
      newInitialValues["selectedTaskStatus"] = {
        ...val,
        value: val.id,
        label: t(val.i18nName),
      };
    }

    setInitialValues(newInitialValues);
  };

  // const isFormValid = (
  //   values: IObject,
  //   validateForm: (values?: any) => Promise<FormikErrors<IObject>>,
  //   setTouched: (
  //     touched: FormikTouched<IObject>,
  //     shouldValidate?: boolean
  //   ) => Promise<void | FormikErrors<IObject>>,
  //   callBack: any
  // ) => {
  //   return validateForm(values).then((errors: IObject) => {
  //     if (errors?.formField) {
  //       const touchedFields: IObject = { formField: {} };
  //       Object.keys(errors.formField).forEach((field) => {
  //         touchedFields.formField[field] = true;
  //       });
  //       setTouched(touchedFields);
  //       errorToast(t("commonValidationMsg"));
  //     } else {
  //       callBack();
  //     }
  //   });
  // };
  const groupNames = Object.keys(groupedVariables);

  return (
    <Box>
      <Formik
        initialValues={initValues}
        onSubmit={() => {}}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {() => {
          return (
            <form className="workflowDetailWrapper">
              <Grid container spacing={2}>
                {groupedVariables &&
                  groupNames?.length > 0 &&
                  groupedVariables[
                    groupNames[currentStep === 1 ? 0 : currentStep]
                  ].map((variable: any, idx: any) => (
                    <Grid
                      size={{ xs: 12 }}
                      key={`tab-field-${idx}`}
                      className="responsiveGrid"
                    >
                      <WorkflowFormField
                        groupedVariables={groupedVariables}
                        handleBtnClick={() => {
                          setCurrentStep(currentStep + 1);
                        }}
                        currentStepIndex={currentStep}
                        {...variable}
                        variableStyle={eval(`(${variable.variableStyle})`)}
                      />
                    </Grid>
                  ))}
              </Grid>
              <br />
              {currentStep === 1 && (
                <Dialog
                  open={true}
                  fullScreen
                  sx={{ background: "transparent" }}
                  classes={{ paper: "transparentDialog" }}
                >
                  <DialogContent classes={{ root: "transparentContent" }}>
                    <Grid container rowSpacing={1.5}>
                      {groupedVariables[groupNames[currentStep]].map(
                        (variable: any, idx: any) => (
                          <Grid
                            size={{ xs: 12 }}
                            key={`tab-field-${idx}`}
                            className="responsiveGrid"
                          >
                            <WorkflowFormField
                              groupedVariables={groupedVariables}
                              handleBtnClick={() => {
                                setCurrentStep(currentStep + 1);
                              }}
                              currentStepIndex={currentStep}
                              {...variable}
                              variableStyle={eval(
                                `(${variable.variableStyle})`
                              )}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  </DialogContent>
                </Dialog>
              )}
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};
