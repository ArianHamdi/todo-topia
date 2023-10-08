import Link, { LinkProps } from 'next/link';
import Button, { IButton } from '@/components/Button';

interface IProps extends IButton {
  href: LinkProps['href'];
}

const LinkButton = ({ href, children, ...props }: IProps) => {
  return (
    <Link href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default LinkButton;
