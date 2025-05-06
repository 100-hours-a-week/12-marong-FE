function  LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner