// src/components/Input.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string | null;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = 'text', error }) => {
  const { t } = useTranslation();

  const baseStyles = 'w-full p-2 border rounded focus:outline-none focus:ring-2';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500';

  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseStyles} ${errorStyles}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {t(`input.error.${error.toLowerCase()}`, error)} {/* Dịch lỗi nếu có */}
        </p>
      )}
    </div>
  );
};

export default Input;