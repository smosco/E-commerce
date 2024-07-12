import React, { useState, useEffect } from 'react';
import useProductStore from '../../zustand/productStore';

import Modal from '../../components/modal';
import FormInput from '../../components/forms/formInput';
import FormSelect from '../../components/forms/formSelect';
import Button from '../../components/forms/button';
import './styles.scss';

const Admin = () => {
  const { products, fetchProducts, addProduct, deleteProduct } =
    useProductStore();
  const [hideModal, setHideModal] = useState(true);
  const [productDetails, setProductDetails] = useState({
    category: 'mens',
    name: '',
    thumbnail: '',
    price: 0,
    desc: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...productDetails });
    resetForm();
  };

  return (
    <div className='admin'>
      <div className='callToActions'>
        <ul>
          <li>
            <Button onClick={toggleModal}>Add new product</Button>
          </li>
        </ul>
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

            <Button type='submit'>Add product</Button>
          </form>
        </div>
      </Modal>

      <div className='manageProducts'>
        <table border='0' cellpadding='0' cellSpacing='0'>
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className='results'
                  border='0'
                  cellpadding='0'
                  cellSpacing='0'
                >
                  <tbody>
                    {products.data.map((product, idx) => {
                      const { name, thumbnail, price, documentID } = product;
                      return (
                        <tr>
                          <td>
                            <img
                              className='thumb'
                              src={thumbnail}
                              alt='productThumbnail'
                            />
                          </td>
                          <td>{name}</td>
                          <td>{price}</td>
                          <td>
                            <Button onClick={() => deleteProduct(documentID)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
