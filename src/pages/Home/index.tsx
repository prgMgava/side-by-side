import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Center, Flex, Text, Box } from "@chakra-ui/layout";
import HomeMenu from "../../components/HomeMenu";
import cover from "../../assets/images/cover.jpg";
import eventCover from "../../assets/images/eventcover.png";
import homeMap from "../../assets/images/homemap.svg";
import homeTaggedMap from "../../assets/images/hometaggedmap.svg";
import { useHistory } from "react-router";
import { Parallax } from "react-scroll-parallax";
import { useToggleSwitchContext } from "../../providers/ToggleSwitchContext";

const Home = () => {
  const { setFormOption } = useToggleSwitchContext();
  const history = useHistory();

  const sendTo = (path: string) => {
    setFormOption(path);
    history.push("/joinUs");
  };

  return (
    <Flex direction="column">
      <HomeMenu />
      <Parallax y={[-40, 40]} tagOuter="figure">
        <Flex
          direction="column"
          justifyContent="center"
          w="100%"
          h={["65vh", "74vh", "83vh", "100vh"]}
          bg="white"
          bgImage={cover}
          backgroundSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          mt={["-38px", "-31px", "-20px"]}
        >
          <Box
            bgColor="gray.300"
            w="100%"
            h={["65vh", "74vh", "83vh", "100vh"]}
            pl={["40px", "50px", "60px", "80px"]}
            pt={{ base: "110px", lg: "180px" }}
          >
            <Text
              fontSize={["2xl", "2xl", "7xl"]}
              fontWeight="bold"
              color="white"
            >
              Find, Recycle, Connect
            </Text>
            <Text
              fontSize={["xl", "xl", "3xl"]}
              color="white"
              maxW={["200px", "300px", "350px"]}
            >
              For a cleaner and more sustainable world
            </Text>
            <Button
              mt="6"
              w="130px"
              fontSize={["xl", "xl", "2xl"]}
              fontWeight="600"
              bg="gray.50"
              color="green.300"
              h="45px"
              borderRadius="10px"
              _hover={{ bg: "green.300", color: "white" }}
              _focus={{}}
              onClick={() => sendTo("Sign up")}
            >
              Join us
            </Button>
          </Box>
        </Flex>
      </Parallax>
      <Center
        zIndex="1"
        w="100%"
        py="10"
        bg="white"
        fontSize={["3xl", "4xl"]}
        fontWeight="bold"
      >
        RECYCLING
      </Center>
      <Flex
        bg="gray.50"
        zIndex="1"
        mb="20"
        textAlign={["center", "center", "left"]}
        direction="column"
      >
        <Flex
          px="20"
          bg="white"
          justifyContent="space-around"
          alignItems="center"
          direction={["column", "column", "row"]}
        >
          <Flex justifyContent="center" direction="column">
            <Text fontSize="3xl">Find collection points</Text>
            <Text maxW="300px">
              Search for the precise places to disposal each of your specific
              wastes.
            </Text>
          </Flex>
          <Image
            src={homeTaggedMap}
            w={["200px", "250px", "300px"]}
            h={["200px", "250px", "300px"]}
          />
        </Flex>
        <Flex
          px="20"
          mt="50px"
          bg="gray.50"
          justifyContent="space-around"
          alignItems="center"
          direction={["column-reverse", "column-reverse", "row"]}
        >
          <Image
            src={homeMap}
            w={["240px", "290px", "340px"]}
            h={["240px", "290px", "340px"]}
          />
          <Flex justifyContent="center" direction="column">
            <Text fontSize="3xl">Register new points</Text>
            <Text maxW="300px">
              Contribute to our network, by adding known collection points.
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Parallax y={[-40, 40]} tagOuter="figure">
        <Flex
          direction="column"
          justifyContent="center"
          w="100%"
          h={["50vh", "60vh", "70vh", "95vh"]}
          bg="gray.100"
          bgImage={eventCover}
          backgroundSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        >
          <Box w="40vw" m="0 auto">
            <Text
              fontSize={["2xl", "2xl", "7xl"]}
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              EVENTS
            </Text>
            <Text
              fontSize={["xl", "xl", "4xl"]}
              color="white"
              textAlign="center"
            >
              Join the existing events and create new ones to contribute to
              cleaning the world.
            </Text>
          </Box>
        </Flex>
      </Parallax>
      <Flex flexDirection="column" zIndex="1">
        <Flex py="100px" alignItems="center" direction="column" bg="gray.50">
          <Text fontSize={["2xl", "2xl", "3xl"]}>Save the planet!</Text>
          <Button
            mt="6"
            w={["250px", "300px", "350px", "400px"]}
            fontSize={["xl", "xl", "2xl"]}
            fontWeight="bold"
            bg="green.300"
            color="white"
            h="45px"
            borderRadius="10px"
            _hover={{ bgColor: "green.400" }}
            _focus={{}}
            onClick={() => sendTo("Sign up")}
          >
            Join us
          </Button>
        </Flex>
        <Center
          h={["15vh", "14vh", "13vh", "12vh"]}
          fontSize={["xs", "md", "lg"]}
          bg="white"
          textAlign="center"
        >
          &copy;Copyright 2021 Euchology Brasil SA. All rights reserved
        </Center>
      </Flex>
    </Flex>
  );
};

export default Home;
