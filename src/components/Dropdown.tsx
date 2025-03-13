// src/components/Dropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Kiểm tra xem có thể tìm kiếm không (5 option trở lên thì cho phép tìm kiếm)
  const isSearchable = options.length >= 5;

  // Lọc option khi có tìm kiếm
  const filteredOptions = isSearchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  // Lấy label của option đã chọn để hiển thị trên input
  const selectedLabel = options.find((option) => option.value === selected)?.label || '';

  // Xử lý click ra ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Tính chiều cao tối đa (10 option, mỗi option cao 40px)
  const maxHeight = Math.min(filteredOptions.length, 10) * 40;
  const showScroll = filteredOptions.length > 10;

  // Hàm xử lý mở/đóng dropdown khi click vào toàn bộ thẻ
  const handleToggleDropdown = () => {
    if (!isOpen && !isSearchable) {
      setIsOpen(true);
    } else if (!isSearchable) {
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Bọc input và icon trong div để xử lý click chung */}
      <div
        className="relative flex items-center border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleToggleDropdown}
      >
        <input
          type="text"
          value={isSearchable ? searchTerm : selectedLabel}
          onChange={(e) => {
            if (isSearchable) {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }
          }}
          onFocus={() => {
            if (isSearchable) {
              setIsOpen(true);
            }
          }}
          placeholder={t('dropdown.placeholder')}
          readOnly={!isSearchable}
          className={`flex-1 p-2 border-none rounded focus:outline-none ${
            isSearchable ? 'cursor-text' : 'cursor-pointer'
          }`}
        />
        {/* Icon Down/Up */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-black-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-black-500" />
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 w-full bg-gray-100 border rounded mt-1 text-black ${
            showScroll ? 'overflow-y-auto' : ''
          }`}
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">{t('dropdown.noOptions')}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;