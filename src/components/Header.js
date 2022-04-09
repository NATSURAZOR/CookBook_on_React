import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <nav>
      <div className="nav-section">
        <div className="nav-mainName">
        <Link className="nav-cookbook" to="/"><h1>Cookbook</h1></Link>
        </div>
        <div className="nav-topings-Name">
          <Link className="nav-recipe" to="/"><h3>Recipe</h3></Link>
          <Link className="nav-topings" to="/"><h3>Topings</h3></Link>
        </div>
      </div>
    </nav>
  );
}
