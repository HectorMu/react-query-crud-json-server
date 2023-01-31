import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.service";
import Product from "./Product";
import { useState } from "react";
import ProductDetail from "./ProductDetail";

const Products = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((fe, se) => se.id - fe.id),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="grid grid-cols-2 w-full gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {data.map((product) => (
          <Product
            product={product}
            setSelectedProductId={setSelectedProductId}
            selectedProductId={selectedProductId}
          />
        ))}
      </div>
      <ProductDetail
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
      />
    </div>
  );
};

export default Products;
