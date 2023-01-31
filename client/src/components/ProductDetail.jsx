import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/products.service";
import Product from "./Product";

const ProductDetail = ({ selectedProductId, setSelectedProductId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", selectedProductId],
    queryFn: () => getProduct(selectedProductId),
    enabled: Boolean(selectedProductId),
  });

  if (!selectedProductId)
    return (
      <div>
        <h1 className="text-2xl font-bold text-white text-center">
          Select a product
        </h1>
      </div>
    );

  if (isLoading)
    return (
      <div>
        <h1 className="text-2xl font-bold text-white text-center">
          Getting product...
        </h1>
      </div>
    );

  return <Product product={data} setSelectedProductId={setSelectedProductId} />;
};

export default ProductDetail;
