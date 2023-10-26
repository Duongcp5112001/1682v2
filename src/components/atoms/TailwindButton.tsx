import React from 'react';

interface ButtonProps {
  htmlType?: any;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode | React.ReactNode[]; 
}

const TailwindButton = (props: ButtonProps) => {
  const { htmlType, type, onClick, children, className } = props;
  let buttonStyles = `px-2 py-1 rounded-md ${className || ''}`;
  
  if (type === 'primary') {
    buttonStyles += ' text-white bg-btnAntd hover:bg-btnHover';
  } else if (type === 'secondary') {
    // Thêm các styles khác cho loại button khác nếu cần
  }

  return (
    <button className={buttonStyles} onClick={onClick} type={htmlType}>
      {children}
    </button>
  );
};

export default TailwindButton;
