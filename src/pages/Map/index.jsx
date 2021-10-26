import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
//mapstyles
import mapStyles from "./mapStyles";
import { useState, useCallback, useRef } from "react";
import { useMarkers } from "../../providers/MarkersContext";
import { useAuth } from "../../providers/AuthContext";
import { useEffect } from "react";
import { DrawerForms } from "../../components/Modals/DrawerForms";
import { DashboardMenu } from "../../components/DashboardMenu";
import { Box, IconButton, Icon, Text } from "@chakra-ui/react";
import { EventDetails } from "../../components/Modals/EventDetails";
import { BiHome } from "react-icons/bi";
import { BottomMenu } from "../../components/BottomMenu";
import { useLocation } from "../../providers/LocationContext";
import { ButtonForms } from "../../components/ButtonForms";
import { useEventDetails } from "../../providers/EventDetailsContext";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: 3,
  },
};

export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = useState(null);
  const [inputMarker, setInputMarker] = useState([]);
  const { markers, loadMarkers } = useMarkers();
  const { accessToken } = useAuth();
  const { location, setLocation } = useLocation();
  const { onOpen } = useEventDetails();

  //onClick
  const onMapClick = useCallback((event) => {
    setInputMarker((_) => [
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        created_at: new Date(),
      },
    ]);
  }, []);

  //Ref
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  //Pan to
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  useEffect(() => {
    loadMarkers(accessToken);
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  if (loadError) return <div>Error loading maps"</div>;
  if (!isLoaded) return <div>"Loading maps"</div>;

  return (
    <Box position="relative">
      <DrawerForms
        isDisable={inputMarker.length === 0}
        inputMarker={inputMarker}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={location}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        clickableIcons={false}
      >
        <BottomMenu />
        <DashboardMenu />
        <Locate panTo={panTo} />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: marker.type === "event" ? "/event.png" : "/wastecol.png",
              scaledSize: new window.google.maps.Size(30, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 20),
            }}
            onClick={() => setSelected(marker)}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <Box>
              <Text color="green.400" fontSize="1rem" fontWeight="bold">
                {selected.title}
              </Text>
              <Text>
                {selected.type === "waste collection" ? "Working" : null}Time:{" "}
                {selected.start_time} - {selected.end_time}
              </Text>
              <Text>Contact: {selected.contact}</Text>
              {selected.description ? (
                <h3>
                  {selected.description.length <= 30
                    ? selected.description
                    : selected.description.slice(0, 30) + "..."}
                </h3>
              ) : (
                <></>
              )}
              {selected.materials_type ? (
                <Text>Collecting: {selected.materials_type.join(", ")}</Text>
              ) : (
                <></>
              )}
              {selected.type === "event" ? (
                <>
                  <EventDetails marker={selected} />
                  <ButtonForms
                    marginLeft={"2px"}
                    marginBottom={"2px"}
                    marginTop={"5px"}
                    width={["100px", "100px", "100px"]}
                    type={undefined}
                    onClick={onOpen}
                    color={"gray.60"}
                    backgroundColor={"green.300"}
                    h={4}
                    fontSize={"12px"}
                  >
                    Show details
                  </ButtonForms>
                </>
              ) : null}
            </Box>
          </InfoWindow>
        ) : null}

        {inputMarker.map((marker) => (
          <Marker
            key={marker.created_at}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/input.png",
              scaledSize: new window.google.maps.Size(30, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 20),
            }}
          />
        ))}
      </GoogleMap>
    </Box>
  );

  function Locate({ panTo }) {
    return (
      <IconButton
        aria-label="Show modals"
        colorScheme="white"
        color="green.300"
        borderRadius="100%"
        position="absolute"
        bottom="18%"
        right="5%"
        bg="white"
        zIndex="7"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <Icon as={BiHome} fontSize="2xl" />
      </IconButton>
    );
  }
};
