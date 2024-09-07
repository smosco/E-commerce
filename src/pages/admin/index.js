import React, { useState, useEffect } from 'react';
import useProductStore from '../../zustand/productStore';
import Modal from '../../components/modal';
import FormInput from '../../components/forms/formInput';
import FormSelect from '../../components/forms/formSelect';
import Button from '../../components/forms/button';
import LoadMore from '../../components/loadMore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles.scss';
import { formatPrice } from '../../utils';

const Admin = () => {
  const { products, fetchProducts, addProduct, deleteProduct, isLoading } =
    useProductStore();
  const [hideModal, setHideModal] = useState(true);
  const [productDetails, setProductDetails] = useState({
    category: 'mens',
    name: '',
    thumbnail: '',
    price: 0,
    desc: '',
    onSale: false,
    discountPrice: 0,
  });

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    fetchProducts({});
  }, [fetchProducts]);

  const toggleModal = () => setHideModal(!hideModal);

  const resetForm = () => {
    setHideModal(true);
    setProductDetails({
      category: 'mens',
      name: '',
      thumbnail: '',
      price: 0,
      desc: '',
      onSale: false,
      discountPrice: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setProductDetails((prevState) => ({
      ...prevState,
      desc: data,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...productDetails });
    resetForm();
  };

  const handleLoadMore = () => {
    fetchProducts({
      startAfterDoc: queryDoc,
      persistProducts: data,
    });
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
    isLoading: isLoading,
  };

  return (
    <div className='admin'>
      <div className='callToActions'>
        <Button onClick={toggleModal}>상품 등록</Button>
      </div>

      <Modal hideModal={hideModal} toggleModal={toggleModal}>
        <form className='addNewProduct' onSubmit={handleSubmit}>
          <h2>상품 등록</h2>

          <FormSelect
            label='카테고리'
            name='category'
            options={[
              { value: 'mens', name: '남성' },
              { value: 'womens', name: '여성' },
            ]}
            value={productDetails.category}
            handleChange={handleChange}
          />
          <FormInput
            label='상품명'
            type='text'
            name='name'
            value={productDetails.name}
            handleChange={handleChange}
          />
          <FormInput
            label='상품 이미지'
            type='url'
            name='thumbnail'
            value={productDetails.thumbnail}
            handleChange={handleChange}
          />
          <FormInput
            label='상품 가격'
            type='number'
            name='price'
            min='0'
            max='10000000'
            step='1000'
            value={productDetails.price}
            handleChange={handleChange}
          />
          {/* On Sale 체크박스 */}
          <FormInput
            label='할인 여부'
            type='checkbox'
            name='onSale'
            checked={productDetails.onSale}
            handleChange={(e) =>
              setProductDetails((prevState) => ({
                ...prevState,
                onSale: e.target.checked,
              }))
            }
          />
          {/* 할인 가격 필드 (세일 중일 때만 표시) */}
          {productDetails.onSale && (
            <FormInput
              label='할인 가격'
              type='number'
              name='discountPrice'
              min='0'
              max='10000000'
              step='1000'
              value={productDetails.discountPrice}
              handleChange={handleChange}
            />
          )}
          <CKEditor
            editor={ClassicEditor}
            data={productDetails.desc}
            onChange={handleEditorChange}
            config={{
              initialData: '<p>상품 설명을 작성해주세요.</p>',
            }}
          />
          <Button type='submit'>Add product</Button>
        </form>
      </Modal>

      <div className='manageProducts'>
        <h1>상품관리</h1>
        <table className='productTable'>
          <thead>
            <tr>
              <th>이미지</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((product, idx) => {
                const { name, thumbnail, price, documentID } = product;
                return (
                  <tr key={idx}>
                    <td>
                      <img
                        className='thumb'
                        src={thumbnail}
                        alt='productThumbnail'
                      />
                    </td>
                    <td>{name}</td>
                    <td>{formatPrice(price)}원</td>
                    <td>
                      <Button onClick={() => deleteProduct(documentID)}>
                        삭제
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan='4'>등록된 상품이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='loadMore'>
          {!isLastPage && <LoadMore {...configLoadMore} />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
