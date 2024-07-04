import {Routes, Route} from 'react-router-dom';
import CheckoutPage from './path/CheckoutPage';
import ProductPage from './path/ProductPage';
import './App.css'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ProductPage/>}></Route>
        <Route path='/payment' element={<CheckoutPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
