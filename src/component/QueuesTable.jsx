import React from "react";
import {
  Card,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function QueuesTable({ queues_data, queues_data_loading }) {
  const [open, setOpen] = React.useState({ open: false });

  console.log(open);

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={50}></TableCell>
            <TableCell width={50}>Sr. No.</TableCell>
            <TableCell>Job Id</TableCell>
            <TableCell>Job Name</TableCell>
            <TableCell>Job Url</TableCell>
            <TableCell width={150} sx={{ textAlign: "center" }}>
              Status
            </TableCell>
            <TableCell width={150} sx={{ textAlign: "center" }}>
              Data
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {queues_data_loading ? (
            <CircularProgress />
          ) : (
            queues_data.map((val, key) => (
              <>
                <TableRow key={key}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        setOpen({ open: !open.open, job_id: val.job_id })
                      }
                    >
                      {open.open && open.job_id === val.job_id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>{val.job_id}</TableCell>
                  <TableCell>{val.job_name}</TableCell>
                  <TableCell>{val.job_url}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {val.status}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {val.status}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                  >
                    <Collapse
                      in={
                        open.open && open.job_id === val.job_id ? true : false
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      {<pre>{JSON.stringify(val.product_data, null, 2)}</pre>}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
