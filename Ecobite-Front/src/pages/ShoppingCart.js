import { Link } from 'react-router-dom';

const ShoppingCart = ({ cartItems, setCartItems }) => {

  // Función para eliminar un producto del carrito
  const handleRemove = (index) => {
    // Eliminar el producto en el índice especificado
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Función para mostrar la notificación de "Ir al pago"
  const handlePayment = () => {
    alert("Ir al pago");
  };

  return (
    <div className="flex flex-col items-center bg-[#FF6F6F] min-h-screen p-10 text-white">
      <h1 className="text-5xl font-bold text-white mb-10 font-spartan">Carrito de Compras</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-2xl font-sanchez">El carrito está vacío</p>
      ) : (
        <div className="w-full max-w-4xl bg-white text-black p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-[#FF6F6F] mb-6">Resumen de tu carrito</h2>
          {cartItems.map((item, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
            >
              <div className="flex items-center w-1/3">
                {/* Foto pequeña del producto */}
                {item.foto && (
                  <img 
                    src={item.foto} 
                    alt={item.nombre} 
                    className="w-16 h-16 object-contain mr-4" 
                  />
                )}
                <span className="text-xl font-sanchez">{item.nombre}</span>
              </div>
              {/* Mostrar el nombre de la tienda debajo del nombre del producto */}
              {item.store && (
                <span className="text-md font-sanchez text-[#FF6F6F] ml-4">
                  {item.store.establishmentNombre}
                </span>
              )}
              <span className="text-xl font-sanchez w-1/3 text-center">${item.precio.toFixed(2)}</span> {/* Centrado del precio */}
              <button
                onClick={() => handleRemove(index)} 
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
          {/* Mostrar total del carrito */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-2xl font-bold">Total</span>
            <span className="text-2xl font-bold">${cartItems.reduce((acc, item) => acc + item.precio, 0).toFixed(2)}</span>
          </div>
          
          {/* Botón de pago */}
          <button
            onClick={handlePayment}
            className="mt-8 bg-[#FF6F6F] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-600"
          >
            Pagar
          </button>
        </div>
      )}

      <Link to="/business-list" className="mt-8 bg-white text-[#FF6F6F] font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100">
        Volver a la Lista de Negocios
      </Link>
    </div>
  );
};

export default ShoppingCart;
