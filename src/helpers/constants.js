const NODE_ENV = "development";

export const baseUrl =
  NODE_ENV === "development"
    ? "http://localhost:4000"
    : "http://localhost:4000";



export const wsBaseUrl =
  NODE_ENV === "development"
    ? "ws://localhost:4000"
    : "ws://localhost:4000";