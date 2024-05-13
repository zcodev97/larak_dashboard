import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import { Larak_System_URL } from "../../globals";
import { load } from "ol/Image";
import Loading from "../Loading";

function ClientCategoriesPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();

  async function loadData() {
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

        console.log(data);

        setData(data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // // Retrieve the string from the local storage
  // var storedCategories = localStorage.getItem("categories");

  // // Parse the string into a JavaScript object
  // var categoriesAsJson = JSON.parse(storedCategories);

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
          className="container "
          style={{
            height: window.innerHeight - 85,
            overflowY: "auto",
          }}
        >
          {data?.map((item) => (
            <div className="container-fluid text-center">
              <div className="container w-100" key={item.id}>
                <div
                  className="container w-100 bg-light rounded mt-2  text-dark"
                  onClick={() => {
                    let data = window.products?.filter(
                      (i) => i.category === item.title
                    );
                    navigate("/client_products_cateogry", {
                      state: {
                        d: data,
                      },
                    });
                  }}
                >
                  <div
                    className="container-fluid rounded p-4"
                    style={{
                      fontSize: "20px",
                      color: "#de3d33",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ClientCategoriesPage;
