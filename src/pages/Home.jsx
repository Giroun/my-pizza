import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { filterSelector, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaDataSelector } from '../redux/slices/pizzaSlice';

import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const { sort, categoryId, searchValue } = useSelector(filterSelector);
  const { items, loading, errorStatus } = useSelector(pizzaDataSelector);

  const dispatch = useDispatch();
  const sortType = sort.sortProperty;
  const currentPage = useSelector((state) => state.filter.currentPage);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    dispatch(
      fetchPizzas({
        sortType,
        categoryId,
        searchValue,
        currentPage,
      }),
    );
  }, [categoryId, sortType, searchValue, currentPage, dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {errorStatus ? (
          <div className="content__error-info">
            <h2>
              Произошла ошибка <span>😕</span>
            </h2>
            <p>
              К сожалению, питсы куда-то потерялись
              <br />
              Мы делаем все, чтобы их найти как можно скорее
            </p>
          </div>
        ) : (
          ''
        )}
        <div className="content__items">
          {loading
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => (
                <Link key={obj.id} to={`/pizza/${obj.id}`}>
                  <PizzaBlock {...obj} />
                </Link>
              ))}
        </div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
