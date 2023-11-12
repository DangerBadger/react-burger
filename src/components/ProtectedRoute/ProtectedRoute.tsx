/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { useAppSelector } from '../../utils/hooks/useRedux';
import { TUserInfo } from '../../utils/types';

interface IProtectedRoute {
  component: FC;
  onlyUnAuth: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({
  component: Component,
  onlyUnAuth,
  ...props
}) => {
  const location = useLocation();
  const userInfo: TUserInfo | null = useAppSelector(
    (store) => store.userData.userInfo
  );
  const accessCookie = getCookie('accessToken');

  if (onlyUnAuth && accessCookie && userInfo) {
    return (
      <Navigate
        to={Paths.mainPage}
        state={{ previousLocation: location }}
        replace
      />
    );
  }
  if (!onlyUnAuth && !accessCookie && !userInfo) {
    return (
      <Navigate
        to={Paths.loginPage}
        state={{ previousLocation: location }}
        replace
      />
    );
  }

  return <Component {...props} />;
};

export default ProtectedRoute;
