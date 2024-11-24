import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import { useTranslation } from "react-i18next";

const SuggestedUser = ({ user }) => {
	const { t } = useTranslation();

	const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

	return (
		<Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
			{/* left side */}
			<Flex gap={2} as={Link} to={`${user.username}`}>
				<Avatar src={user.profilePicture} />
				<Box>
					<Text fontSize={"sm"} fontWeight={"bold"}>
						{user.username}
					</Text>
					<Text color={"gray.light"} fontSize={"sm"}>
						{user.name}
					</Text>
				</Box>
			</Flex>
			{/* right side */}
			<Button
				size={"sm"}
				color={following ? "black" : "white"}
				bg={following ? "white" : "blue.400"}
				onClick={handleFollowUnfollow}
				isLoading={updating}
				_hover={{
					color: following ? "black" : "white",
					opacity: ".8",
				}}
			>
				{following ? t("unfollow") : t('follow')}
			</Button>
		</Flex>
	);
};

export default SuggestedUser;

