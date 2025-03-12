// src/pages/DashboardPage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import { showNotification } from '../utils/notification';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const userName = 'John Doe'; // Giả lập tên người dùng

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'action', label: 'Action' },
  ];
  const tableData = [
    { id: '1', name: 'Product A', action: 'View' },
    { id: '2', name: 'Product B', action: 'View' },
  ];

  const handleAction = () => {
    showNotification('info', 'Action performed!');
  };

  return (
    <div className="p-4 md:ml-64 bg-gray-100 min-h-screen">
      <Card title={t('dashboard.title')}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {t('dashboard.welcome', { name: userName })}
          </h3>
        </div>
        <div className="mb-4">
          <Button text="submit" onClick={handleAction} variant="primary" />
        </div>
        <Card title={t('dashboard.recentActivity')}>
          <Table columns={tableColumns} data={tableData} />
        </Card>
      </Card>
    </div>
  );
};

export default DashboardPage;