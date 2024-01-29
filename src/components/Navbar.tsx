import {
  Avatar,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getUserUsername, logout } from "../services/authServices";

const Navbar: React.FC = () => {
  const user = auth.currentUser;
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUserUsername().then((result) => {
      setUsername(result);
    });
  }, []);

  return (
    <Flex as="nav" justify="space-between" align="center" padding="1.5rem">
      <Image src="/path-to-your-logo.png" alt="App Logo" />

      <Flex align="center">
        {user ? (
          <Menu>
            <MenuButton as={Avatar} name={username}></MenuButton>
            <MenuList>
              <MenuItem>Hi {username}</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            {/* Register and Login Links */}
            <Link href="/register" marginRight="2rem">
              Register
            </Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
