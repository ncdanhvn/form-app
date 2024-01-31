import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { getUsername } from "../services/userServices";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getUserUsername, logout } from "../services/authServices";

const Sidebar = ({
  activeTab,
  setActiveTab,
  width,
}: {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  width: number;
}) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUserUsername().then((result) => {
      setUsername(result);
    });
  }, []);

  const tabStyle = (tabName: string) => ({
    bg: activeTab === tabName ? "gray.200" : "transparent",
    padding: "10px",
    borderRadius: "md",
    width: "100%",
    textAlign: "left",
    _hover: {
      background: "gray.300",
      cursor: "pointer",
    },
  });
  return (
    <Box
      width={`${width}px`}
      position="fixed"
      height="100vh"
      bg="gray.100"
      padding="20px"
    >
      <Flex alignItems="center">
        <Avatar icon={<FaUser />} />
        <Box marginLeft={2}>
          {username ? username : <Spinner size={"sm"} />}
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<ChevronDownIcon />}
            variant="outline"
            marginLeft={2}
            border={"none"}
            size={"sm"}
          />
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <VStack marginTop="8" spacing={0} align={"flex-start"}>
        <Box
          as="button"
          sx={tabStyle("MyForms")}
          onClick={() => setActiveTab("MyForms")}
        >
          My Forms
        </Box>
        <Box
          as="button"
          sx={tabStyle("Community")}
          onClick={() => setActiveTab("Community")}
        >
          Community
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
