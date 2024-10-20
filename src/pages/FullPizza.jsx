import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:3001/pizza/` + id);
        setPizza(data);
      } catch (error) {
        alert(error);
        navigate('/');
      }
    }
    fetchData();
  }, [id, navigate]);

  if (!pizza) {
    return 'загрузка';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizzaImage" />
      <h2>{id}</h2>
      <p>{pizza.title}</p>
      <h4>{pizza.price} рябчиков</h4>
    </div>
  );
};

export default FullPizza;
