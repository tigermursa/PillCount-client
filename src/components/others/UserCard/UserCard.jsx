import Image from "next/image";

const defaultImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZGm_sSq7ogWAjMwkg3wSab31ddsrjv852EA&s";

const avaters = [
  {
    id: "1",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707753/icon-demo/mother_cbayex.webp",
  },
  {
    id: "2",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707667/icon-demo/father_upk5kd.webp",
  },
  {
    id: "3",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707545/icon-demo/granpa_y2mrww.webp",
  },
  {
    id: "4",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/littlebrother_i0dhtc.webp",
  },
  {
    id: "5",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/sister_epad6l.webp",
  },
  {
    id: "6",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/usericon_v73sbp.webp",
  },
  {
    id: "7",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/granma_jlawu7.webp",
  },
  {
    id: "8",
    icon: "https://res.cloudinary.com/dvwmhlyd6/image/upload/v1727707544/icon-demo/bigbrother_vrw9ay.webp",
  },
];

const UserCard = ({ user }) => {
  // Find the avatar from avaters array using the image field as the ID
  const avatar = avaters.find((avatar) => avatar.id === user.image);

  return (
    <div className="border rounded-lg shadow-lg p-4 w-40 h-40 bg-white">
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
