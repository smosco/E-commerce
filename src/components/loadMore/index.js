import React from 'react';
import Button from '../forms/button';

const LoadMore = ({ onLoadMoreEvt, isLoading }) => {
  return (
    <div className='loadMore'>
      <Button onClick={onLoadMoreEvt} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  );
};

export default LoadMore;
