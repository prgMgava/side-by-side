import {
  Box,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import BadgesDisplay from "../../components/BadgesDisplay";
import { BottomMenu } from "../../components/BottomMenu";
import { DashboardMenu } from "../../components/DashboardMenu";
import { UserInfo } from "../../components/UserInfo";
import LogoImg from "../../assets/images/marcador-recycle2.png";
import { ButtonSignout } from "../../components/ButtonSignout";

const Badges = () => {
  const display = useBreakpointValue({ base: "flex", lg: "none" });

  return (
    <Box mb="100px" overflow="hidden" mt="7px">
      <Flex w="100vw" align="center" justify="space-between">
        <Flex display={display} ml="12px">
          <Image src={LogoImg} w="12px" h="18px" mt="2px" opacity="40%" />
          <Text
            pl="0.2em"
            fontSize="16px"
            fontWeight="bold"
            color="green.400"
            opacity="30%"
          >
            Side by Side
          </Text>
        </Flex>
      </Flex>

      <BottomMenu />
      <DashboardMenu />

      <Flex flexDirection="column" pt={{base:"12px", lg: "28px"}}>
        <Box mt={{ base: "38px", lg: "20px" }} ml={["0", "2%", "20%", "10%"]}>
          <UserInfo />
        </Box>
      </Flex>

      <Box
        w={{ base: "100vw", lg: "68%" }}
        ml={["0", "2%", "20%", "18%"]}
        mt="40px"
        pt="20px"
        border={{ base: "0", lg: "2px" }}
        borderRadius="20px"
        borderColor={{ lg: "green.300" }}
      >
        <Heading
          as="h3"
          fontSize="26px"
          textAlign="center"
        >
          BADGES
        </Heading>
        <BadgesDisplay />
      </Box>
    </Box>
  );
};

export default Badges;
