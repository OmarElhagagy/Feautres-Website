import ProductItem from './ProductItem';

function ProductList({ products, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductItem key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ProductList;
