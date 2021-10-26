import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Flex,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { BiCalendarAlt } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { RiGroupFill } from "react-icons/ri";
import { ButtonForms } from "../ButtonForms";
import { Marker } from "../../types/makerData";
import { useEffect } from "react";
import { useUser } from "../../providers/UserContext";
import { useAuth } from "../../providers/AuthContext";
import { api } from "../../services/api";
import { ModalSuccess } from "./ModalSuccess";
import { ModalError } from "./ModalError";
import { useEventDetails } from "../../providers/EventDetailsContext";
import { useMarkers } from "../../providers/MarkersContext";
import { joinEvents } from "../../utils/Badges/badgesLogic";

interface EventDetailsProps {
  marker: Marker;
}

export const EventDetails = ({ marker }: EventDetailsProps) => {
  const { isOpen, onClose } = useEventDetails();
  const { getUser, userData } = useUser();
  const { accessToken, id } = useAuth();
  const [isLoading, setIsLoading] = useBoolean();
  const {
    isOpen: isSuccessOpen,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onClose: onErrorClose,
    onOpen: onErrorOpen,
  } = useDisclosure();
  const { updateEvent } = useMarkers();

  useEffect(() => {
    getUser(id, accessToken);
    if (marker.id) {
      updateEvent(marker.id, accessToken);
    }
  }, []);

  const toast = useToast()

  const handleSubmit = () => {
    if (marker.participants !== undefined) {
      setIsLoading.on();
      const { email, image_url, name, id: idUser, my_events } = userData;
      const userFilteredData = {
        name: name,
        email: email,
        image_url: image_url,
        id: idUser,
      };
      const newData = [userFilteredData, ...marker.participants];

      const {
        address,
        lat,
        contact,
        created_at,
        end_time,
        lng,
        start_time,
        title,
        date,
        description,
        picture_url,
        id: eventId,
        participants,
      } = marker;
      const eventFilteredData = {
        address: address,
        contact: contact,
        created_at: created_at,
        date: date,
        description: description,
        end_time: end_time,
        lat: lat,
        lng: lng,
        picture_url: picture_url,
        start_time: start_time,
        title: title,
        id: eventId,
        participants: participants,
      };

      const eventData = [eventFilteredData, ...my_events];

      if (
        !marker.participants.some((user) => user.id === userFilteredData.id)
      ) {
        api
          .patch(
            `/markers/${marker.id}`,
            { participants: newData },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((_) => {
            setIsLoading.off();
            joinEvents(userData)
              .then(resp => {
                if (resp) return toast({
                  position: "top-right",
                  duration: 3000,
                  isClosable: true,
                  render: () => (
                    <Box 
                      zIndex='10000' 
                      p='1rem 1.2rem' 
                      bg="white" 
                      borderRadius='10px'
                    >
                      <Text color="green.300" fontSize='1rem'>Won a badge!!!</Text>
                      <Text color="green.300" fontSize='0.8rem'>Check badges page to see your prize</Text>
                    </Box>
                  ),
                })
              })
              .catch(err => console.log(err))
            onSuccessOpen();
          })
          .catch((_) => {
            setIsLoading.off();
            onErrorOpen();
          });

        api
          .patch(
            `users/${idUser}`,
            { my_events: eventData },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .catch((_) => console.log("Erro ao utilizar my_event"));
      } else {
        onErrorOpen();
        setIsLoading.off();
      }
    }
  };

  const handleClick = () => {
    onSuccessClose();
    onClose();
    if (marker.id) {
      updateEvent(marker.id, accessToken);
    }
  };

  return (
    <>
      <ModalSuccess
        isOpen={isSuccessOpen}
        message=" ¡Vale!, you are part of an event now. Get ready for this adventure."
        onClose={handleClick}
      />
      <ModalError
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        message="Slow down, you already participate in this group. But you can have a WORLD of options"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="green.70" />
        <ModalContent borderRadius="6px">
          <ModalHeader padding={0}>
            <Box
              backgroundImage={`linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.5)
              ), url(${marker.picture_url})`}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              width={"100%"}
              height={150}
              color={"gray.60"}
              position={"relative"}
              bgSize={"cover"}
              bgPosition={"center"}
              borderTopRadius="6px"
            >
              <Box
                //gray layer
                width={"100%"}
                height={150}
                paddingX={5}
                paddingY={5}
                color={"gray.60"}
                position={"absolute"}
                bgSize={"cover"}
                bgPosition={"center"}
              >
                <Text fontSize={"1.5rem"}>{marker.title}</Text>
                <Flex direction={"column"} position={"absolute"} bottom={2}>
                  <Flex alignItems={"center"} fontSize={"1rem"}>
                    <Box marginRight={"5px"}>
                      <BiCalendarAlt />
                    </Box>
                    {marker.date}
                  </Flex>
                  <Flex alignItems={"center"} fontSize={"1rem"}>
                    <Box marginRight={"5px"}>
                      <FiClock />
                    </Box>
                    {marker.start_time} - {marker.end_time}
                  </Flex>
                </Flex>
              </Box>
              <Flex
                direction={"column"}
                position={"absolute"}
                bottom={2}
                right={4}
              >
                <Flex alignItems={"center"} fontSize={"1rem"}>
                  {marker.participants?.length}
                  <Box marginLeft={"5px"}>
                    <RiGroupFill />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </ModalHeader>
          <ModalCloseButton color="gray.60" />
          <ModalBody color={"gray.400"}>{marker.description}</ModalBody>

          <ModalFooter justifyContent={"center"}>
            <ButtonForms
              width={["250px", "250px", "250px"]}
              type={undefined}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Join
            </ButtonForms>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
