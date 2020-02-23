import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAlert } from "../../actions/alert";
import MaterialUIAlert from "@material-ui/lab/Alert";

const Alert = ({ alerts, removeAlert }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => {
    return (
      <div>
        <MaterialUIAlert
          onClose={() => removeAlert(alert.id)}
          key={alert.id}
          severity={alert.alertType}
        >
          {alert.msg}
        </MaterialUIAlert>
      </div>
    );
  });

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, { removeAlert })(Alert);
