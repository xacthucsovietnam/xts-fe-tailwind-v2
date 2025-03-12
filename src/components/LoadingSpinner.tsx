// src/components/LoadingSpinner.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'gray' | 'red';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', color = 'blue' }) => {
  const { t } = useTranslation();
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };
  const colorClasses = {
    blue: 'border-t-blue-500',
    gray: 'border-t-gray-500',
    red: 'border-t-red-500',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-2 ${sizeClasses[size]} ${colorClasses[color]} border-solid rounded-full animate-spin border-gray-200`}
      ></div>
      <span className="ml-2">{t('loading.message')}</span>
    </div>
  );
};

export default LoadingSpinner;