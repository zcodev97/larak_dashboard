import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import { Larak_System_URL } from "../../globals";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import Loading from "../Loading";
function AllClientProductsPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Retrieve the string from the local storage
  var storedCategories = localStorage.getItem("categories");
  const [data, setData] = useState();

  const [categories, setCategories] = useState([]);

  async function loadCategories() {
    setLoading(true);
    await fetch(Larak_System_URL + "categories/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail === "Given token not valid for any token type") {
          navigate("/login", { replace: true });
          return;
        }
        if (data.detail) {
          alert(data.detail);
          return;
        }

        setCategories(data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function loadData() {
    setLoading(true);
    await fetch(Larak_System_URL + "client_products/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail === "Given token not valid for any token type") {
          navigate("/login", { replace: true });
          return;
        }
        if (data.detail) {
          alert(data.detail);
          return;
        }

        window.products = data;

        setData(data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  // Parse the string into a JavaScript object
  var categoriesAsJson = JSON.parse(storedCategories);

  useEffect(() => {
    loadData();
    loadCategories();
  }, []);
  return (
    <>
      <NavBar />

      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            marginTop: "10px",
            height: window.innerHeight - 85,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              padding: "20px",
            }}
          >
            {/* products section */}
            {data
              ?.filter((product) => product.active)
              .map((product) => (
                <div
                  key={product.id}
                  style={{
                    alignItems: "center",
                    borderRadius: "20px",
                    boxShadow: "0px 2px 2px 2px #e6e6e6",
                  }}
                >
                  {/* image section */}
                  <div
                    className="text-center"
                    style={{
                      width: "auto",
                      padding: "10px",
                      backgroundImage: `url(${product.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "25px",
                    }}
                  >
                    <div
                      style={{
                        height: "140px",
                        backgroundColor: "transparent",
                        padding: "5px",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <div className="bg-light rounded">
                        <div
                          className="btn btn-light "
                          style={{
                            color: "#ff8000",
                            // border: "solid",
                            // borderWidth: "2px",
                          }}
                          onClick={() => {
                            if (window.cart === undefined) {
                              window.cart = [];
                            }
                            // Check if the item already exists in the cart
                            const existingItem = window.cart.find(
                              (cartItem) => cartItem.id === product.id
                            );

                            if (existingItem) {
                              // Item already exists, increase the quantity
                              existingItem.amount += 1;
                            } else {
                              // Item does not exist, add to cart with a quantity of 1
                              window.cart.push({ ...product, amount: 1 });
                            }

                            navigate("/all_client_products", { replace: true });
                          }}
                        >
                          <b style={{ fontSize: "20px" }}> + </b>
                        </div>
                        <b
                          className="m-4"
                          style={{
                            fontSize: "16px",

                            fontWeight: "bold",
                          }}
                        >
                          {window.cart === undefined
                            ? []
                            : window.cart.find((i) => i.id === product.id)
                                ?.amount ?? 0}
                        </b>
                        <div
                          className="btn btn-light"
                          style={{
                            color: "#ff8000",
                            // border: "solid",
                            // borderWidth: "2px",
                          }}
                          onClick={() => {
                            if (window.cart === undefined) {
                              window.cart = [];
                            }
                            // Check if the item already exists in the cart
                            const existingItem = window?.cart.find(
                              (cartItem) => cartItem.id === product.id
                            );

                            if (existingItem) {
                              if (existingItem.amount === 0) {
                              } else {
                                // Item already exists, increase the quantity
                                existingItem.amount -= 1;
                              }
                            }
                            navigate("/all_client_products", { replace: true });
                          }}
                        >
                          <b style={{ fontSize: "20px" }}> - </b>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="container text-center mt-4"
                    onClick={() => {
                      navigate("/product_details", {
                        state: {
                          id: product.id,
                          cateogry: product.cateogry,
                          image: product.image,
                          title: product.title,
                          description: product.description,
                          price: product.price,
                        },
                      });
                    }}
                  >
                    <p style={{ fontSize: "16px" }}>
                      {product.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "IQD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="m-3 text-center" style={{ fontSize: "16px" }}>
                      {product.title.length > 16
                        ? product.title.substring(0, 16)
                        : product.title}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AllClientProductsPage;
