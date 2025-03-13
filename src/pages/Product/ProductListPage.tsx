// src/pages/ProductListPage.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';

// Định nghĩa interface cho sản phẩm
interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  status: string;
  price: number;
  [key: string]: any; // Index signature để tương thích với Table
}

// Định nghĩa interface cho option của Dropdown
interface Option {
  value: string;
  label: string;
}

// Dữ liệu giả lập cho sản phẩm
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Sản phẩm A',
    code: 'SP001',
    category: 'Điện tử',
    status: 'Còn hàng',
    price: 1000000,
  },
  {
    id: 2,
    name: 'Sản phẩm B',
    code: 'SP002',
    category: 'Gia dụng',
    status: 'Hết hàng',
    price: 500000,
  },
  {
    id: 3,
    name: 'Sản phẩm C',
    code: 'SP003',
    category: 'Điện tử',
    status: 'Còn hàng',
    price: 2000000,
  },
];

// Danh mục và trạng thái giả lập
const categories: Option[] = [
  { value: '', label: 'Tất cả danh mục' },
  { value: 'Điện tử', label: 'Điện tử' },
  { value: 'Gia dụng', label: 'Gia dụng' },
  { value: 'Thời trang', label: 'Thời trang' },
];

const statuses: Option[] = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'Còn hàng', label: 'Còn hàng' },
  { value: 'Hết hàng', label: 'Hết hàng' },
];

const ProductListPage: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Số sản phẩm trên mỗi trang
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Modal bộ lọc trên mobile

  // Cột của bảng (desktop)
  const columns = [
    { key: 'name', label: t('productList.name') },
    { key: 'code', label: t('productList.code') },
    { key: 'category', label: t('productList.category') },
    { key: 'status', label: t('productList.status') },
    { key: 'price', label: t('productList.price'), render: (row: Product) => `${row.price.toLocaleString()} VNĐ` },
    {
      key: 'actions',
      label: t('productList.actions'),
      render: (row: Product) => (
        <div className="flex space-x-2">
          <Button
            text={t('productList.view')}
            onClick={() => console.log(`View product ${row.id}`)}
            variant="primary"
            size="small"
          />
          <Button
            text={t('productList.edit')}
            onClick={() => console.log(`Edit product ${row.id}`)}
            variant="secondary"
            size="small"
          />
          <Button
            text={t('productList.delete')}
            onClick={() => console.log(`Delete product ${row.id}`)}
            variant="danger"
            size="small"
          />
        </div>
      ),
    },
  ];

  // Xử lý tìm kiếm và lọc
  useEffect(() => {
    setIsLoading(true);
    const filtered = mockProducts.filter((product) => {
      const matchesSearchTerm =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesStatus = selectedStatus ? product.status === selectedStatus : true;
      return matchesSearchTerm && matchesCategory && matchesStatus;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset về trang đầu khi lọc
    setIsLoading(false);
  }, [searchTerm, selectedCategory, selectedStatus]);

  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Xử lý reset bộ lọc
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
    setIsFilterModalOpen(false);
  };

  // Xử lý thêm sản phẩm (log tạm thời)
  const handleAddProduct = () => {
    console.log('Add new product');
  };

  return (
    // Loại bỏ các class không cần thiết vì đã được xử lý trong <main> của Layout
    <div>
      <Card title={t('productList.title')}>
        {/* Bộ lọc - Desktop */}
        <div className="hidden md:block mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder={t('productList.searchPlaceholder')}
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <Dropdown
              options={categories}
              selected={selectedCategory}
              onSelect={(value: string) => setSelectedCategory(value)}
            />
            <Dropdown
              options={statuses}
              selected={selectedStatus}
              onSelect={(value: string) => setSelectedStatus(value)}
            />
            <div className="flex space-x-2">
              <Button
                text={t('productList.resetFilters')}
                onClick={handleResetFilters}
                variant="secondary"
              />
              <Button
                text={t('productList.addProduct')}
                onClick={handleAddProduct}
                variant="primary"
              />
            </div>
          </div>
        </div>

        {/* Bộ lọc - Mobile */}
        <div className="md:hidden mb-4">
          <div className="flex justify-between items-center">
            <Button
              text={t('productList.filters')}
              onClick={() => setIsFilterModalOpen(true)}
              variant="secondary"
            />
            <Button
              text={t('productList.addProduct')}
              onClick={handleAddProduct}
              variant="primary"
            />
          </div>
          <Modal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
          >
            <div className="space-y-4">
              <Input
                placeholder={t('productList.searchPlaceholder')}
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
              <Dropdown
                options={categories}
                selected={selectedCategory}
                onSelect={(value: string) => setSelectedCategory(value)}
              />
              <Dropdown
                options={statuses}
                selected={selectedStatus}
                onSelect={(value: string) => setSelectedStatus(value)}
              />
              <Button
                text={t('productList.applyFilters')}
                onClick={() => setIsFilterModalOpen(false)}
                variant="primary"
              />
              <Button
                text={t('productList.resetFilters')}
                onClick={handleResetFilters}
                variant="secondary"
              />
            </div>
          </Modal>
        </div>

        {/* Danh sách sản phẩm */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Desktop: Bảng */}
            <div className="hidden md:block">
              <Table columns={columns} data={paginatedProducts} />
            </div>

            {/* Mobile: Danh sách dạng thẻ */}
            <div className="md:hidden space-y-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <Card key={product.id} title={product.name}>
                    <div className="space-y-2">
                      <p>
                        <strong>{t('productList.code')}:</strong> {product.code}
                      </p>
                      <p>
                        <strong>{t('productList.category')}:</strong> {product.category}
                      </p>
                      <p>
                        <strong>{t('productList.status')}:</strong> {product.status}
                      </p>
                      <p>
                        <strong>{t('productList.price')}:</strong>{' '}
                        {product.price.toLocaleString()} VNĐ
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          text={t('productList.view')}
                          onClick={() => console.log(`View product ${product.id}`)}
                          variant="primary"
                          size="small"
                        />
                        <Button
                          text={t('productList.edit')}
                          onClick={() => console.log(`Edit product ${product.id}`)}
                          variant="secondary"
                          size="small"
                        />
                        <Button
                          text={t('productList.delete')}
                          onClick={() => console.log(`Delete product ${product.id}`)}
                          variant="danger"
                          size="small"
                        />
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500">{t('table.noData')}</p>
              )}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-4">
                <Button
                  text={t('productList.previous')}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  variant="secondary"
                  disabled={currentPage === 1}
                />
                <span>
                  {t('productList.page')} {currentPage} / {totalPages}
                </span>
                <Button
                  text={t('productList.next')}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  variant="secondary"
                  disabled={currentPage === totalPages}
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default ProductListPage;