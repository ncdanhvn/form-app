import React from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar: React.FC = () => {
  return (
    <Flex as="nav" justify="space-between" align="center" padding="1.5rem">
      {/* App Logo */}
      <Image src="/path-to-your-logo.png" alt="App Logo" />

      {/* Navigation Links */}
      <Flex align="center">
        <Link href="/community" marginRight="2rem">
          Community
        </Link>
        <Link href="/my-forms" marginRight="2rem">
          My Forms
        </Link>

        {/* User Menu */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Image src="/path-to-user-logo.png" alt="User Logo" />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
