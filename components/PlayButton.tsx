import { FaPlay } from "react-icons/fa";

type Props = {};
export default function PlayButton({}: Props) {
  return (
    <button
      className="transition 
    opacity-0 rounded-full
    flex items-center
    bg-green-500
    p-4
    drop-shadow-md
    hover:scale-110
    translate
    translate-y-1/4
    group-hover:opacity-100
    group-hover:translate-y-0
    "
      onClick={() => {}}
    >
      <FaPlay className="text-black " />
    </button>
  );
}
