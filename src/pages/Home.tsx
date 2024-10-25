import React from 'react';

import { useSelector } from 'react-redux';
import { filterSelector, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { pizzaDataSelector, fetchPizzas } from '../redux/slices/pizzaSlice';

import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { sort, categoryId, searchValue } = useSelector(filterSelector);
  const { items, loading, errorStatus } = useSelector(pizzaDataSelector);

  const dispatch = useAppDispatch();
  const sortType = sort.sortProperty;
  const currentPage = useSelector((state: any) => state.filter.currentPage);

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
    window.scrollTo(0, 0);
  }, [categoryId, searchValue, currentPage, sortType, dispatch]);

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
            : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
