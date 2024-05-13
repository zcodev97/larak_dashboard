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
import Select from "react-select";

function ClientProductsPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
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

        console.log(data);
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

  const [selectedProduct, setSelectedProduct] = useState({});
  const [productsDropDown, setProductsDropDown] = useState([]);
  let dropdownMenuproductTemp = [];

  async function loadProducts() {
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
        // console.log(data);
        data.forEach((i) => {
          dropdownMenuproductTemp.push({
            label: i.title,
            value: i.id,
            title: i.title,
            price: i.price,
            on_home_screen: i.on_home_screen,
            on_banner: i.on_banner,
            image: i.image,
            id: i.id,
            discount: i.discount,
            description: i.description,
            category: i.category,
            active: i.active,
          });
        });
        setProductsDropDown(dropdownMenuproductTemp);
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

        loadCategories();
        loadProducts();
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <NavBar />

      {loading ? (
        <Loading />
      ) : (
        <div
          className="container-fluid text-center"
          style={{
            float: "right",
            overflowY: "auto",
            height: window.innerHeight - 70,
          }}
        >
          <div
            className="container "
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              class="fa fa-bell fa-3x"
              aria-hidden="true"
              style={{ color: "lightgray" }}
            ></i>
            <div style={{ width: "10px" }}></div>

            <div className="container" style={{ fontSize: "16px" }}>
              <Select
                defaultValue={selectedProduct}
                options={productsDropDown}
                onChange={(opt) => {
                  navigate("/product_details", {
                    state: {
                      id: opt.id,
                      cateogry: opt.cateogry,
                      image: opt.image,
                      title: opt.title,
                      description: opt.description,
                      price: opt.price,
                    },
                  });
                }}
                placeholder={"product"}
              />
            </div>
          </div>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <div className="carousel-indicators">
              {data
                ?.filter((product) => product.on_banner)
                .map((product, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    className={`rounded-button ${index === 0 ? "active" : ""}`}
                    aria-current={index === 0 ? "true" : ""}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
            </div>
            <div className="carousel-inner">
              {data
                ?.filter((product) => product.on_banner && product.active)
                .map((product, index) => (
                  <div
                    key={product.id}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
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
                      style={{
                        borderRadius: "5%",
                      }}
                      className="d-block w-100   m-2"
                      src={product?.image}
                      alt={product?.title}
                      height={200}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* categories section */}
          <hr />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            {categories
              ?.filter((product) => product.on_home_screen)
              .map((item) => (
                <div
                  className="border  mt-1"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "0px 0px 5px 2px #e6e6e6",
                  }}
                  key={item.id}
                  onClick={() => {
                    let data = window.products?.filter(
                      (i) => i.category === item.title
                    );
                    navigate("/client_products_category", {
                      state: {
                        d: data,
                      },
                    });
                  }}
                >
                  <div
                    className="d-flex rounded p-3"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "75%",
                        height: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>

                  <div
                    className="container text-center text-dark"
                    style={{
                      fontSize: "16px",
                      color: "white",
                      fontWeight: "normal",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    <p className="text-center"> {item.title}</p>
                  </div>
                </div>
              ))}
            {/* {categories?.length >= 8 && (
              <div>
                <button
                  className="btn btn-light w-100 h-100"
                  onClick={() => navigate("/client_cateogries")}
                  // style={{ fontSize: "16px" }}
                >
                  View All
                </button>
              </div>
            )} */}
          </div>

          {/* <hr /> */}
          {/* products section */}
          {/* <div
            className="container-fluid "
            style={{ height: window.innerHeight - 100, overflowY: "auto" }}
          >
            {data
              ?.filter((product) => product.on_home_screen)
              .map((product) => (
                <div className="container-fluid " key={product.id}>
                  <div className="container-fluid mb-2">
                    <div className="container-fluid bg-light rounded d-flex">
                      <img
                        className="rounded"
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
                        src={product.image}
                        alt={product.title}
                        style={{ width: "25%", height: "50%" }}
                      />
                      <b
                        className="m-3 text-start"
                        style={{ fontSize: "16px" }}
                      >
                        {product.title.length > 16
                          ? product.title.substring(0, 16)
                          : product.title}
                        <br />
                        {product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "IQD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                      </b>
                      <br />
                      <div className="container-fluid text-end">
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

                            navigate("/client_products", { replace: true });
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
                            navigate("/client_products", { replace: true });
                          }}
                        >
                          <b style={{ fontSize: "20px" }}> - </b>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              ))}
          </div> */}
        </div>
      )}
    </>
  );
}

export default ClientProductsPage;
