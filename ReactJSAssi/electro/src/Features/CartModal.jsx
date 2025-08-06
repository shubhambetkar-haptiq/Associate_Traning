// Features/CartModal.jsx
import { useImperativeHandle, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from '../components/Cart';

const CartModal = forwardRef(({ title = 'Your Cart', actions }, ref) => {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current?.showModal();
    },
    close: () => {
      dialogRef.current?.close();
    },
  }));

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl rounded-xl shadow-xl"
    >
      <div className="bg-gradient-to-br from-sky-100 to-white rounded-xl p-6 border border-blue-300 shadow-blue-200">
        <h2 className="text-2xl font-extrabold text-purple-800 mb-4 border-b pb-2">{title}</h2>

        <div className="max-h-[400px] overflow-y-auto pr-1">
          <Cart />
        </div>

        <form method="dialog" className="flex justify-end gap-3 mt-6">
          {actions}
        </form>
      </div>
    </dialog>,
    document.getElementById('modal') // Ensure this div is present in public/index.html
  );
});

export default CartModal;
