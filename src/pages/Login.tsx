// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import { showNotification } from '../utils/notification';

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Vietnamese' },
  ];

  const handleLogin = () => {
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
    if (!password) {
      setPasswordError('required');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (isValid) {
      showNotification('success', 'Login successful!');
      navigate('/dashboard');
    }
  };

  const handleLoginWithZalo = () => {
    showNotification('info', 'Login with Zalo clicked!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('login.title')}</h2>
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
            placeholder={t('login.phone')}
            error={phoneError}
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('login.password')}
            error={passwordError}
            type="password"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-sm">{t('login.rememberMe')}</span>
            </label>
            <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
              {t('login.forgotPassword')}
            </Link>
          </div>
          <div className="flex justify-between">
            <Button
              text="loginButton"
              onClick={handleLogin}
              variant="primary"
              className="w-[calc(50%-0.25rem)]"
            />
            <Button
              text="loginWithZalo"
              onClick={handleLoginWithZalo}
              variant="secondary"
              className="w-[calc(50%-0.25rem)]"
            />
          </div>
          <div className="text-center text-sm">
            {t('login.noAccount')}
            <Link to="/signup" className="text-blue-500 hover:underline">
              {t('login.signupLink')}
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;