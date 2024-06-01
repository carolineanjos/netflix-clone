import categories from "./api";
import { Row } from "./components/Row";
import { Banner } from "./components/Banner";
import { NavBar } from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <Banner />
      {categories.map((category) => {
        return <Row key={category} title={category.title} path={category.path} isLarge={category.isLarge} />;

      })}
    </div>
  );
}

export default App;
