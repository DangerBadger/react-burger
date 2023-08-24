import { useSelector } from 'react-redux';
import { currentOrderData } from '../../utils/data';

import stylesOrderDetails from './OrderDetails.module.css';

import done from '../../images/done.gif';
import { preparationStageTexts } from '../../utils/constants';

function OrderDetails() {
  const orderDetails = useSelector((store) => store.orderData.orderDetails);
  const isOrderLoading = useSelector((store) => store.orderData.orderRequest);

  return (
    <div className={stylesOrderDetails.container}>
      {isOrderLoading ? (
        <h3 className="text text_type_main-large mt-4">
          Загрузка номера заказа...
        </h3>
      ) : (
        <h3 className="text text_type_digits-large mt-4">
          {orderDetails.order.number}
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
