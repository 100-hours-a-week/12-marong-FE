function FloatingAddButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-0 z-30 mb-16 w-full max-w-sm">
      <div className="flex justify-end p-6">
        <button
          className="w-12 h-12 text-2xl text-white rounded-full shadow-lg cursor-pointer bg-brown"
          onClick={() => onClick()}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default FloatingAddButton;
