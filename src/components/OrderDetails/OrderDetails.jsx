import { useContext } from 'react';
import PropTypes from 'prop-types';
import { currentOrderData } from '../../utils/data';
import { preparationStageTexts } from '../../utils/constants';
import done from '../../images/done.gif';

import stylesOrderDetails from './OrderDetails.module.css';

import OrderContext from '../../services/orderContext';
import IsLoadingContext from '../../services/isLoadigContext';

function OrderDetails({ isOrderLoading }) {
  const orderContext = useContext(OrderContext);

  return (
    <div className={stylesOrderDetails.container}>
      {isOrderLoading ? (
        <h3 className="text text_type_main-large mt-4">
          Загрузка номера заказа...
        </h3>
      ) : (
        <h3 className="text text_type_digits-large mt-4">
          {orderContext.order.number}
        </h3>
      )}
      <p className="text text_type_main-medium mt-8">Идентификатор заказа</p>
      <img src={done} alt="Готовится" className="mt-15" />
      <p className="text text_type_main-default mt-15">
        {currentOrderData.preparationStage === 'cooking' &&
          preparationStageTexts.cooking}
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;

OrderDetails.propTypes = {
  isOrderLoading: PropTypes.bool.isRequired,
};
