import { Flex, Box, Heading, Text, Slide } from "@chakra-ui/react";
import { Input } from "../Input";
import { MdLocationOn } from "react-icons/md";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonForms } from "../ButtonForms";
import { useState, useEffect } from "react";
import { useUser } from "../../providers/UserContext";
import { useAuth } from "../../providers/AuthContext";
import { api } from "../../services/api";

const formSchema = yup.object().shape({
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
});

export default interface ILocationData {
  city: string;
  state: string;
  country: string;
}

export const FirstAccessForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { userData: user, getUser } = useUser();

  const { accessToken, id: idUser } = useAuth();

  const { openFirstAccessForm, setOpenFirstAccessForm } = useUser();

  const onToggle = () => setOpenFirstAccessForm(!openFirstAccessForm);

  const onSubmit = (data: ILocationData) => {
    const { id } = user;

    if (accessToken && id) {
      api
        .patch(
          `/users/${id}`,
          {
            location: data,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((resp) => getUser(idUser, accessToken))
        .catch((err) => console.log(err));
    }
    onToggle();
  };

  return (
    <>
      {openFirstAccessForm && (
        <Box
          pos="absolute"
          w="100%"
          h="100vh"
          bg="rgba(72, 135, 136, 0.5)"
          top="0"
          left="0"
          zIndex="9"
        ></Box>
      )}
      <Slide in={openFirstAccessForm} direction="bottom" style={{ zIndex: 10 }}>
        <Flex
          as="form"
          flexDirection="column"
          alignItems="center"
          zIndex="10"
          gridGap="1rem"
          p="1rem 1rem 3rem"
          w="90%"
          bg="white"
          m={["0 auto 67px", "0 auto 67px", "0 auto"]}
          maxW="500px"
          borderRadius="1rem 1rem 0 0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box>
            <Heading fontSize="1.5rem" textAlign="center">
              WHATS YOUR ADDRESS?
            </Heading>
            <Text
              color="gray.200"
              fontSize="1rem"
              textAlign="center"
              w="75%"
              m="0 auto"
            >
              This is important to define the collection points closest to you
            </Text>
          </Box>
          <Box w="80%">
            <Input
              {...register("city")}
              name="city"
              placeholder="City"
              icon={MdLocationOn}
              error={errors.city}
            />
          </Box>
          <Box w="80%">
            <Input
              {...register("state")}
              name="state"
              placeholder="State"
              icon={MdLocationOn}
              error={errors.state}
            />
          </Box>
          <Box w="80%">
            <Input
              {...register("country")}
              name="country"
              placeholder="Country"
              icon={MdLocationOn}
              error={errors.country}
            />
          </Box>
          <ButtonForms mt="2rem" type="submit" width={["90%"]}>
            Add
          </ButtonForms>
        </Flex>
      </Slide>
    </>
  );
};
