import { useState } from "react";
import { Link } from "react-router-dom";

const PaymentPage = ({ cartItems }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Selecciona un método de pago.");
      return;
    }
    alert(`Pago realizado con ${selectedPayment}`);
  };

  const total = cartItems.reduce((acc, item) => acc + item.precio, 0).toFixed(2);

  return (
    <div className="flex flex-col items-center bg-[#FF6F6F] min-h-screen p-6 sm:p-10 text-white">
      <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-10 font-spartan text-center">Método de Pago</h1>

      <div className="w-full max-w-4xl bg-white text-black p-4 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#FF6F6F] mb-4 sm:mb-6 text-center sm:text-left">
          Resumen del Pedido
        </h2>

        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4 shadow-sm">
            <span className="text-lg sm:text-xl font-sanchez">{item.nombre}</span>
            <span className="text-lg sm:text-xl font-sanchez">${item.precio.toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <span className="text-lg sm:text-2xl font-bold">Total</span>
          <span className="text-lg sm:text-2xl font-bold">${total}</span>
        </div>

        {/* Métodos de Pago */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#FF6F6F] mb-4">Selecciona tu método de pago</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Efectivo", "Tarjeta de Crédito", "Transferencia"].map((method) => (
              <button
                key={method}
                onClick={() => setSelectedPayment(method)}
                className={`p-3 rounded-lg font-bold shadow-md transition ${
                  selectedPayment === method
                    ? "bg-[#FF6F6F] text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de pago */}
        <button
          onClick={handlePayment}
          disabled={!selectedPayment}
          className={`mt-6 sm:mt-8 w-full py-2 sm:py-3 rounded-lg font-bold shadow-md transition ${
            selectedPayment ? "bg-[#FF6F6F] text-white hover:bg-red-600" : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Realizar Pago
        </button>
      </div>

      <Link to="/cart" className="mt-6 sm:mt-8 bg-white text-[#FF6F6F] font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:bg-gray-100">
        Volver al Carrito
      </Link>
    </div>
  );
};

export default PaymentPage;
