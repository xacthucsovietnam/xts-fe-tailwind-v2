// src/components/Card.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, footer, className }) => {
  const { t } = useTranslation();

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 ${className || ''}`}>
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>} {/* Hiển thị trực tiếp title */}
      <div className="mb-4">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};

export default Card;