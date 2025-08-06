import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/CartSlice';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <p className="p-6 text-center text-lg text-slate-500">
        🛒 Your cart is empty.
      </p>
    );
  }

  return (
    <div className="space-y-5 max-h-[28rem] overflow-y-auto px-4 py-2 bg-gradient-to-br from-violet-50 to-indigo-100 rounded-xl shadow-md">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b border-indigo-300 pb-3"
        >
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg border border-indigo-300"
            onError={(e) => (e.target.style.display = 'none')}
          />

          <div className="flex-1 text-slate-800">
            <h3 className="font-semibold text-indigo-800">{item.title}</h3>
            <p className="text-amber-600 font-semibold">
              ${item.unitPrice * item.quantity}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <button
                className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded"
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, type: 'decrement' }))
                }
              >
                −
              </button>
              <span className="text-slate-700 font-medium">
                {item.quantity}
              </span>
              <button
                className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded"
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, type: 'increment' }))
                }
              >
                +
              </button>
            </div>
          </div>

          <button
            className="text-red-500 hover:text-red-600 font-semibold text-sm"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center pt-4 font-bold text-lg text-indigo-900 border-t border-indigo-300">
        <span>Total:</span>
        <span className="text-amber-700">${totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
