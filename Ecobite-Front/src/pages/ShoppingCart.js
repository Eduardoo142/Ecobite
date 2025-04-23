import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const handleRemove = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <div className="flex flex-col items-center bg-[#FF6F6F] min-h-screen p-6 sm:p-10 text-white">
      <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-10 font-spartan text-center">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg sm:text-2xl font-sanchez text-center">El carrito está vacío</p>
      ) : (
        <div className="w-full max-w-4xl bg-white text-black p-4 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FF6F6F] mb-4 sm:mb-6 text-center sm:text-left">
            Resumen de tu carrito
          </h2>

          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
            >
              <div className="flex items-center w-full sm:w-1/3">
                {item.foto && (
                  <img src={item.foto} alt={item.nombre} className="w-12 sm:w-16 h-12 sm:h-16 object-contain mr-4" />
                )}
                <span className="text-lg sm:text-xl font-sanchez">{item.nombre}</span>
              </div>

              {item.store && (
                <span className="text-sm sm:text-md font-sanchez text-[#FF6F6F] text-center">{item.store.establishmentNombre}</span>
              )}

              <span className="text-lg sm:text-xl font-sanchez w-full sm:w-1/3 text-center">${item.precio.toFixed(2)}</span>

              <button onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700 mt-2 sm:mt-0">
                Eliminar
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <span className="text-lg sm:text-2xl font-bold">Total</span>
            <span className="text-lg sm:text-2xl font-bold">${cartItems.reduce((acc, item) => acc + item.precio, 0).toFixed(2)}</span>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 sm:mt-8 w-full bg-[#FF6F6F] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:bg-red-600"
          >
            Pagar
          </button>
        </div>
      )}

      <Link to="/business-list" className="mt-6 sm:mt-8 bg-white text-[#FF6F6F] font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:bg-gray-100">
        Volver a la Lista de Negocios
      </Link>
    </div>
  );
};

export default ShoppingCart;
