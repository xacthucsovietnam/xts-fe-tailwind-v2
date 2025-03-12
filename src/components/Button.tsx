// src/components/Button.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary', disabled = false }) => {
  const { t } = useTranslation();

  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    danger: 'bg-red-500 hover:bg-red-700 text-white',
  };

  const baseStyles =
    'font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 cursor-pointer';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles}`}
    >
      {t(`button.${text.toLowerCase()}`, text)}
    </button>
  );
};

export default Button;