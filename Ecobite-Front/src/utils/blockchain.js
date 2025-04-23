import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Dirección del contrato desplegado
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "restaurant",
        "type": "address"
      }
    ],
    "name": "ProductAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProducts",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "restaurant",
            "type": "address"
          }
        ],
        "internalType": "struct ProductRegistry.Product[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "restaurant",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]; // Pega aquí el ABI de tu contrato

// Proveedor local de Hardhat (si usas una red real, cámbialo)
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Clave privada del dueño del contrato (debería manejarse en el backend)
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // ⚠️ No expongas esto en el frontend
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Agrega un producto a la blockchain automáticamente cuando el restaurante lo añade
 * @param {string} nombre - Nombre del producto
 * @param {string} descripcion - Descripción del producto
 * @param {number} precio - Precio del producto en centavos (por ejemplo, 10000 para $100.00)
 * @returns {Promise<string>} - Hash de la transacción en la blockchain
 */
export const addProduct = async (nombre, descripcion, precio) => {
  try {
    console.log("Añadiendo producto a la blockchain...");

    // Llamar a la función del contrato para registrar el producto
    const tx = await contract.addProduct(nombre, descripcion, precio);
    await tx.wait(); // Esperar confirmación en la blockchain

    console.log("Producto añadido con éxito:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error al añadir el producto:", error);
    return null;
  }
};

export default contract;
