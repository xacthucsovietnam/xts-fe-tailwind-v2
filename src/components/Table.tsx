// src/components/Table.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Column {
  key: string;
  label: string;
}

interface Row {
  [key: string]: string | number;
}

interface TableProps {
  columns: Column[];
  data: Row[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th key={column.key} className="py-2 px-4 border-b text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="py-2 px-4 border-b">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center text-gray-500">
                {t('table.noData')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;