import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Box,
	FormControl,
	Input,
	Spinner,
	Text,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import "./styles.css";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import pic from "../assets/logo.png";

//here we implementing socket.io operations...
const ENDPOINT = "http://localhost:8080";
var socket, selectedChatCompare;

export default function SingleChat({ fetchAgain, setFetchAgain }) {
	const [message, setMassage] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState();
	const { user, selectedChat, setSelectedChat, notification, setNotification } =
		ChatState();
	const [socketConnected, setSocketConnected] = useState(false);
	const [typing, setTyping] = useState(false);
	const [istyping, setIsTyping] = useState(false);
	const toast = useToast();

	//this is the default credential for animations
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRation: "xMidYMid slice",
		},
	};

	const fetchMessages = async () => {
		if (!selectedChat) return;
		try {
			const config = {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			};
			setLoading(true);
			const { data } = await axios.get(
				`http://localhost:8080/api/message/${selectedChat._id}`,
				config
			);
			setMassage(data);
			setLoading(false);
			socket.emit("join chat", selectedChat._id);
		} catch (error) {
			toast({
				title: "Error Occured!",
				description: "Failed to send the massage",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
		}
	};

	useEffect(() => {
		//here we creating connection of socket.io...
		socket = io(ENDPOINT);
		socket.emit("setup", user);
		socket.on("connected", () => setSocketConnected(true));
		socket.on("typing", () => setIsTyping(true));
		socket.on("stop typing", () => setIsTyping(false));
	}, []);
	const typingHandler = (e) => {
		setNewMessage(e.target.value);
		//Typing Indicator Logic..
		if (!socketConnected) return;
		if (!typing) {
			setTyping(true);
			socket.emit("typing", selectedChat._id);
		}
		//here we building debouncing like...
		let lastTypingTime = new Date().getTime();
		var timerLength = 3000; //sec
		setTimeout(() => {
			var timeNow = new Date().getTime();
			var timeDiff = timeNow - lastTypingTime;
			if (timeDiff >= timerLength && typing) {
				socket.emit("stop typing", selectedChat._id);
				setTyping(false);
			}
		}, timerLength);
	};
	const sendMessage = async (event) => {
		if (event.key === "Enter" && newMessage) {
			socket.emit("stop typing", selectedChat._id);
			try {
				const config = {
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${user.token}`,
					},
				};
				const { data } = await axios.post(
					`http://localhost:8080/api/message`,
					{
						content: newMessage,
						chatId: selectedChat._id,
					},
					config
				);
				setNewMessage("");
				socket.emit("new message", data);
				setMassage([...message, data]);
			} catch (error) {
				toast({
					title: "Error Occured!",
					description: "Failed to send the massage",
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "top",
				});
			}
		}
	};
	useEffect(() => {
		fetchMessages();
		//here we getting the backup of chat..
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		socket.on("message recieved", (newMessageRecieved) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare._id !== newMessageRecieved.chat._id
			) {
				//give notification..
				if (!notification.includes(newMessageRecieved)) {
					setNotification([newMessageRecieved, ...notification]);
					//here we updating chat according to message...
					setFetchAgain(!fetchAgain);
				}
			} else {
				setMassage([...message, newMessageRecieved]);
			}
		});
	});

	return (
		<>
			{selectedChat ? (
				<>
					<Text
						fontSize={{ base: "28px", md: "30px" }}
						pb={3}
						px={2}
						w="100%"
						fontFamily={"Work sans"}
						display="flex"
						justifyContent={{ base: "space-between" }}
						alignItems="center"></Text>
					<Box
						display={"flex"}
						flexDirection="column"
						justifyContent={"flex-end"}
						p={3}
						bg="#E8E8E8"
						w="100%"
						h="100%"
						overflowY={"hidden"}
						borderRadius="lg">
						{/* message chat */}
						{loading ? (
							<Spinner
								size="xl"
								w={20}
								h={20}
								alignItems="center"
								margin="auto"
							/>
						) : (
							<div className="messages">
								<ScrollableChat message={message} /> {/* messasge */}
							</div>
						)}
						<FormControl onKeyDown={sendMessage} mt={3} isRequired>
							{istyping ? (
								<div>
									<Lottie
										options={defaultOptions}
										width={70}
										style={{ marginBottom: 15, marginLeft: 0 }}
									/>
								</div>
							) : (
								<></>
							)}
							<Input
								variant={"filled"}
								border="1px solid grey"
								bg="#E0E0E0"
								placeholder="Type a message here..."
								_placeholder={{ color: "grey" }}
								onChange={typingHandler}
								value={newMessage}
							/>
						</FormControl>
					</Box>
				</>
			) : (
				<Box
					display={"flex"}
					flexDirection="column"
					alignItems="center"
					justifyContent={"center"}
					h="100%"
					gap={5}>
					<Avatar
						width={"50%"}
						height="40%"
						borderRadius="50%"
						src={pic}
						alt="pic"
					/>
					<Text fontSize={"3xl"} pb={3} fontFamily="Work sans">
						Click on a User to Start Chatting
					</Text>
				</Box>
			)}
		</>
	);
}
