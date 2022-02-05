import React, {ReactNode} from 'react';

import Title from './title';

interface IProps {
  variant?: 'light' | 'dark';
  title: ReactNode;
  subtitle?: ReactNode;
}

const Header: React.FC<IProps> = props => {
  const {title, subtitle} = props;

  return (
    <div className="flex flex-col space-y-2">
      <Title>{title}</Title>
      {subtitle ? <p className="text-sm text-gray-600">{subtitle}</p> : null}
    </div>
  );
};

export default Header;
