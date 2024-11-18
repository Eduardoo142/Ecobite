import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StoreLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Almacena el email
  const [password, setPassword] = useState(""); // Almacena la contraseña
  const [error, setError] = useState(null); // Almacena mensajes de error

  const handleNoAccount = () => {
    navigate("/select-account-type");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reinicia el estado de error

    const loginData = { email, password, userType: "store" };

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas. Por favor, intenta de nuevo.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.accessToken); // Guarda el token en el almacenamiento local
      localStorage.setItem("userType", data.userType); // Guarda el tipo de usuario en el almacenamiento local
      localStorage.setItem("storeId", data.id); // Guarda el id de la tienda en el almacenamiento local
      navigate("/store-home"); // Redirige a la lista de negocios
    } catch (err) {
      setError(err.message); // Muestra el mensaje de error en la UI
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#FF6F6F] text-black">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-5xl font-bold mb-6 text-center text-[#FF6F6F] font-leaguespartan">
          Iniciar sesión tienda
        </h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-3 rounded-lg border border-gray-300 font-leaguespartan"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-3 rounded-lg border border-gray-300 font-leaguespartan"
            required
          />
          <button
            type="submit"
            className="bg-[#FF6F6F] text-white py-3 rounded-lg font-leaguespartan text-xl"
          >
            Iniciar
          </button>

          <p className="mt-4 text-center text-sm">
            <span
              onClick={handleNoAccount}
              className="text-black cursor-pointer font-leaguespartan"
            >
              No tengo una cuenta
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StoreLogin;
