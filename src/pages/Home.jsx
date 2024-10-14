import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { AppContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { sort, categoryId } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `&title=${searchValue}` : '';

    try {
      axios
        .get(
          `http://localhost:3001/0?${
            categoryId > 0 ? `category=${categoryId}` : ''
          }${search}&_sort=${sortType}&_page=${currentPage}&_per_page=4`,
        )
        .then((res) => {
          setItems(res.data.data);
          setIsLoading(false);
        });
    } catch (error) {
      alert(error);
    }
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
        <div className="content__items">
          {isLoading
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
