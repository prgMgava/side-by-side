import { EventCard } from "../../components/EventCard";
import { DashboardMenu } from "../../components/DashboardMenu";
import {
  Flex,
  Box,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BottomMenu } from "../../components/BottomMenu";
import { useMarkers } from "../../providers/MarkersContext";
import { useAuth } from "../../providers/AuthContext";
import { useEffect } from "react";
import { useLocation } from "../../providers/LocationContext";
import { haversine } from "../../utils/haversine";
import LogoImg from "../../assets/images/marcador-recycle2.png";
import NoNearEventsImg from "../../assets/images/no_near_events.gif";

export const EventsList = () => {
  const { allEvents, displayEvents } = useMarkers();
  const { accessToken } = useAuth();
  const { location, setLocation } = useLocation();
  const display = useBreakpointValue({ base: "flex", md: "none", lg: "none" });

  const { lat: userLat, lng: userLng } = location;

  useEffect(() => {
    displayEvents(accessToken);
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Box pl={{ base: "0", lg: "125px" }} w="90vw" h="100vh" m="0 auto">
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
      <Box display="flex" flexDirection="column" alignItems="center">
        <Heading
          as="h2"
          m="5.5rem 0 2.5rem"
          textTransform="uppercase"
          fontSize="2xl"
        >
          Near Events
        </Heading>

        <Flex
          w={{ base: "100vw", lg: "85vw" }}
          direction={{ base: "column", lg: "row" }}
          wrap="wrap"
          justify="center"
          align="center"
          mb={{ base: "110px", lg: "0" }}
        >
          {allEvents &&
          allEvents.filter(
            (event) => haversine(userLat, userLng, event.lat, event.lng) < 100 //events under 100km
          ).length === 0 ? (
            <Box
              w="224px"
              h="328px"
              backgroundColor="gray.50"
            >
              <Image
                src={NoNearEventsImg}
                alt="find events near you"
                w="224px"
                h="224px"
              />
              <Text as="p" textAlign="center" margin="16px" fontSize="12px" />
              No events found nearby, be the first to start an event in the map!
              <Text />
            </Box>
          ) : (
            <></>
          )}
          {allEvents &&
            allEvents
              .filter(
                (event) =>
                  haversine(userLat, userLng, event.lat, event.lng) < 100 //events under 100km
              )
              .map((event, index) => (
                <Box key={index} m={{ base: "0.2em 0", lg: "0.5em" }}>
                  <EventCard marker={event} />
                </Box>
              ))}
        </Flex>
      </Box>
    </Box>
  );
};
