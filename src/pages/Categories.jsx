import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";

function CategoriesPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Retrieve the string from the local storage
  var storedCategories = localStorage.getItem("categories");

  // Parse the string into a JavaScript object
  var categoriesAsJson = JSON.parse(storedCategories);

  async function handleLogout() {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("username");
    setLoading(false);
    navigate("/login", { replace: true });
  }
  return (
    <>
      <NavBar />
      <div>
        {categoriesAsJson.map((item) => (
          <div className="btn border rounded p-2 m-1" key={item.id}>
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoriesPage;
