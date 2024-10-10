import React from 'react';

import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  );

  React.useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `title=${searchValue}&_` : '' ;

    fetch(
      `http://localhost:3001/0?${search}
      ${categoryId > 0 ? `category=${categoryId}` : ''}
      &_sort=${sortType.sortProperty}
      `
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
          <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading 
        ? [...new Array(4)].map((_, index) => <Skeleton key={index} />) 
        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}</div>
      </div>
      <Pagination/>
    </>
  );
};

export default Home;
