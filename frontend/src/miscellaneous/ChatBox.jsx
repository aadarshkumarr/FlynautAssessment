import { Box } from "@chakra-ui/react";
import React from "react";
import SingleChat from "../components/SingleChat";
import { ChatState } from "../Context/ChatProvider";

export default function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection={"column"}
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderWidth="1px"
      borderRadius={"lg"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}
