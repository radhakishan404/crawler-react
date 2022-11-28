import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import Button from "./common/Button";

const validateAddQueues = yup.object().shape({
  job_name: yup
    .string()
    .min(2, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  job_url: yup.string().required("Required"),
});

const QueuesAdd = (props) => {
  const { addQueues, add_loading, open, close } = props;

  const onSubmit = async (values) => {
    addQueues(values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      job_name: "",
      job_url: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
    validationSchema: validateAddQueues,
  });

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Create New Queues</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{pt: 1}}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                type="text"
                onChange={formik.handleChange("job_name")}
                onBlur={formik.handleBlur("job_name")}
                value={formik.values.job_name}
                error={
                  !formik.touched.job_name && Boolean(formik.errors.job_name)
                }
                helperText={!formik.touched.job_name && formik.errors.job_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job URL"
                variant="outlined"
                type="text"
                onChange={formik.handleChange("job_url")}
                onBlur={formik.handleBlur("job_url")}
                value={formik.values.job_url}
                error={
                  !formik.touched.job_url && Boolean(formik.errors.job_url)
                }
                helperText={!formik.touched.job_url && formik.errors.job_url}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={!formik.isValid}
                variant="contained"
                loading={add_loading}
                fullWidth
              >
                Add Queues
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QueuesAdd;
