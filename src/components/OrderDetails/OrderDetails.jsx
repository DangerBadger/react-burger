import { currentOrderData } from '../../utils/data';
import { preparationStageTexts } from '../../utils/constants';
import done from '../../images/done.gif';

import stylesOrderDetails from './OrderDetails.module.css';

function OrderDetails() {
  return (
    <div className={stylesOrderDetails.container}>
      <h3 className="text text_type_digits-large mt-4">
        {currentOrderData.number}
      </h3>
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
