function FloatingAddButton({ onClick }) {
  return (
    <div className="fixed w-full max-w-sm bottom-0 z-30 mb-16">
      <div className="flex justify-end p-6">
        <button
          className="bg-brand-pink text-white rounded-full shadow-lg h-12 w-12 text-2xl"
          onClick={() => onClick()}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default FloatingAddButton