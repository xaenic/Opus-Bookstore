import { FaUserSecret } from "react-icons/fa";
import { IoBookSharp, IoGrid } from "react-icons/io5";
import { MdFeaturedPlayList } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');  
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.sub.role)
    return decodedToken && decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

export const isAdminAuth = () => {
  const token = localStorage.getItem('token');  
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub.role === 'admin';
  } catch (error) {
    return false;
  }
};
export const baseUrl = '192.168.254.110';
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
