import { FaUserSecret } from "react-icons/fa";
import { IoBookSharp, IoGrid } from "react-icons/io5";
import { MdFeaturedPlayList } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import shield from "../assets/shield.jpg";
import card from "../assets/card.jpg";
import customer from "../assets/customer.jpg";


export const getID = ()=> {
  const token = localStorage.getItem('token');  
  const decodedToken = jwtDecode(token);
  return decodedToken.sub.sub
}
export const getAddress = ()=> {
  const token = localStorage.getItem('token');  
  const decodedToken = jwtDecode(token);
  return decodedToken.sub.address
}
export const baseUrl = '192.168.254.110';
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');  
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken && decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

export const cards = [
  {
    image: shield,
    title: "Money back guarantee",
    desc: "We offer a 100% money back guarantee.",
    id: 1,
  },
  {
    image: card,
    title: "Extensive payment options",
    desc: "PayPal, BPI, credit or debit card, GCash, and BillEase",
    id: 2,
  },
  {
    image: customer,
    title: "We're happy to help!",
    desc: "Contact us anytime at hello@bookshelf.com.ph",
    id: 3,
  },
];

export const isAdminAuth = () => {
  const token = localStorage.getItem('token');  
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub.role === 'admin';
  } catch (error) {
    return false;
  }
};

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
