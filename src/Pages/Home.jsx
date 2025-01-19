import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
          alt="Delicious food"
        />
        <div className="hero-content">
          <h2>Delicious Food, Delivered To You</h2>
          <p>
            Choose your favorite meal from our broad selection of available
            meals and enjoy a delicious lunch or dinner at home.
          </p>
          <p>
            All our meals are cooked with high-quality ingredients, just-in-time
            and of course by experienced chefs!
          </p>
        </div>
      </div>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Fresh Food</h3>
            <p>Our meals are prepared fresh daily by expert chefs.</p>
          </div>
          <div className="feature">
            <h3>Fast Delivery</h3>
            <p>We deliver your order promptly to your door.</p>
          </div>
          <div className="feature">
            <h3>Best Quality</h3>
            <p>We use only the finest ingredients available.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
