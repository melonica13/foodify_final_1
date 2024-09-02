import {
	collection,
	query,
	where,
	getDocs,
	addDoc,
	serverTimestamp,
	updateDoc,
	doc,
} from "firebase/firestore";
import { db } from "../firebase";

export const initiateChat = async (
	user1,
	user2,
	customMessage,
	user1Name,
	user2Name
) => {
	try {
		const chatsRef = collection(db, "chats");

		const q = query(chatsRef, where("participants", "array-contains", user1));
		const querySnapshot = await getDocs(q);

		let chatExists = false;
		let chatId = null;

		for (const doc of querySnapshot.docs) {
			const data = doc.data();
			if (data.participants.includes(user2)) {
				chatExists = true;
				chatId = doc.id;
				break;
			}
		}

		if (!chatExists) {
			const newChat = await addDoc(chatsRef, {
				participants: [user1, user2],
				participantsNames: [user1Name, user2Name],
				createdAt: serverTimestamp(),
			});
			chatId = newChat.id;
			console.log("New chat initiated with ID: ", chatId);
		} else {
			console.log("Chat already exists between the users.");
		}

		if (customMessage && chatId) {
			const messagesRef = collection(db, "chats", chatId, "messages");
			await addDoc(messagesRef, {
				text: customMessage,
				createdAt: serverTimestamp(),
				uid: user2,
			});
			console.log("Custom message sent.");
		}

		return chatId;
	} catch (error) {
		console.error("Error initiating chat: ", error);
	}
};
