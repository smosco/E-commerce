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
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
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
        <Button onClick={toggleModal}>Add new product</Button>
      </div>

      <Modal hideModal={hideModal} toggleModal={toggleModal}>
        <div className='addNewProductForm'>
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>
            <FormSelect
              label='Category'
              name='category'
              options={[
                { value: 'mens', name: 'Mens' },
                { value: 'womens', name: 'Womens' },
              ]}
              value={productDetails.category}
              handleChange={handleChange}
            />
            <FormInput
              label='Name'
              type='text'
              name='name'
              value={productDetails.name}
              handleChange={handleChange}
            />
            <FormInput
              label='Main image URL'
              type='url'
              name='thumbnail'
              value={productDetails.thumbnail}
              handleChange={handleChange}
            />
            <FormInput
              label='Price'
              type='number'
              name='price'
              min='0.00'
              max='10000.00'
              step='0.01'
              value={productDetails.price}
              handleChange={handleChange}
            />
            <CKEditor
              editor={ClassicEditor}
              data={productDetails.desc}
              onChange={handleEditorChange}
            />
            <Button type='submit'>Add product</Button>
          </form>
        </div>
      </Modal>

      <div className='manageProducts'>
        <h1>Manage Products</h1>
        <table className='productTable'>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
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
                    <td>{price.toLocaleString()}원</td>
                    <td>
                      <Button onClick={() => deleteProduct(documentID)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan='4'>No products found</td>
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
