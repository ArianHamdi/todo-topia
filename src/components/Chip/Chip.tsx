import styles from './Chip.module.scss';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';

export interface IProps {
  variant: 'completed' | 'left';
  count: number;
}

const Chip = ({ variant, count }: IProps) => {
  const { t } = useTranslation();

  if (count === 0) return;

  return (
    <span className={styles.chip} data-variant={variant}>
      {count} {t(variant)}
    </span>
  );
};

export default Chip;
