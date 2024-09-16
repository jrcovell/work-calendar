async function ShiftCard({ shift }: { shift: any }) {
  const { start, end } = shift;

  return (
    <div className="py-3 px-2 bg-violet-500 grid-cols-2 gap-2 border-4 rounded-sm hover:bg-violet-300 transition ease-linear">
      <h3 className="text-slate-800 font-semibold text-xl col-span-1">
        {new Date(shift.start).toUTCString().split(" ").slice(0, 4).join(" ")}
      </h3>

      <h3 className="text-slate-800 font-semibold text-2xl items-center justify-center col-span-1">
        {new Date(shift.start).toLocaleString().slice(10, 22)}
        <span> -</span>
        {new Date(shift.end).toLocaleString().slice(10, 22)}
      </h3>
    </div>
  );
}

export default ShiftCard;
