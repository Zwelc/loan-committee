type DetailsProp = {
  label: string;
  detail: string;
};
export default function DetailsRow({ label, detail }: DetailsProp) {
  return (
    <div className="py-3 ">
      <div className="flex-1 min-w-0">
        <h6 className="text-sm font-medium text-gray-900 truncate">{label}</h6>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900">
        {detail}
      </div>
    </div>
  );
}
