import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiUserFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Profile = () => {
	const user = useSelector((state) => state.user);

	return (
		<div className="p-2 md:p-4 md:gap-4">
			<div className="flex items-center flex-col">
				<div className="w-28 h-28 bg-slate-200 rounded-full drop-shadow overflow-hidden text-slate-800 flex justify-center items-center text-5xl lg:text-7xl">
					{user.data.image ? (
						<img
							src={user.data.image}
							className="h-full w-full"
							alt="profile"
						/>
					) : (
						<RiUserFill />
					)}
				</div>
				<div className="text-base md:text-lg lg:text-xl font-medium my-1">
					{user.data.firstName} {user.data.lastName}
				</div>
				<div className="flex items-center gap-2 m-0">
					<span>
						<HiOutlineMail />
					</span>
					<div>{user.data.email}</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
