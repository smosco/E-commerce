import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProductStore from '../../zustand/productStore';
import Product from './product';
import FormSelect from '../forms/formSelect';
import LoadMore from '../loadMore';
import './styles.scss';

const ProductResults = () => {
  const { products, fetchProducts, isLoading } = useProductStore();
  const navigate = useNavigate();
  const { filterType } = useParams();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    fetchProducts({ filterType });
  }, [fetchProducts, filterType]);

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return <p className='noProductMessage'>상품이 없어요!</p>;
  }

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    navigate(`/search/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: '전체',
        value: '',
      },
      {
        name: '남성',
        value: 'mens',
      },
      {
        name: '여성',
        value: 'womens',
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    fetchProducts({
      filterType,
      startAfterDoc: queryDoc,
      persistProducts: data,
    });
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
    isLoading: isLoading,
  };

  return (
    <div className='products'>
      <FormSelect {...configFilters} />

      <div className='wrap'>
        {data.map((product, pos) => {
          const { name, thumbnail, price } = product;
          if (!thumbnail || !name || typeof price === 'undefined') return null;

          const configProduct = {
            ...product,
          };

          return <Product key={pos} {...configProduct} />;
        })}
      </div>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
