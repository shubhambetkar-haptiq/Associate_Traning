import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { closeCart } from '../redux/CartSlice';
import CartModal from '../Features/CartModal';
import { Outlet, useNavigate } from 'react-router-dom';

const Mainlayout = () => {
  const isOpen = useSelector((state) => state.cart.isOpen);
  const user = useSelector((state) => state.auth.user);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerClick = () => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.open?.();
    } else {
      modalRef.current?.close?.();
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-gray-800">
      {/* Navbar with theme */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow px-4 sm:px-6 md:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer with consistent theme */}
      <Footer />

      {/* Cart Modal with stylized buttons */}
      <CartModal
        ref={modalRef}
        actions={
          <>
            <button
              className="bg-gradient-to-r from-red-500 via-ameba-400 to-orange-500 font-semibold px-5 py-2 rounded-md shadow hover:brightness-110 transition"
              onClick={() => dispatch(closeCart())}
            >
              Close
            </button>
            <button
              className="bg-gradient-to-r from-red-500 via-purple-400 to-pink-500 text-white font-semibold px-5 py-2 rounded-md shadow hover:brightness-110 transition"
              onClick={handlerClick}
            >
              Checkout
            </button>
          </>
        }
      />
    </div>
  );
};

export default Mainlayout;
