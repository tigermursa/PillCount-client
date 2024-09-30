import { avaters } from "@/data/avaterData";
import Image from "next/image";

const defaultImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZGm_sSq7ogWAjMwkg3wSab31ddsrjv852EA&s";

const UserCard = ({ user }) => {
  // Find the avatar from avaters array using the image field as the ID
  const avatar = avaters.find((avatar) => avatar.id === user.image);

  return (
    <div className="border rounded-lg shadow-lg p-4 w-40 h-40 bg-white cursor-pointer hover:shadow-xl">
      <Image
        src={avatar ? avatar.icon : defaultImageUrl} // Fallback to default avatar if no image found
        alt={user.name}
        width={600}
        height={600}
        className="h-16 w-16 rounded-full mx-auto mb-4"
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold truncate">{user.name}</h3>
        <p className="text-gray-500 truncate">{user.relation}</p>
      </div>
    </div>
  );
};

export default UserCard;
