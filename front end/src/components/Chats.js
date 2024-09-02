import React, { useState, useEffect } from "react";
import { RiUserFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
	collection,
	query,
	where,
	onSnapshot,
	addDoc,
	serverTimestamp,
	orderBy,
	getDoc,
	doc,
} from "firebase/firestore";
import { db } from "../firebase";

// Function to fetch user names from Firestore
const fetchUserName = async (userId) => {
	const userDoc = await getDoc(doc(db, "users", userId));
	return userDoc.exists() ? userDoc.data().name : userId;
};

const Chats = () => {
	const [chats, setChats] = useState([]);
	const [selectedChat, setSelectedChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [usernames, setUsernames] = useState({});

	const user = localStorage.getItem("@oo_uid");

	const userData = useSelector((state) => state.user);

	useEffect(() => {
		// Fetch chats for the current user
		const q = query(
			collection(db, "chats"),
			where("participants", "array-contains", user)
		);

		const unsubscribe = onSnapshot(q, async (querySnapshot) => {
			const chatsData = [];
			const userNamesPromises = [];

			for (const doc of querySnapshot.docs) {
				const chat = { id: doc.id, ...doc.data() };

				// Fetch participant names
				const participants = chat.participants.filter(
					(participant) => participant !== user
				);
				for (const participant of participants) {
					if (!usernames[participant]) {
						userNamesPromises.push(
							fetchUserName(participant).then((name) => {
								setUsernames((prev) => ({ ...prev, [participant]: name }));
							})
						);
					}
				}

				chatsData.push(chat);
			}

			// Wait for all names to be fetched
			await Promise.all(userNamesPromises);
			setChats(chatsData);
		});

		return () => unsubscribe();
	}, [user, usernames]);

	useEffect(() => {
		if (selectedChat) {
			const messagesRef = collection(db, "chats", selectedChat, "messages");
			const q = query(messagesRef, orderBy("createdAt"));

			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const messagesData = [];
				querySnapshot.forEach((doc) => {
					messagesData.push({ id: doc.id, ...doc.data() });
				});
				setMessages(messagesData);
			});

			return () => unsubscribe();
		}
	}, [selectedChat]);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (newMessage.trim() === "") return;

		const messagesRef = collection(db, "chats", selectedChat, "messages");

		await addDoc(messagesRef, {
			text: newMessage,
			createdAt: serverTimestamp(),
			uid: user,
		});

		setNewMessage("");
	};

	console.log(chats);

	return (
		<div className="container mx-auto shadow-lg rounded-lg">
			<div className="flex flex-row justify-between bg-white">
				<div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
					{chats.map((chat) => (
						<div
							key={chat.id}
							className={`flex flex-row py-4 px-2 items-center border-b-2 ${
								selectedChat === chat.id ? "border-l-4 border-blue-400" : ""
							}`}
							onClick={() => setSelectedChat(chat.id)}>
							<div className="w-1/4">
								<RiUserFill />
							</div>
							<div className="w-full">
								<div className="text-lg font-semibold">
									{chat.participantsNames
										.filter(
											(participant) => participant !== userData.data.firstName
										)
										.join(", ")}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="w-full px-5 flex flex-col justify-between">
					<div className="flex flex-col mt-5">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${
									message.uid === user ? "justify-end" : "justify-start"
								} mb-4`}>
								<div
									className={`${
										message.uid === user ? "bg-blue-400" : "bg-gray-400"
									} py-3 px-4 rounded-3xl text-white`}>
									{message.text}
								</div>
							</div>
						))}
					</div>
					{selectedChat && (
						<div className="py-5">
							<form onSubmit={sendMessage}>
								<input
									className="w-full bg-gray-300 py-5 px-3 rounded-xl"
									type="text"
									placeholder="Type your message here..."
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
								/>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Chats;
