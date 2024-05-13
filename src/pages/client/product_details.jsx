import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import Loading from "../Loading";

function ProductDetailsPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <NavBar />
      <div
        className="container-fluid text-center"
        style={{ height: window.innerHeight - 85, overflowY: "auto" }}
      >
        <h3 className="p-3 " style={{ fontSize: "26px" }}>
          <b> تفاصيل المنتج </b>
        </h3>

        <div className="container">
          <div className="container">
            <img
              className="rounded"
              src={location.state.image}
              style={{ width: "300px", height: "300px" }}
              alt=""
            />
          </div>
          <hr />
          <p style={{ fontSize: "24px" }}>{location.state.title}</p>
          <br />
          <div className="container">
            <p style={{ fontSize: "16px" }}>{location.state.description}</p>
          </div>
          <hr />
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {location.state.price.toLocaleString("en-US", {
              style: "currency",
              currency: "IQD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </p>
          <br />

          {/* <div className="container text-center">
            <div
              className="btn btn-light "
              style={{
                color: "#ff8000",
                border: "solid",
                borderWidth: "2px",
              }}
              onClick={() => {
                if (window.cart === undefined) {
                  window.cart = [];
                }
                // Check if the item already exists in the cart
                const existingItem = window.cart.find(
                  (cartItem) => cartItem?.id === location.state.product?.id
                );

                if (existingItem) {
                  // Item already exists, increase the quantity
                  existingItem.amount += 1;
                } else {
                  // Item does not exist, add to cart with a quantity of 1
                  window.cart.push({ ...location.state?.product, amount: 1 });
                }

                navigate("/product_details", {
                  state: {
                    id: location.state.id,
                    cateogry: location.state.cateogry,
                    image: location.state.image,
                    title: location.state.title,
                    description: location.state.description,
                    price: location.state.price,
                  },
                  replace: true,
                });
              }}
            >
              <b style={{ fontSize: "20px" }}> + </b>
            </div>
            <b className="m-2" style={{ fontSize: "16px" }}>
              {window.cart === undefined
                ? []
                : window.cart.find((i) => i.id === location.state.product?.id)
                    ?.amount ?? 0}
            </b>
            <div
              className="btn btn-light"
              style={{
                color: "#ff8000",
                border: "solid",
                borderWidth: "2px",
              }}
              onClick={() => {
                if (window.cart === undefined) {
                  window.cart = [];
                }
                // Check if the item already exists in the cart
                const existingItem = window?.cart.find(
                  (cartItem) => cartItem.id === location.state.product?.id
                );

                if (existingItem) {
                  if (existingItem.amount === 0) {
                  } else {
                    // Item already exists, increase the quantity
                    existingItem.amount -= 1;
                  }
                }
                navigate("/product_details", {
                  state: {
                    id: location.state.id,
                    cateogry: location.state.cateogry,
                    image: location.state.image,
                    title: location.state.title,
                    description: location.state.description,
                    price: location.state.price,
                  },
                  replace: true,
                });
              }}
            >
              <b style={{ fontSize: "20px" }}> - </b>
            </div>
          </div> */}

          <div
            className="btn btn-warning"
            onClick={() => {
              if (window.cart === undefined) {
                window.cart = [];
              }
              // Check if the item already exists in the cart
              const existingItem = window.cart.find(
                (cartItem) => cartItem.id === location.state.id
              );

              if (existingItem) {
                // Item already exists, increase the quantity
                existingItem.amount += 1;
              } else {
                // Item does not exist, add to cart with a quantity of 1
                window.cart.push({ ...location.state, amount: 1 });
              }

              navigate("/product_details", {
                state: {
                  id: location.state.id,
                  cateogry: location.state.cateogry,
                  image: location.state.image,
                  title: location.state.title,
                  description: location.state.description,
                  price: location.state.price,
                },
                replace: true,
              });
            }}
            style={{ fontSize: "20px" }}
          >
            {window.cart === undefined
              ? 0
              : window.cart.find((i) => i.id === location.state.id)?.amount ??
                0}
            <b style={{ fontSize: "20px" }}> +</b>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
