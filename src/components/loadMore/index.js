import React from 'react';
import Button from '../forms/button';

const LoadMore = ({ onLoadMoreEvt, isLoading }) => {
  return (
    <div className='loadMore'>
      <Button onClick={onLoadMoreEvt} disabled={isLoading}>
        {isLoading ? '로딩중...' : '더보기'}
      </Button>
    </div>
  );
};

export default LoadMore;
