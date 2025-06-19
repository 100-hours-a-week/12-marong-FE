function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex absolute inset-0 flex-col justify-center items-center backdrop-blur-sm bg-white/70 z-60">
      <div className="w-10 h-10 rounded-full border-4 animate-spin border-purple border-t-transparent"></div>
      <p className="mt-2 text-purple">{message}</p>
    </div>
  );
}

export default LoadingScreen;
