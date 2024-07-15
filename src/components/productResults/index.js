import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProductStore from '../../zustand/productStore';
import Product from './product';
import FormSelect from '../forms/formSelect';
import './styles.scss';

const ProductResults = () => {
  const { products, fetchProducts } = useProductStore();
  const navigate = useNavigate();
  const { filterType } = useParams();

  useEffect(() => {
    fetchProducts(filterType);
  }, [fetchProducts, filterType]);

  if (!Array.isArray(products.data)) return null;

  if (products.data.length < 1) {
    return <p>No search results.</p>;
  }

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    navigate(`/search/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: 'Show all',
        value: '',
      },
      {
        name: 'Mens',
        value: 'mens',
      },
      {
        name: 'Womens',
        value: 'womens',
      },
    ],
    handleChange: handleFilter,
  };

  return (
    <div className='products'>
      <h1>Browse Products</h1>

      <FormSelect {...configFilters} />

      <div className='wrap'>
        {products.data.map((product, pos) => {
          const { name, thumbnail, price } = product;
          if (!thumbnail || !name || typeof price === 'undefined') return null;

          const configProduct = {
            thumbnail,
            name,
            price,
          };

          return <Product {...configProduct} />;
        })}
      </div>
    </div>
  );
};

export default ProductResults;
