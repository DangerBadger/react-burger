import { useNavigate } from 'react-router-dom';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { paths } from '../../utils/constants';

import notFoundStyles from './not-found.module.css';

function NotFound() {
  const navigate = useNavigate();

  const goMain = () => {
    navigate(paths.mainPage, { replace: true });
  };

  return (
    <div className={notFoundStyles.container}>
      <div className={notFoundStyles.headerContainer}>
        <h2
          className={`className="text text_type_main-large ${notFoundStyles.header}`}
        >
          Страница не
        </h2>
        <h2 className={notFoundStyles.headerDots}>...</h2>
        <h2
          className={`className="text text_type_main-large ${notFoundStyles.headerFall}`}
        >
          найдена
        </h2>
      </div>
      <p
        className={`text text_type_main-default ${notFoundStyles.questionText}`}
      >
        Вернёмся в Stellar Burgers?
      </p>
      <Button
        htmlType="button"
        onClick={goMain}
        type="primary"
        size="small"
        extraClass="ml-2"
      >
        На главную
      </Button>
    </div>
  );
}

export default NotFound;
