import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import whatsappLogo from '../assets/whatsapp-logo.png';

const ProductAvailability = ({ addToCart }) => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);

  // Cargar los datos de la tienda
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tiendas/${businessId}`);
        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    fetchBusiness();
  }, [businessId]);

  // Cargar los productos de la tienda
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/productos/tiendas/${businessId}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (businessId) {
      fetchProducts();
    }
  }, [businessId]);

  // Función para agregar productos al carrito
  const handleAddToCart = (product) => {
    addToCart(product); // Aquí llamamos a la función pasada como prop
  };

  if (!business) return <div>Cargando tienda...</div>;

  return (
    <div className="flex flex-col items-center bg-[#FF6F6F] min-h-screen p-6">
      <h1 className="text-5xl font-bold text-white mb-6 font-spartan">ECOBITE</h1>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <img
          src={business.logo}
          alt={`${business.establishmentNombre} logo`}
          className="w-32 h-32 object-contain mb-4 mx-auto"
        />
        <div className="flex flex-col">
          <label className="mb-2 text-[#FF6F6F] font-spartan text-lg">Nombre</label>
          <input
            type="text"
            value={business.establishmentNombre}
            readOnly
            className="mb-4 p-3 rounded-lg border border-gray-300 font-sanchez"
          />
          
          {/* Productos */}
          <div className="mt-8">
            <h2 className="text-2xl font-spartan text-[#FF6F6F] mb-4">Productos Disponibles</h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="font-spartan text-xl text-[#FF6F6F]">{product.nombre}</h3>
                    <p className="text-gray-700 font-sanchez">Precio: ${product.precio}</p>
                    <p className="text-gray-500 font-sanchez">{product.description}</p>

                    {/* Mostrar foto del producto */}
                  {product.foto && (
                    <div className="mt-4">
                      <a href={product.foto} target="_blank" rel="noopener noreferrer">
                        <img
                          src={product.foto}
                          alt={product.nombre}
                          className="w-64 h-64 object-contain mx-auto"
                        />
                      </a>
                    </div>
                  )}

                    {/* Botón para agregar al carrito */}
                    <button
                      onClick={() => handleAddToCart(product)} // Aquí se añade el producto al carrito
                      className="bg-[#FF6F6F] text-white p-2 rounded-lg mt-4"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 font-sanchez">No hay productos disponibles en esta tienda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAvailability;
