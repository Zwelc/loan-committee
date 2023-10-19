type DetailsProp = {
  label: string;
  detail: string;
};
export default function DetailsIndicator({ label, detail }: DetailsProp) {
  return (
    <p className="flex items-center">
      <span className="flex items-center text-sm font-medium text-gray-900 ">
        <span className="flex w-2.5 h-2.5 bg-accent text-sm rounded-full mr-1.5 flex-shrink-0"></span>
        {label} : {detail}
      </span>
    </p>
  );
}
