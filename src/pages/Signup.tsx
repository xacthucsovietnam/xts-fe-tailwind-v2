// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Giả định sử dụng React Router
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { showNotification } from '../utils/notification';

const SignupPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const handleSignup = () => {
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
    if (!confirmPassword) {
      setConfirmPasswordError('required');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('passwordMismatch');
      isValid = false;
    } else {
      setConfirmPasswordError(null);
    }

    if (isValid) {
      showNotification('success', 'Signup successful!');
      navigate('/login'); // Điều hướng đến Login sau khi đăng ký
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card title={t('signup.title')}>
        <div className="space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('signup.email')}
            error={emailError}
            type="email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('signup.password')}
            error={passwordError}
            type="password"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('signup.confirmPassword')}
            error={confirmPasswordError}
            type="password"
          />
          <Button text="signupButton" onClick={handleSignup} variant="primary" />
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;