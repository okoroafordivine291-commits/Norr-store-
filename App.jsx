import { Routes, Route } from 'react-router-dom'
import Navbar from '/Navbar.jsx'
import Footer from '/Footer.jsx'
import Home from '/Home.jsx'
import Shop from '/Shop.jsx'
import ProductDetail from '/ProductDetail.jsx'
import Cart from './Cart.jsx'
import Checkout from './Checkout.jsx'
import OrderConfirmation from './OrderConfirmation.jsx'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-body">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
