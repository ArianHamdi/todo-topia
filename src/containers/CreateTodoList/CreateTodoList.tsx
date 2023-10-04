import { useTranslation } from '@/hooks/useTranslation';
import styles from './CreateTodoList.module.scss';

const CreateTodoList = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>
        {t('add')} {t('new_task')}
      </h1>
    </div>
  );
};

export default CreateTodoList;