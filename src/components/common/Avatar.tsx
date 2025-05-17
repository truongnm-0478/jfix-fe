interface AvatarProps {
  name?: string;
  avatar?: string;
  size?: number;
  rounded?: boolean;
};

const Avatar = ({ name, avatar, size = 36, rounded = true }: AvatarProps) => {
  const initials =
    name
      ?.split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  if (avatar) {
    return (
      <img
        src={avatar}
        alt="avatar"
        className={`w-${size} h-${size} ${rounded ? "rounded-md" : "rounded-full"} object-cover border`}
      />
    );
  }

  return (
    <div className={`w-${size} h-${size} ${rounded ? "rounded-md" : "rounded-full"} flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400`}>
      {initials}
    </div>
  );
};

export default Avatar;
