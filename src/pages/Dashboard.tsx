// src/pages/DashboardPage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import { showNotification } from '../utils/notification';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();

  // Dữ liệu giả lập
  const user = {
    avatar: 'https://via.placeholder.com/100',
    name: 'John Doe',
    phone: '+84 123 456 789',
    address: '123 Đường Láng, Hà Nội',
  };

  const ownedEntities = [
    { logo: 'https://via.placeholder.com/50', name: 'Công ty A' },
    { logo: 'https://via.placeholder.com/50', name: 'Công ty B' },
  ];

  const linkedEntities = [
    { logo: 'https://via.placeholder.com/50', name: 'Công ty C' },
    { logo: 'https://via.placeholder.com/50', name: 'Công ty D' },
  ];

  const invitations = [
    {
      logo: 'https://via.placeholder.com/50',
      name: 'Công ty E',
      phone: '+84 987 654 321',
      address: '456 Đường Giải Phóng, Hà Nội',
    },
    {
      logo: 'https://via.placeholder.com/50',
      name: 'Công ty F',
      phone: '+84 555 666 777',
      address: '789 Đường Nguyễn Trãi, Hà Nội',
    },
  ];

  const ownedEntitiesColumns = [
    { key: 'logo', label: t('dashboard.logo'), render: (row: any) => <img src={row.logo} alt="Logo" className="w-10 h-10 rounded-full" /> },
    { key: 'name', label: t('dashboard.entityName') },
  ];

  const linkedEntitiesColumns = [
    { key: 'logo', label: t('dashboard.logo'), render: (row: any) => <img src={row.logo} alt="Logo" className="w-10 h-10 rounded-full" /> },
    { key: 'name', label: t('dashboard.entityName') },
  ];

  const invitationsColumns = [
    { key: 'logo', label: t('dashboard.logo'), render: (row: any) => <img src={row.logo} alt="Logo" className="w-10 h-10 rounded-full" /> },
    { key: 'name', label: t('dashboard.entityName') },
    { key: 'phone', label: t('dashboard.phone') },
    { key: 'address', label: t('dashboard.address') },
  ];

  const handleAction = () => {
    showNotification('info', 'Action performed!');
  };

  return (
    <div>
      <Card title={t('dashboard.title')}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {t('dashboard.welcome', { name: user.name })}
          </h3>
        </div>
        <div className="mb-4">
          <Button text="submit" onClick={handleAction} variant="primary" />
        </div>

        {/* Grid layout cho các thẻ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Thẻ 1: Thông tin người dùng */}
          <Card title={t('dashboard.userInfo')}>
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={t('dashboard.userAvatar')}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold">{t('dashboard.username')}: {user.name}</p>
                <p>{t('dashboard.phone')}: {user.phone}</p>
                <p>{t('dashboard.address')}: {user.address}</p>
              </div>
            </div>
          </Card>

          {/* Thẻ 2: Danh sách chủ thể sở hữu */}
          <Card title={t('dashboard.ownedEntities')}>
            <Table columns={ownedEntitiesColumns} data={ownedEntities} />
          </Card>

          {/* Thẻ 3: Danh sách chủ thể đã liên kết */}
          <Card title={t('dashboard.linkedEntities')}>
            <Table columns={linkedEntitiesColumns} data={linkedEntities} />
          </Card>

          {/* Thẻ 4: Danh sách lời mời liên kết */}
          <Card title={t('dashboard.invitations')}>
            <Table columns={invitationsColumns} data={invitations} />
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;