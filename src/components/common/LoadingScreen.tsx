function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex absolute inset-0 flex-col gap-2 justify-center items-center backdrop-blur-sm bg-white/70 z-60">
      <div className="w-10 h-10 rounded-full border-4 animate-spin border-brown border-t-transparent"></div>
      <p className="mt-2 text-brown">{message}</p>
    </div>
  );
}

export default LoadingScreen;
