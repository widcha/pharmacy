import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import {
  HomeAdmin,
  ProductAdmin,
  CategoriesAdmin,
  RecipesAdmin,
  PaymentAdmin,
  ProductFlowAdmin,
} from './pages';

const App = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <SideBar/>
      </div>
      <div style={{ overflowY: 'auto', marginLeft: '210px'}}>
        <Route path="/" exact component={HomeAdmin} />
        <Route path="/manage-product" component={ProductAdmin} />
        <Route path="/category" component={CategoriesAdmin} />
        <Route path="/recipe" component={RecipesAdmin} />
        <Route path="/payment-proof" component={PaymentAdmin} />
        <Route path="/product-flow" component={ProductFlowAdmin} />
      </div>
    </div>
  );
}
 
export default App;