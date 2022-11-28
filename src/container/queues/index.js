
import withNavigate from "../../routes/withNavigate";
import QueuesContainer from "./QueuesContainer";
import QueuesStore from "./QueuesStore.js";

export default QueuesStore(withNavigate(QueuesContainer));
