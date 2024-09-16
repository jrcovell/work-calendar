import DeleteTimeOffButton from "./DeleteTimeOffButton";

async function TimeCard({ timeOff }: { timeOff: any }) {
  const { requestedOffDays, id } = timeOff;

  return (
    <div className="p-2 grid grid-cols-6 bg-main-300 gap-2 border-b-4 w-3/5 ">
      <div className="col-span-4  p-1">
        <h3 className="text-secondary-800 font-semibold text-2xl items-center justify-center ">
          {requestedOffDays}
        </h3>
      </div>
      <div className="col-span-2 border-l-4">
        <DeleteTimeOffButton id={id} />
      </div>
    </div>
  );
}

export default TimeCard;
