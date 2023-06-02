import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ChatBox from "../miscellaneous/ChatBox";
import MyChats from "../miscellaneous/MyChats";
import SideDrawer from "../miscellaneous/SideDrawer";
import { Helmet } from "react-helmet-async";
export default function Chats() {
	const [fetchAgain, setFetchAgain] = useState(false);
	const { user } = ChatState();
	return (
		<>
			<Helmet>
				<title>MY-CHAT-APP</title>
			</Helmet>
			<div style={{ width: "100%" }}>
				{user && <SideDrawer />}
				<Box
					display="flex"
					justifyContent={"space-between"}
					w="100%"
					h="91.5vh"
					p="10px">
					{user && <MyChats fetchAgain={fetchAgain} />}
					{user && (
						<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
					)}
				</Box>
			</div>
		</>
	);
}
