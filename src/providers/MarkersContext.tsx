import { useToast, Box, Text } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  Dispatch,
} from "react";
import { api } from "../services/api";
import { Marker, Participants } from "../types/makerData";
import { MyEvent, User } from "../types/userData";
import { createdAnEvent } from "../utils/Badges/badgesLogic";

interface MarkersProviderProps {
  children: ReactNode;
}

interface MarkersContextData {
  markers: Marker[];
  setMarkers: Dispatch<React.SetStateAction<Marker[]>>;
  loadMarkers: (accessToken: string) => Promise<void>;
  updateMyEvents: (
    id: () => string,
    accessToken: string,
    data: MyEvent,
    my_events: MyEvent[],
    user: User
  ) => void;
  updateParticipants: (
    id: () => string,
    accessToken: string,
    data: User,
    participants: Participants[]
  ) => void;
  displayEvents: (accessToken: string) => void;
  allEvents: Marker[];
  updateEvent: (markerId: number, accessToken: string) => void;
  markerUpdated: Marker;
}

const MarkersContext = createContext<MarkersContextData>(
  {} as MarkersContextData
);

const useMarkers = () => {
  const context = useContext(MarkersContext);

  if (!context) {
    throw new Error("useMarkers must be used within an MarkersProvider");
  }
  return context;
};

const MarkersProvider = ({ children }: MarkersProviderProps) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [allEvents, setAllEvents] = useState<Marker[]>([]);
  const [markerUpdated, setMarkerUpdated] = useState<Marker>({} as Marker);
  const toast = useToast()

  const loadMarkers = useCallback(async (accessToken: string) => {
    try {
      const response = await api.get("/markers", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMarkers(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateMyEvents = useCallback(
    (id: () => string, accessToken: string, data, my_events: MyEvent[], user: User) => {
      const newData = [data, ...my_events];

      user.my_events = newData
      api
        .patch(
          `/users/${id}`,
          { my_events: newData },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response: AxiosResponse<User>) => {
          console.log(response)
          createdAnEvent(user)
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
        })
        .catch((err) => console.log(err));
    },
    []
  );

  const updateParticipants = useCallback(
    (
      id: () => string,
      accessToken: string,
      data,
      participants: Participants[]
    ) => {
      const newData = [data, ...participants];
      api
        .patch(
          `/markers/${id}`,
          { participants: newData },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response: AxiosResponse<User>) => console.log(response))
        .catch((err) => console.log(err));
    },
    []
  );

  const displayEvents = useCallback((accessToken: string) => {
    api
      .get(`/markers?type=event`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response: AxiosResponse<Marker[]>) => setAllEvents(response.data))
      .catch((err) => console.log(err));
  }, []);

  const updateEvent = useCallback((markerId, accessToken) => {
    api
      .get(`/markers/${markerId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => setMarkerUpdated(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <MarkersContext.Provider
      value={{
        markers,
        loadMarkers,
        updateMyEvents,
        updateParticipants,
        displayEvents,
        allEvents,
        setMarkers,
        updateEvent,
        markerUpdated,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
};

export { useMarkers, MarkersProvider };
