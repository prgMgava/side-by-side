import {
  Flex,
  Accordion,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { InfoDropDown } from "../../components/InfoDropDown";
import { DashboardMenu } from "../../components/DashboardMenu";
import { infos } from "../../utils/infos";
import { BottomMenu } from "../../components/BottomMenu";
import LogoImg from "../../assets/images/marcador-recycle2.png";

export const Info = () => {
  const display = useBreakpointValue({ base: "flex", md: "none", lg: "none" });

  return (
    <Flex
      pl={{ base: "0", lg: "125px" }}
      w="90vw"
      minH="100vh"
      h="auto"
      m="0 auto"
      mb={{ base: "80px", lg: "0" }}
      justifyContent="space-between"
    >
      <BottomMenu />
      <DashboardMenu />
      <Flex position="absolute" top="14px" left="12px" display={display}>
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
      <Flex alignItems="center" p="10" w="100%" flexDirection="column">
        <Heading
          as="h2"
          m="3rem 0 2.5rem"
          textTransform="uppercase"
          fontSize="2xl"
        >
          Information
        </Heading>
        <Accordion w={{ base: "90vw", lg: "85%" }} allowToggle>
          {infos.map(({ title, content }, index) => (
            <InfoDropDown
              w="100%"
              title={title}
              content={content}
              key={index}
            />
          ))}
        </Accordion>
      </Flex>
    </Flex>
  );
};
