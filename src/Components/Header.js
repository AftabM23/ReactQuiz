import logo from "../logo.svg";
function Header() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>The React Quiz</h1>
      </header>
    </div>
  );
}

export default Header;
