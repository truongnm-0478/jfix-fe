export const getMedalColor = (index: number) => {
  switch (index) {
    case 0:
      return "text-yellow-500";
    case 1:
      return "text-gray-400";
    case 2:
      return "text-amber-700";
    default:
      return "text-gray-300";
  }
};

export const formatMonth = (dateString: string) => {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });
};
