export default function Loading() {
  return (
    <div>
      <div className="flex bg-main-200 border border-main-500 rounded-md py-2 px-4 m-2 h-full w-full">
        <h1 className="text-2xl font-bold">Loading...</h1>
        <div className="spinner"></div>
      </div>
    </div>
  );
}
