import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
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
    return <h2>'Загрузка'</h2>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizzaImage" />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} рябчиков</h3>
    </div>
  );
};

export default FullPizza;
