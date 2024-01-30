import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import MyForms from "../components/MyForms";
import Community from "../components/Community";

const sidebarWidth = 260;

const Home = () => {
  const [activeTab, setActiveTab] = useState("MyForms");

  return (
    <Flex>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        width={sidebarWidth}
      />
      <Box flex="1" overflowY="auto" ml={sidebarWidth}>
        {activeTab === "MyForms" && <MyForms />}
        {activeTab === "Community" && <Community />}
      </Box>
    </Flex>
  );
};

export default Home;
