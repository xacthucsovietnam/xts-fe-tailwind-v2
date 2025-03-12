// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Giả định sử dụng React Router
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { showNotification } from '../utils/notification';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleLogin = () => {
    // Validation cơ bản
    let isValid = true;
    if (!email) {
      setEmailError('required');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('invalidEmail');
      isValid = false;
    } else {
      setEmailError(null);
    }
    if (!password) {
      setPasswordError('required');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (isValid) {
      showNotification('success', 'Login successful!');
      navigate('/dashboard'); // Điều hướng đến Dashboard sau khi đăng nhập
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card title={t('login.title')}>
        <div className="space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('login.email')}
            error={emailError}
            type="email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('login.password')}
            error={passwordError}
            type="password"
          />
          <a href="#" className="text-blue-500 text-sm hover:underline">
            {t('login.forgotPassword')}
          </a>
          <Button text="loginButton" onClick={handleLogin} variant="primary" />
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;