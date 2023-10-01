/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks/useRedux';
import { TUserInfo } from '../../utils/types';
import { Paths } from '../../utils/constants';

interface IProtectedRoute {
  component: FC;
  onlyUnAuth: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({
  component: Component,
  onlyUnAuth,
  ...props
}) => {
  const userInfo: TUserInfo | null = useAppSelector(
    (store) => store.userData.userInfo
  );
  const location = useLocation();

  return onlyUnAuth ? (
    userInfo ? (
      <Navigate
        to={Paths.mainPage}
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
      to={Paths.loginPage}
      state={{ previousLocation: location }}
      replace
    />
  );
};

export default ProtectedRoute;
