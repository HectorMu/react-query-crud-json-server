import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createProduct } from "../api/products.service";

const INPUTCLASSNAME =
  "rounded-md text-xl px-2  outline-none focus-within:outline-slate-700";

const ProductForm = () => {
  const queryClient = useQueryClient();
  const formRef = useRef();

  const { mutateAsync } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      formRef.current.reset();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newProduct = Object.fromEntries(formData);
    console.log("Saving...");
    await mutateAsync({
      ...newProduct,
      inStock: true,
      price: Number(newProduct.price),
    });
    console.log("Saved...");
  };

  return (
    <form ref={formRef} className="w-full mt-[10%]" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            name="name"
            className={INPUTCLASSNAME}
            placeholder="Name"
          />
          <input
            type="number"
            name="price"
            className={INPUTCLASSNAME}
            placeholder="Price"
          />
          <input
            type="text"
            name="description"
            className={INPUTCLASSNAME}
            placeholder="Description"
          />
        </div>
        <button className="bg-gray-900 text-white font-bold text-xl rounded-lg hover:bg-slate-900 transition-all">
          Add product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
