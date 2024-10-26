export type FetchPizzaArgs = {
  sortType: string;
  categoryId: number;
  searchValue: string;
  currentPage: string;
};

export type PizzaItems = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  type: number[];
  rating: number;
};

export interface PizzaSliceState {
  loading: boolean;
  items: PizzaItems[];
  errorStatus: boolean;
  error: string;
}
