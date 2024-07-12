import React, { useEffect } from 'react';
import useProductStore from '../../zustand/productStore';
import Product from './product';
import './styles.scss';

const ProductResults = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!Array.isArray(products.data)) return null;

  if (products.data.length < 1) {
    return <p>No search results.</p>;
  }
  return (
    <div className='products'>
      <h1>Browse Products</h1>
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
