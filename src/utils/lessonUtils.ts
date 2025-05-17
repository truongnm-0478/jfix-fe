export const getColorByLevel = (level: string) => {
  switch (level) {
    case "N1":
      return "bg-red-50 text-red-500";
    case "N2":
      return "bg-orange-50 text-orange-500";
    case "N3":
      return "bg-yellow-50 text-yellow-500";
    case "N4":
      return "bg-green-50 text-green-500";
    case "N5":
      return "bg-blue-50 text-blue-500";
    default:
      return "bg-gray-50 text-gray-500";
  }
};
