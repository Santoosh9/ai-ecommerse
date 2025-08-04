const mockProduct = {
  id: 1,
  name: "Sample Product",
  image: "https://via.placeholder.com/300x300.png?text=Product+Image",
  price: 29.99,
  description: "This is a sample product description. It highlights the features and benefits of the product.",
};

const ProductDetails = () => {
  const { name, image, price, description } = mockProduct;

  const handleAddToCart = () => {
    alert("Added to cart!");
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <img src={image} alt={name} style={{ width: "100%", borderRadius: 8, marginBottom: 24 }} />
      <h2 style={{ marginBottom: 12 }}>{name}</h2>
      <p style={{ fontWeight: "bold", fontSize: 20, marginBottom: 12 }}>${price.toFixed(2)}</p>
      <p style={{ marginBottom: 24 }}>{description}</p>
      <button onClick={handleAddToCart} style={{ padding: "12px 32px", background: "#007bff", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16 }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
