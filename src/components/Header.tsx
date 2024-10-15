import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { User } from "../types/types";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

 

interface PropsType{
  user:User|null
}

const Header = ({user}:PropsType) => {

const [isOpen,setIsOpen]=useState<boolean>(false)

const logoutHandler=async()=>{
  try {
    await signOut(auth)
    toast.success('sign out')
      setIsOpen(false)
  } catch (error) {
    toast.success('sign out failed')
  }
}

  return (
    <nav className="header">
      <Link onClick={()=>setIsOpen(false)} to={"/"}>Home</Link>
      <Link onClick={()=>setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={()=>setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>
      {user?._id ? (
        <>
          <button onClick={()=>setIsOpen((prev)=>!prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={()=>setIsOpen(false)} to="/admin/dashboard">Admin</Link>
              )}
              <Link onClick={()=>setIsOpen(false)} to="/orders">Orders</Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
