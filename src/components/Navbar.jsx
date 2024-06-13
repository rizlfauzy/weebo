export default function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍥</span>
        <h1>WeeBoo</h1>
        <span role="img">🍥</span>
      </div>
      <div className="search-container">
        <input className="search" type="text" placeholder="Search anime..." onChange={(e) => {console.log(e)}} />
        <p className="search-results">
          Found <strong>4</strong> results
        </p>
      </div>
    </nav>
  );
}