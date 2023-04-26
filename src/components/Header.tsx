export default function Header({ userId }: { userId: string }) {
  return (
    <header className="App-header container-fluid position-fixed top-0 d-flex flex-column justify-content-center">
      <div className="row">
        <span className="col-6 text-center">💀💀 & 🌹🌹</span>
        <span className="col-6 text-end fs-6 ps-1">Game:</span>
      </div>
    </header>
  );
}
