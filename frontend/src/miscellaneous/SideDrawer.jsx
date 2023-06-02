import {
	Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Input,
	Menu,
	MenuItem,
	Spinner,
	Text,
	Tooltip,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../components/Authentication/ChatLoading";
import UserListItem from "../components/UserListItem";
import pic from "../assets/logo.png";

export default function SideDrawer() {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setloadingChat] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();
	const { user, setSelectedChat, chats, setChats } = ChatState();

	const logoutHandler = () => {
		localStorage.removeItem("userInfo");
		navigate("/");
	};

	const handleSearch = async () => {
		if (!search) {
			toast({
				title: "Please Enter Something in search!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "top-left",
			});
			return;
		}
		try {
			setLoading(true);
			const config = {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(
				`http://localhost:8080/api/user?search=${search}`,
				config
			);
			setLoading(false);
			setSearchResult(data);
		} catch (err) {
			toast({
				title: "Error Occured!",
				description: "Failed to load the Search Results",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom-left",
			});
			setLoading(false);
		}
	};

	const AccessChat = async (UserId) => {
		//console.log(id)
		try {
			setloadingChat(true);
			const config = {
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(
				`http://localhost:8080/api/chat`,
				{ UserId },
				config
			);
			if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
			setSelectedChat(data);
			setloadingChat(false);
			onClose();
		} catch (err) {
			toast({
				title: "Error Occured!",
				description: err.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom-left",
			});
		}
	};

	return (
		<>
			<Box
				display="flex"
				justifyContent={"space-between"}
				alignItems="center"
				bg="white"
				w="100%"
				p="5px 10px 5px 10px"
				borderWidth={"5px"}>
				<Tooltip
					label="Search Users to add Your chatList"
					hasArrow
					placement="bottom-end"
					bg={"white"}
					fontSize={16}
					borderRadius={"2px"}>
					<Button variant="ghost" onClick={onOpen}>
						<SearchIcon color={"#19BCF7"} boxSize={22} />
						<Text
							display={{ base: "none", md: "flex" }}
							px="3"
							color={"black"}
							fontSize={20}>
							Search User
						</Text>
					</Button>
				</Tooltip>
				<Box
					display="flex"
					flexDirection={"row"}
					justifyContent="center"
					alignItems={"center"}
					gap="10px"
					m={"auto"}
					bg={"white"}
					borderRadius="lg"
					borderWidth={"1px"}>
					<Avatar width={"20%"} borderRadius="50%" src={pic} alt="pic" />
					<Text fontSize={"2xl"} fontFamily="work sans">
						MY-CHAT-APP
					</Text>
				</Box>
				<div>
					<Menu>
						<MenuItem
							bg={"aquamarine"}
							// bg="#FFFFFF"
							onClick={logoutHandler}
							// bg="white"
						>
							LogOut
						</MenuItem>
					</Menu>
				</div>
			</Box>
			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent bg="#FFFFFF" color={"black"}>
					<DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
					<Text w={"84%"} m="auto">
						Here you search the user that you have already logged in expect
						current login user.
					</Text>
					<DrawerBody>
						<Box display={"flex"} pb={2}>
							<Input
								placeholder="Search by name or email"
								mr={2}
								_placeholder={{ color: "grey" }}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button
								onClick={handleSearch}
								bg="#0C9EE7"
								color={"white"}
								_hover={{ background: "#38B2AC", color: "white" }}>
								Search
							</Button>
						</Box>
						{loading ? (
							<ChatLoading />
						) : (
							searchResult?.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFn={() => AccessChat(user._id)}
								/>
							))
						)}
						{loadingChat && (
							<Spinner ml="auto" display={"flex"} color="yellow" />
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
