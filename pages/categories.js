import { useEffect, useState } from "react";
import FancyInput from "../components/FancyInput/FancyInput";
import "../styles/routes/Categories.scss";
import Header from "../components/Header/Header";
import FancyButton from "../components/FancyButton/FancyButton";
import useCart from "../hooks/useCart";
import Modal from "../components/Modal/Modal";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
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
  const { items, addToCart, removeFromCart } = useCart();
  const [modalState, setModalState] = useState(false);
  const { user, login } = useAuth();
  const router = useRouter();

  return (
    <div className="CategoryPage">
      <Header currentItem="categories" />
      {modalState && (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          containerStyle={{
            minHeight: "185px",
            width: "485px",
          }}
        >
          <div className="CategoryPage__modal">
            <h2>You have to sign in first</h2>
            <FancyButton onClick={async () => await login(router)}>
              <img src="/Img/Googel.png" />
              Sign in with Google
            </FancyButton>
          </div>
        </Modal>
      )}
      <section className="CategoryPage__main">
        <div className={`CategoryPage__filterBox CategoryPage__filterBox`}>
          <div className="CategoryPage__filterBox--contents">
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
          {items.length > 0 && (
            <FancyButton
              style={{
                width: "100%",
              }}
              onClick={() => {
                localStorage.setItem("cart", JSON.stringify(items));
                console.log("items", items);
              }}
            >
              Checkout
            </FancyButton>
          )}
        </div>
        <div className="CategoryPage__productListing">
          {data.map((dataItem) => (
            <div className="CategoryPage__Item" key={dataItem.id}>
              <img
                className="CategoryPage__Item--image"
                src="/Img/itemPlaceholder.png"
                alt="placeholder"
              />

              <div className="CategoryPage__Item--details">
                <p className="CategoryPage__Item--title">
                  {dataItem.name}({dataItem.id})
                </p>
                {/* <p>Quantity: {dataItem.quantity}</p>
                <p>Volume: {dataItem.volume}</p> */}
                <div>
                  <span>${dataItem.freight}</span>
                </div>
                {items.find((item) => item.id === dataItem.id) ? (
                  <FancyButton
                    style={{
                      height: "30px",
                      width: "100%",
                      fontSize: "12px",
                    }}
                    onClick={() => removeFromCart(dataItem.id)}
                  >
                    Remove to Cart
                  </FancyButton>
                ) : (
                  <FancyButton
                    invertButton
                    style={{
                      height: "30px",
                      width: "100%",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      if (user) {
                        addToCart(dataItem);
                      } else {
                        setModalState(true);
                      }
                    }}
                  >
                    Add to Cart
                  </FancyButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
