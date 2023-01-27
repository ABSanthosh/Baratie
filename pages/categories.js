import { useState } from "react";
import FancyInput from "../components/FancyInput/FancyInput";
import "../styles/routes/Categories.scss";
import Header from "../components/Header/Header";
import FancyButton from "../components/FancyButton/FancyButton";

export async function getServerSideProps(ctx) {
  // const { data } = await ;
  const data = [
    ...[...Array(20)].map((_, index) => ({
      id: index,
      name: "Poultry cuts & offal",
      freight: "4840.69",
      quantity: 34,
      volume: "12",
    })),
  ];
  return {
    props: { data },
  };
}

export default function Category({ data }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="CategoryPage">
      <Header currentItem="categories" />
      <section className="CategoryPage__main">
        <div
          className={`CategoryPage__filterBox CategoryPage__filterBox${
            isFilterOpen ? "--activeFilterBox" : ""
          }`}
        >
          <div className="CategoryPage__filterBox--contents">
            <button
              className="CategoryPage__filterBox--close"
              onClick={() => setIsFilterOpen(false)}
            >
              &#10799;
            </button>
            <h2>Filters</h2>
            <div className="CategoryPage__filterBox--column">
              <h3>Experience</h3>
              <div className="CategoryPage__filterBox--row">
                <input type="checkbox" id="noExp" />
                <label htmlFor="noExp">No Experience</label>
              </div>
              <div className="CategoryPage__filterBox--row">
                <input type="checkbox" id="12Exp" />
                <label htmlFor="12Exp">1-2 Years</label>
              </div>
              <div className="CategoryPage__filterBox--row">
                <input type="checkbox" id="34Exp" />
                <label htmlFor="34Exp">3-4 Years</label>
              </div>
              <div className="CategoryPage__filterBox--row">
                <input type="checkbox" id="5Exp" />
                <label htmlFor="5Exp">5 and above</label>
              </div>
            </div>
            <div className="CategoryPage__filterBox--column">
              <h3>Price</h3>
              <div className="CategoryPage__filterBox--row">
                <FancyInput
                  placeholder="1,000"
                  type="number"
                  onChange={() => {}}
                />
                to
                <FancyInput
                  placeholder="10,000"
                  type="number"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="CategoryPage__productListing">
          {data.map((item) => (
            <div className="CategoryPage__Item" key={item.id}>
              <img
                className="CategoryPage__Item--image"
                src="/Img/itemPlaceholder.png"
                alt="placeholder"
              />

              <div className="CategoryPage__Item--details">
                <p className="CategoryPage__Item--title">{item.name}</p>
                {/* <p>Quantity: {item.quantity}</p>
                <p>Volume: {item.volume}</p> */}
                <div>
                  <span>${item.freight}</span>
                </div>
                <FancyButton
                  invertButton
                  style={{
                    height: "30px",
                    width: "100%",
                    fontSize: "12px",
                  }}
                >
                  Add to Cart
                </FancyButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
