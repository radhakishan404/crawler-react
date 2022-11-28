import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import QueuesTable from "../../component/QueuesTable";
import QueuesAdd from "../../component/QueuesAdd";
import { initiateSocketConnection, receiveMsgHere } from "../../socketio.service";

class QueuesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  getQueuesData() {
    this.props.queuesGetList();
  }

  socketInitialize() {
    // socket connection
    console.log("initializing socket");
    initiateSocketConnection();
    receiveMsgHere(this.props.dispatch);
  }

  componentDidMount() {
    this.getQueuesData();
    this.socketInitialize();
  }

  async handleAddQueues(values) {
    await this.props.queuesAdd(values);
    this.setState({ isModalOpen: false });
  }

  render() {
    const {
      queues_data_loading,
      queues_data,
    } = this.props;

    console.log(queues_data, "queues_data");

    return (
      <Container maxWidth="xl" sx={{ paddingTop: 5 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Queues List</Typography>
            <Grid>
              <Button
                variant="outlined"
                onClick={() => this.setState({ isModalOpen: true })}
              >
                Add Queues
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <QueuesTable
              queues_data={queues_data}
              queues_data_loading={queues_data_loading}
            />
          </Grid>
        </Grid>
        <QueuesAdd
          open={this.state.isModalOpen}
          add_loading={this.props.add_loading}
          close={() => this.setState({ isModalOpen: false })}
          addQueues={(payload) => this.handleAddQueues(payload)}
        />
      </Container>
    );
  }
}

export default QueuesContainer;
