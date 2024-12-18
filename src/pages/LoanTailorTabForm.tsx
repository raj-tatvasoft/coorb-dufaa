import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import WorkflowFormField from "../components/common/WorkflowFormField";
import { Variable } from "../service/workflow/WorkflowModel";
import { ITaskDetail } from "../service/task/TaskModel";
import ButtonField from "../components/common/ButtonField";
import { transferTaskObjectForPayload } from "../utils/helperFunction";
import { FormikContextType, useFormikContext } from "formik";
import { IObject } from "../service/commonModel";
import { taskService } from "../service/task/TaskService";
interface TabFormProps {
  groupedVariables: Record<string, Variable[]>;
  handleBtnClick: (values: ITaskDetail) => void;
  belowBtn?: boolean;
  handleShowLoanSimulation: () => void;
}
const LoanTailorTabForm = ({
  groupedVariables,
  handleBtnClick,
  belowBtn,
  handleShowLoanSimulation,
}: TabFormProps) => {
  const { values }: FormikContextType<IObject> = useFormikContext();
  const [tabIndex, setTabIndex] = useState(0);
  const groupNames = Object.keys(groupedVariables);

  const handleCommitTask = () => {
    const payload = transferTaskObjectForPayload(values);
    taskService.commit(payload).then((res) => {
      if (res) {
        alert("next step");
      }
    });
    // handleNextStep();
  };

  return (
    <>
      {!belowBtn && (
        <Box className="tabWrapper">
          <Tabs
            value={tabIndex}
            onChange={(_, newValue) => setTabIndex(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {groupNames.map((group, index) => (
              <Tab key={index} label={group} />
            ))}
          </Tabs>
        </Box>
      )}
      <Grid2
        container
        spacing={{ xs: 1.5, lg: 2 }}
        size={{ xs: 12 }}
        alignItems={"start"}
      >
        {groupedVariables &&
          groupNames?.length > 0 &&
          groupedVariables[groupNames[tabIndex]].map((variable: any, idx) => (
            <Grid2 size={{ xs: 12 }} key={`tab-field-${idx}`}>
              <WorkflowFormField
                handleBtnClick={handleBtnClick}
                {...variable}
              />
            </Grid2>
          ))}
      </Grid2>
      {belowBtn && (
        <>
          <div className="flex gap-10">
            <ButtonField
              lbl={"previous"}
              handleClick={() =>
                tabIndex === 0
                  ? handleShowLoanSimulation()
                  : setTabIndex(tabIndex - 1)
              }
              name={"previous"}
              variableStyle={{
                bgColor: "var(--btnDarkGreyBg)",
                size: "large",
              }}
            />

            {groupNames?.length !== tabIndex + 1 ? (
              <ButtonField
                lbl={"next"}
                handleClick={() => setTabIndex(tabIndex + 1)}
                name={"next"}
                variableStyle={{
                  bgColor: "var(--btnDarkGreyBg)",
                  size: "large",
                }}
              />
            ) : (
              <ButtonField
                lbl={"commit"}
                handleClick={handleCommitTask}
                name={"commit"}
                startIcon="RightBtnArrow.svg"
                variableStyle={{
                  bgColor: "var(--btnDarkGreyBg)",
                  size: "large",
                }}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default LoanTailorTabForm;
