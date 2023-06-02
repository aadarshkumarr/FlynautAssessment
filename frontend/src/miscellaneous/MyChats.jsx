import { Avatar, Box, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatLoading from "../components/Authentication/ChatLoading";
import { getSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

export default function MyChats({ fetchAgain }) {
	const [loggedUser, setLoggedUser] = useState({});
	const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

	const toast = useToast();
	const fetchChat = async () => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(
				`http://localhost:8080/api/chat`,
				config
			);
			setChats(data);
		} catch (err) {
			toast({
				title: "Error Occured!",
				description: "Failed to Load chats",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom-left",
			});
		}
	};

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
		fetchChat();
	}, [fetchAgain]);

	return (
		<>
			<Box
				display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
				flexDirection="column"
				alignItems={"center"}
				p={3}
				bg="white"
				w={{ base: "100%", md: "31%" }}
				borderWidth="1px"
				borderRadius={"lg"}>
				<Box
					pb={3}
					px={3}
					fontSize={{ base: "28px", md: "30px" }}
					fontFamily="work sans"
					display={"flex"}
					width="100%"
					justifyContent={"space-between"}
					alignItems="center">
					My Chats
				</Box>
				<Box
					display={"flex"}
					flexDirection="column"
					p={3}
					bg="#F8F8F8"
					w="100%"
					h={"100%"}
					borderRadius="lg"
					overflow={"hidden"}>
					{chats ? (
						<Stack overflowY={"scroll"}>
							{chats?.map((chat) => (
								<Box
									onClick={() => setSelectedChat(chat)}
									cursor="pointer"
									bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
									color={selectedChat === chat ? "white" : "black"}
									borderRadius="lg"
									key={chat._id}>
									{chat.isGroupChat ? (
										<Box
											cursor="pointer"
											bg="#E8E8E8"
											_hover={{ background: "#38B2AC", color: "white" }}
											w="100%"
											display={"flex"}
											alignItems="center"
											color={"black"}
											px={3}
											py={2}
											borderRadius="lg">
											<Avatar
												mr={2}
												size="sm"
												cursor={"pointer"}
												name={user.name}
												src={user.pic}
											/>
											<Text>
												{!chat.isGroupChat
													? getSender(loggedUser, chat.users)
													: chat.chatName}
											</Text>
										</Box>
									) : (
										<Box
											cursor="pointer"
											bg="#E8E8E8"
											_hover={{ background: "#38B2AC", color: "white" }}
											w="100%"
											display={"flex"}
											alignItems="center"
											color={"black"}
											px={3}
											py={2}
											borderRadius="lg">
											{chat?.users.map((el, i) =>
												el._id !== user._id ? (
													<Avatar
														key={i}
														mr={2}
														size="sm"
														cursor={"pointer"}
														name={el.name}
														src={el.pic}
													/>
												) : (
													<></>
												)
											)}
											<Text>
												{!chat.isGroupChat
													? getSender(loggedUser, chat.users)
													: chat.chatName}
											</Text>
										</Box>
									)}
								</Box>
							))}
						</Stack>
					) : (
						<ChatLoading />
					)}
				</Box>
			</Box>
		</>
	);
}
