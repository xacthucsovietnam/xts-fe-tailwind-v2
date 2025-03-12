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

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={isSearchable ? searchTerm : selectedLabel} // Hiển thị giá trị đã chọn khi không searchable
          onChange={(e) => {
            if (isSearchable) {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }
          }}
          onClick={() => {
            if (!isSearchable) {
              setIsOpen(!isOpen); // Khi không searchable, click để mở/đóng
            } else {
              setIsOpen(true); // Khi searchable, click để mở
            }
          }}
          onFocus={() => {
            if (isSearchable) {
              setIsOpen(true);
            }
          }}
          placeholder={t('dropdown.placeholder')}
          readOnly={!isSearchable} // Khi không searchable, input chỉ đọc
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isSearchable ? 'cursor-text' : 'cursor-pointer'
          }`}
        />
        {/* Icon Down/Up */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
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