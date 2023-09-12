/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { paths } from '../../utils/constants';

function ProtectedRoute({ component: Component, onlyUnAuth, ...props }) {
  const userInfo = useSelector((store) => store.userData.userInfo);
  const location = useLocation();

  return onlyUnAuth ? (
    userInfo ? (
      <Navigate
        to={paths.mainPage}
        state={{ previousLocation: location }}
        replace
      />
    ) : (
      <Component {...props} />
    )
  ) : userInfo ? (
    <Component {...props} />
  ) : (
    <Navigate
      to={paths.loginPage}
      state={{ previousLocation: location }}
      replace
    />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  onlyUnAuth: PropTypes.bool.isRequired,
};
