function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-1 last:border-none text-sm">
      <span className="flex items-center gap-2 text-gray-700 font-medium">
        {icon}
        {label}
      </span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

export default Stat;