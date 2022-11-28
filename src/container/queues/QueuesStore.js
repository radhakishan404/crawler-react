import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSnackBar, queuesGetList, queuesAdd, getUniqueQueues } from "../../store/common/commonSlice";

const mapStateToProps = (state) => {
    return {
        queues_data_loading: state.common.queues_data_loading,
        queues_data: state.common.queues_data,
        unique_queues_data: state.common.unique_queues_data,
        add_loading: state.common.add_loading,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        setSnackBar,
        queuesGetList,
        dispatch,
        queuesAdd: queuesAdd,
        getUniqueQueues: getUniqueQueues,
    }, dispatch);

const Store = (Container) =>
    connect(mapStateToProps, mapDispatchToProps)(Container);

export default Store;
