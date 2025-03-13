// src/pages/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown'; // Thêm import
import { showNotification } from '../utils/notification';

const ForgotPasswordPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Vietnamese' },
  ];

  const handleSubmit = () => {
    let isValid = true;
    if (!phone) {
      setPhoneError('required');
      isValid = false;
    } else if (!/^\d{10,11}$/.test(phone)) {
      setPhoneError('invalidPhone');
      isValid = false;
    } else {
      setPhoneError(null);
    }

    if (isValid) {
      showNotification('success', 'Password reset request sent!');
      navigate('/login');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('forgotPassword.title')}</h2>
          <div className="w-32">
            <Dropdown
              options={languages}
              selected={i18n.language}
              onSelect={(value) => i18n.changeLanguage(value)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('forgotPassword.phone')}
            error={phoneError}
            type="text"
          />
          <div className="flex justify-between space-x-2">
            <Button text="back" onClick={handleBack} variant="secondary" className="w-1/2" />
            <Button text="submit" onClick={handleSubmit} variant="primary" className="w-1/2" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;