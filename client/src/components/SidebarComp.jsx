import React from "react";
import {
  Box,
  VStack,
  IconButton,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <Box>
      <IconButton
        icon={<MenuOutlined />}
        aria-label="Open Sidebar"
        onClick={onOpen}
        variant="outline"
      />
      <VStack
        className="sidebar"
        as="nav"
        pos="fixed"
        left={0}
        top={0}
        h="100vh"
        w="150px" // Adjust the width as needed
        bg="gray.800"
        color="white"
        p={4}
        spacing={4}
        display={isOpen ? "flex" : "none"}
        zIndex={10}
      >
        <CloseButton onClick={onClose} alignSelf="flex-end" />
        <h5 style={{ color: "rgba(245, 245, 245, 0.312)" }}>Navigation</h5>
        <a onClick={() => navigate("/")}>Home</a>
        <a onClick={() => navigate("/songdb")}>Song Database</a>
        <a onClick={() => navigate("/demo")}>Documentation</a>
        <a>About</a>
        <h5 style={{ color: "rgba(245, 245, 245, 0.312)" }}>User</h5>
        <a onClick={() => navigate("/")}>Profile</a>
      </VStack>
    </Box>
  );
}

export default Sidebar;
