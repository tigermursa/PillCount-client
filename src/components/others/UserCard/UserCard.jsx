import Image from "next/image";

const defaultImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZGm_sSq7ogWAjMwkg3wSab31ddsrjv852EA&s";

const UserCard = ({ user }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 w-64 bg-white">
      <Image
        src={user.image || defaultImageUrl}
        alt={user.name}
        width={600}
        height={600}
        className="h-24 w-24 rounded-full mx-auto mb-4"
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-500">{user.relation}</p>
      </div>
    </div>
  );
};

export default UserCard;
