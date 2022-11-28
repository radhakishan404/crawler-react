import { io } from "socket.io-client";
import { wsBaseUrl } from "./helpers/constants";
import {
  set_queues_data_created,
  set_queues_data_update,
} from "./store/common/commonSlice";

let socket;

export const initiateSocketConnection = (DoctorId) => {
  socket = io(wsBaseUrl, {
    transports: ["websocket"],
  });

  console.log(`****** socket connected  *****`);

  socket.on("disconnect", (socket) => {
    console.log(`${socket} -- socket disconnected`);
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const receiveMsgHere = (dispatch) => {
  socket.on("QUEUE_CREATED", (data) => {
    // console.log(data, "queue Created");
    dispatch(set_queues_data_created({ data }));
  });
  socket.on("QUEUE_UPDATED", (data) => {
    // console.log(data, "queue updated");
    dispatch(set_queues_data_update({ data }));
  });
};
export const sendMessage = (room, message) => {
  if (socket) socket.emit("chat", { message, room });
};
