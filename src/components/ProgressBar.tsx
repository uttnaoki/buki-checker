interface ProgressBarProps {
  checkedCount: number;
  totalCount: number;
  label?: string;
}

export function ProgressBar({
  checkedCount,
  totalCount,
  label = '達成度',
}: ProgressBarProps) {
  const progressPercentage =
    totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-bold text-green-600">
          {checkedCount} / {totalCount}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-green-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 text-right mt-1">
        {progressPercentage.toFixed(1)}%
      </div>
    </div>
  );
}
