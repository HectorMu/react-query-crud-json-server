import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/products.service";

const Product = ({ product, setSelectedProductId, selectedProductId }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (hola, args) => {
      if (args === selectedProductId) {
        setSelectedProductId(null);
      }
      queryClient.invalidateQueries("products");
      console.log(args);
      console.log(selectedProductId);
    },
  });

  const handleDelete = (productId) => mutate(productId);

  return (
    <article
      onClick={() => setSelectedProductId(product.id)}
      className="bg-white p-5 shadow shadow-slate-900 rounded-lg cursor-pointer"
      key={product.id}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center mb-2 border-black border-b-[1px] py-2 gap-3 lg:gap-0">
        <h5 className="text-2xl font-bold"> {product.name}</h5>
        <button
          type="button"
          onClick={() => handleDelete(product.id)}
          className="bg-slate-700 px-2 py-1 rounded-md text-white font-bold"
        >
          Delete
        </button>
      </div>

      <p className="font-bold">{product.description}</p>
      <p className="text-cyan-600 font-bold">Only for: ${product.price}</p>

      <input
        className="mr-2"
        type="checkbox"
        checked={product.inStock}
        name=""
        id={`p${product.id}`}
      />
      <label htmlFor={`p${product.id}`} className="font-bold text-red-600">
        In Stock
      </label>
    </article>
  );
};

export default Product;
