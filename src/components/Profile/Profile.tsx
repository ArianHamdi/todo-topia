import { useInitData } from '@tma.js/sdk-react';
import styles from './Profile.module.scss';
import { generateNameAbbr, generateRandomHexColor } from '@/utils';
import { useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import { isColorDark } from '@tma.js/colors';

const Profile = () => {
  const { user } = useInitData()!;

  const { t } = useTranslation();
  const randomColor = useMemo(generateRandomHexColor, []);

  return (
    <div className={styles.profile}>
      <div
        className={styles.avatar}
        data-is-bg-dark={isColorDark(randomColor)}
        style={{ backgroundColor: randomColor }}
      >
        {generateNameAbbr(user?.firstName, user?.lastName)}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>
          {t('hi')} {user?.firstName}!
        </p>
        <p className={styles.message}>{t('welcome_message')}</p>
      </div>
    </div>
  );
};

export default Profile;
