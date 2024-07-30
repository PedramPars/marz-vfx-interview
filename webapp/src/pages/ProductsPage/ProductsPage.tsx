import React, { useEffect, useState } from "react";
import PageWrapper from '../PageWrapper';
import { getProducts } from "../ApiHelper";
import { Product } from "../../components/interfaces";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from an API or use a hardcoded list
    const fetchProducts = async () => {
      const { products, errorOccured } = await getProducts();

      setProducts(products as Product[]);
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {

      const { products, errorOccured } = await getProducts();
      if (errorOccured) {
        console.error('Error fetching products');
      }
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-white">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Product List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div key={product.ProductID} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={product.ProductPhotoURL} alt={product.ProductName} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-gray-600 text-xl font-semibold">{product.ProductName}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </h1>
    </PageWrapper>
  );
};

export default ProductsPage
