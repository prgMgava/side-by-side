import { HStack, Box, Text, Flex, Avatar, Icon } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { RiShieldFill, RiMapFill } from "react-icons/ri";
import { BoxBadges } from "./layouts/BoxBadges";
import { EditProfile } from "../Modals/EditProfile";
import { useUser } from "../../providers/UserContext";

export const UserInfo = () => {
  const { userData: user } = useUser();

  return (
    <Flex w="100%" justifyContent="center">
      <Flex
        position="relative"
        bg="green.300"
        flexDirection={["column", "column", "row", "row"]}
        w="70%"
        h="136px"
        borderRadius="12px"
        justifyContent={["center", "center", "center", "flex-end"]}
        alignItems={["center", "center", "flex-start", "flex-start"]}
        pl={["0px", "0px", "16px", "0px", "16px"]}
      >
        <Box
          position="absolute"
          right={["50%", "50%", "100%", "100%"]}
          top="50%"
          transform={[
            "translate(50%,-115%)",
            "translate(50%,-115%)",
            "translate(50%, -50%)",
            "translate(50%, -50%)",
          ]}
        >
          <Avatar
            w={["103px", "103px", "176px", "176px"]}
            h={["103px", "103px", "176px", "176px"]}
            src={user.image_url}
            borderRadius="50%"
            position="relative"
            _hover={{
              filter: "grayscale(70%)",
            }}
            overflow="hidden"
          >
            <EditProfile />
          </Avatar>
        </Box>

        <Flex
          flexDirection="column"
          mt="1rem"
          w={["100%", "100%", "60%", "60%"]}
          pl={["0", "0", "0", "4rem", "0"]}
        >
          <Text
            as="h1"
            fontSize={["1rem", "1rem", "1.5rem", "1.8rem", "2rem"]}
            textAlign={["center", "center", "left", "left"]}
          >
            <b>{Object.values(user).length !== 0 ? user.name : "user"}</b>
          </Text>
          <Text
            as="h2"
            fontSize="12px"
            textAlign={["center", "center", "left", "left"]}
          >
            <Icon as={FaMapMarkerAlt} /> {user.location?.country},{" "}
            {user.location?.city} - {user.location?.state}
          </Text>
        </Flex>
        <HStack
          position={["absolute", "absolute", "absolute", "relative"]}
          bottom="0"
          right={["none", "none", "5%", "none"]}
          transform="translateY(50%)"
        >
          <Box
            as={BoxBadges}
            name="Level"
            // TODO
            count={`${0}`}
            icon={AiFillStar}
          ></Box>
          <Box
            as={BoxBadges}
            name="Badges"
            count={`${
              Object.values(user).length !== 0
                ? Object.values(user.badges).filter((badge) => badge).length
                : 0
            }`}
            icon={RiShieldFill}
          ></Box>
          <Box
            as={BoxBadges}
            name="Places"
            count={`${
              Object.values(user).length !== 0 ? user.my_events.length : 0
            }`}
            icon={RiMapFill}
          ></Box>
        </HStack>
      </Flex>
    </Flex>
  );
};
