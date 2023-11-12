import { FaUserSecret } from "react-icons/fa";
import { IoBookSharp, IoGrid } from "react-icons/io5";
import { MdFeaturedPlayList } from "react-icons/md";

export const menuItems = [
  {
    name: "Customers",
    url: "/customers",
    icon: <FaUserSecret />,
    id: 1,
    active: true,
  },
  {
    name: "Books",
    url: "/books",
    icon: <IoBookSharp />,
    id: 2,
    active: false,
  },
  {
    name: "Genre",
    url: "/genre",
    icon: <IoGrid />,
    id: 3,
    active: false,
  },
  {
    name: "Featured",
    url: "/featured",
    icon: <MdFeaturedPlayList />,
    id: 4,
    active: false,
  },
];
