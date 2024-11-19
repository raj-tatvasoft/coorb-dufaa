import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputTextField from "../components/common/InputTextField";
import { Formik } from "formik";
import CheckboxField from "../components/common/CheckboxField";

export const Home = () => {
  return (
    <Box>
      <p className="more-fund-title">
        Need <span> more funds </span> over your current financing?
      </p>

      <p className="more-fund-description">
        Get an instant Microfinance, starting from <span> 2,000 SAR! </span> No
        paper work, fast approvals and flexible terms.
      </p>

      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            // <form className="workflowDetailWrapper">
            <Grid container spacing={2}>
              <Grid container spacing={2} size={{ xs: 12 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputTextField
                    name="nationalID"
                    placeholder="National ID or Iqama"
                    startEndroment={<img src="/../src/assets/ID.svg" />}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputTextField
                    name="rajName"
                    placeholder="National ID or Iqama"
                    startEndroment={<img src="/../src/assets/ID.svg" />}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputTextField
                    name="rajName"
                    placeholder="National ID or Iqama"
                    startEndroment={<img src="/../src/assets/ID.svg" />}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CheckboxField name="rajName" lbl="National ID or Iqama" />
                </Grid>
              </Grid>
            </Grid>
            // </form>
          );
        }}
      </Formik>
    </Box>
  );
};
