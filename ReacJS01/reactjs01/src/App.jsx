import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Account from "./pages/Account";

function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition">
          MyShop 🛒
        </Link>
        <nav className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Products</Link>
          <Link to="/account" className="hover:text-yellow-300 transition">Account</Link>
          <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto px-6 py-10 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </Router>
  );
}
