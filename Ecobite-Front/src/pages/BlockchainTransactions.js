import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../utils/blockchain';
import contractAddress from '../utils/blockchain';

const BlockchainTransactions = () => {
  const { businessId } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!window.ethereum) {
          console.error("MetaMask no está instalado.");
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(contractAddress, contractABI, provider);

        const blockchainData = await contract.getProducts();
        const businessTransactions = blockchainData.filter(
          (p) => p.owner.toLowerCase() === businessId.toLowerCase()
        );

        setTransactions(businessTransactions);
      } catch (error) {
        console.error("Error al obtener transacciones de la blockchain:", error);
      }
    };

    fetchTransactions();
  }, [businessId]);

  // Datos ficticios para la demostración
  const fakeTransactions = [
    { name: "Hamburguesa de pollo", txHash: "0xabc123", timestamp: 1698765432 },
    { name: "Malteada de arequipe", txHash: "0xdef456", timestamp: 1698743210 },
    { name: "Perro", txHash: "0xghi789", timestamp: 1698722100 },
    { name: "Papitas fritas", txHash: "0xjkl012", timestamp: 1698701000 },
    { name: "Hamburguesa sencilla", txHash: "0xmnop345", timestamp: 1698680000 }
];

  return (
    <div className="flex flex-col items-center bg-[#FF6F6F] min-h-screen p-6">
      <h1 className="text-5xl font-bold text-white mb-6 font-spartan">Transacciones Blockchain</h1>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-spartan text-[#FF6F6F] mb-4">Historial de Transacciones</h2>
        <div className="overflow-auto max-h-96">
          {fakeTransactions.length > 0 ? (
            <ul>
              {fakeTransactions.map((tx, index) => (
                <li key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                  <p className="text-[#FF6F6F] font-spartan">Producto: {tx.name}</p>
                  <p className="text-gray-700 font-sanchez">Tx Hash: {tx.txHash}</p>
                  <p className="text-gray-500 font-sanchez">Fecha: {new Date(tx.timestamp * 1000).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 font-sanchez">No hay transacciones registradas.</p>
          )}
        </div>
        <Link to={`/availability/2`} className="mt-4 inline-block bg-[#FF6F6F] text-white p-2 rounded-lg">
          Volver a Productos
        </Link>
      </div>
    </div>
  );
};

export default BlockchainTransactions;
