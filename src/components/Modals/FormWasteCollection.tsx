import {
  Flex,
  VStack,
  Text,
  Input as ChakraInput,
  Box,
  HStack,
  Icon,
  useBoolean,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";
import { AiFillShop } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiContactsBookFill, RiTimeLine, RiRecycleFill } from "react-icons/ri";
import { ButtonForms } from "../ButtonForms";
import { useState } from "react";
import { OptionsMaterialsType } from "../OptionsMaterialsTypes";
import { InputMarker, Marker } from "../../types/makerData";
import { useAuth } from "../../providers/AuthContext";
import { useMarkers } from "../../providers/MarkersContext";
import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { ModalSuccess } from "./ModalSuccess";
import { ModalError } from "./ModalError";
import { createdAWasteCollectionPoint } from "../../utils/Badges/badgesLogic";
import { useUser } from "../../providers/UserContext";

interface WCDataForm {
  title: string;
  address: string;
  contact: string;
  start_time: string;
  end_time: string;
}

interface FormWCProps extends InputMarker {
  onClose: () => void;
}

export const FormWasteCollection = ({ inputMarker, onClose }: FormWCProps) => {
  const [materialsType, setMaterialsType] = useState<string[]>([]);
  const [hasntMaterial, setHasntMaterial] = useBoolean();
  const { accessToken } = useAuth();
  const { setMarkers } = useMarkers();
  const [isLoading, setIsLoading] = useBoolean();
  const { userData } = useUser()
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

  const eventSchema = yup.object().shape({
    title: yup.string().required("Waste collection name required"),
    address: yup.string().required("Waste collection address required"),
    contact: yup.string(),
    start_time: yup.string(),
    end_time: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(eventSchema) });

  const toast = useToast()

  const createMarker = async (data: Marker, accessToken: string) => {
    api
      .post("/markers", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response: AxiosResponse<Marker>) => {
        setIsLoading.off();
        setMarkers((oldMarkers) => [...oldMarkers, response.data]);
        createdAWasteCollectionPoint(userData)
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
  };

  const wasteCollectionSubmit = (data: WCDataForm) => {
    if (materialsType.length === 0) {
      return setHasntMaterial.on();
    }
    setHasntMaterial.off();
    const newData = {
      type: "waste collection",
      materials_type: materialsType,
      ...inputMarker[0],
      ...data,
    };
    setIsLoading.on();
    createMarker(newData, accessToken);
  };

  const handleClick = () => {
    onSuccessClose();
    onClose();
  };

  return (
    <>
      <ModalSuccess
        isOpen={isSuccessOpen}
        message="Congratulations, you created an wast collection. Have you already separated yours wastes? Let's go."
        onClose={handleClick}
      />
      <ModalError
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        message="Something weird happened.
        Keep calm and try again"
      />
      <Flex
        as="form"
        justifyContent="center"
        onSubmit={handleSubmit(wasteCollectionSubmit)}
      >
        <VStack spacing="5" h="100%" w="100%">
          <Text as="p" color="green.400">
            Create a new Waste Point
          </Text>
          <Input
            icon={AiFillShop}
            placeholder="Local name"
            {...register("title")}
            error={errors.title}
          />
          <Input
            icon={FaMapMarkerAlt}
            placeholder="Address"
            error={errors.address}
            {...register("address")}
          />
          <Input
            icon={RiContactsBookFill}
            placeholder="Contact"
            error={errors.contact}
            {...register("contact")}
          />
          <HStack w="100%">
            <Input
              icon={RiTimeLine}
              placeholder="Open at:"
              error={errors.start_time}
              {...register("start_time")}
              type="time"
              position="relative"
              sx={{
                "&::-webkit-calendar-picker-indicator": {
                  background: "none",
                },
                "&::-webkit-datetime-edit-fields-wrapper": {
                  color: "gray.200",
                },
              }}
              width={["100%"]}
            />
            <Input
              icon={RiTimeLine}
              placeholder="Close at:"
              error={errors.end_time}
              {...register("end_time")}
              type="time"
              sx={{
                "&::-webkit-calendar-picker-indicator": {
                  background: "none",
                },
                "&::-webkit-datetime-edit-fields-wrapper": {
                  color: "gray.200",
                },
              }}
            />
          </HStack>
          <Flex flexDirection="column">
            <HStack pl="12px" mb="12px">
              <Icon as={RiRecycleFill} color="gray.200" />
              <Text
                as="label"
                children="Choose the types:"
                alignSelf="flex-start"
                color="gray.200"
              />
            </HStack>
          </Flex>
          <Flex flexDirection="column">
            <HStack pl="12px" mb="12px">
              <Icon as={RiRecycleFill} color="gray.200" />
              <Text
                as="label"
                children="Choose the types:"
                alignSelf="flex-start"
                color="gray.200"
              />
              {hasntMaterial && (
                <Text
                  mt="-2px"
                  mb={{ lg: "-8px" }}
                  children="Material type is required"
                  color="red.500"
                  fontSize="sm"
                />
              )}
            </HStack>

            <OptionsMaterialsType
              setMaterialsType={setMaterialsType}
              materialsType={materialsType}
            />
          </Flex>

          <Box flex="1" width="100%" textAlign="center">
            <ButtonForms
              isLoading={isLoading}
              type="submit"
              width={["75%", "75%"]}
              mt="2rem"
            >
              Create
            </ButtonForms>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};
