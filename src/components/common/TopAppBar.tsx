function TopAppBar() {
  return (
    <div className="flex fixed top-0 z-50 gap-2 items-center px-4 py-2 w-full max-w-md h-14 bg-white shadow">
      <img src="/logo.png" alt="logo" className="h-full" />
      <div className="text-2xl font-bold">마롱</div>
    </div>
  );
}

export default TopAppBar;
