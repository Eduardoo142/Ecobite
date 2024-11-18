import React, { useState, useEffect } from 'react';

const StoreHome = () => {
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false); // Para mostrar el formulario de creación
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: '',
    description: '',
    foto: '',
  });

  // Cargar los datos de la tienda
  useEffect(() => {
    const fetchBusiness = async () => {
      const token = localStorage.getItem('token');
      const userType = localStorage.getItem('userType');
      const storeId = localStorage.getItem('storeId');
      try {
        const response = await fetch(`http://localhost:3001/tiendas/${storeId}`);
        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    fetchBusiness();
  }, []); // No depende de businessId ya que es fijo

  // Cargar los productos de la tienda
  useEffect(() => {
    const fetchProducts = async () => {
      const storeId = localStorage.getItem('storeId');
      try {
        const response = await fetch(`http://localhost:3001/productos/tiendas/${storeId}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // No depende de businessId ya que es fijo

  // Manejar cambios en el formulario de nuevo producto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario y agregar el nuevo producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí enviamos los datos del nuevo producto a la API
    try {
      const response = await fetch(`http://localhost:3001/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          store: {id: 74}, 
        }),
      });

      if (response.ok) {
        // Si el producto se crea con éxito, actualizamos la lista de productos
        const createdProduct = await response.json();
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        setShowProductForm(false); // Ocultar el formulario después de agregar el producto
      } else {
        console.error('Error al crear el producto');
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  // Cambiar el estado de la tienda entre activa e inactiva
  const toggleStoreStatus = async () => {
    const storeId = localStorage.getItem('storeId');
    try {
      const updatedBusiness = {
        ...business,
        activa: !business.activa, // Cambiar el valor de 'activa'
      };

      const response = await fetch(`http://localhost:3001/tiendas/${storeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBusiness),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setBusiness(updatedData); // Actualizar el estado de la tienda con los nuevos datos
      } else {
        console.error('Error al actualizar el estado de la tienda');
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la tienda:', error);
    }
  };

  if (!business) return <div>Cargando tienda...</div>;

  return (
    <div className="flex flex-col items-center bg-[#FF6F6F] min-h-screen p-6">
      <h1 className="text-5xl font-bold text-white mb-6 font-spartan">
        Bienvenido a {business.establishmentNombre}
      </h1>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <img
          src={business.logo}
          alt={`${business.establishmentNombre} logo`}
          className="w-96 h-96 object-contain mb-4 mx-auto"
        />
        <div className="flex flex-col">
          <label className="mb-2 text-[#FF6F6F] font-spartan text-lg">Nombre del establecimiento</label>
          <input
            type="text"
            value={business.establishmentNombre}
            readOnly
            className="mb-4 p-3 rounded-lg border border-gray-300 font-sanchez"
          />

          {/* Opción para cambiar el estado de la tienda */}
          <div className="mt-4">
            <button
              onClick={toggleStoreStatus}
              className={`p-3 rounded-lg text-white ${business.activa ? 'bg-red-500' : 'bg-green-500'}`}
            >
              {business.activa ? 'Desactivar tienda' : 'Activar tienda'}
            </button>
          </div>

          {/* Mostrar productos */}
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
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 font-sanchez">No hay productos disponibles en esta tienda.</p>
            )}
          </div>

          {/* Botón para agregar un nuevo producto */}
          <button
            onClick={() => setShowProductForm(true)} // Mostrar el formulario para agregar un producto
            className="bg-[#FF6F6F] text-white p-2 rounded-lg mt-6"
          >
            Añadir Producto
          </button>

          {/* Formulario para agregar un producto */}
          {showProductForm && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-[#FF6F6F]">Nombre del producto</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={newProduct.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="precio" className="block text-[#FF6F6F]">Precio</label>
                <input
                  type="number"
                  name="precio"
                  id="precio"
                  value={newProduct.precio}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-[#FF6F6F]">Descripción</label>
                <textarea
                  name="description"
                  id="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="foto" className="block text-[#FF6F6F]">Foto (URL)</label>
                <input
                  type="text"
                  name="foto"
                  id="foto"
                  value={newProduct.foto}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#FF6F6F] text-white p-2 rounded-lg mt-4"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreHome;
