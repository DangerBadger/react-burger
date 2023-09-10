/* eslint-disable react/jsx-props-no-spreading */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRoute({ component: Component, ...props }) {
  const { userInfo } = useSelector((store) => store.userData);
  const location = useLocation();

  return userInfo ? (
    <Component {...props} />
  ) : (
    <Navigate to="/login" state={{ previousLocation: location }} replace />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
