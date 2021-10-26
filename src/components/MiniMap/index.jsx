import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../providers/AuthContext";
import { useLocation } from "../../providers/LocationContext";
import { useMarkers } from "../../providers/MarkersContext";
import mapStyles from "../../pages/Map/mapStyles";
import { ButtonForms } from "../ButtonForms";
import { useHistory } from "react-router";
const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};

export const MiniMap = () => {
  const { markers, loadMarkers } = useMarkers();
  const { accessToken } = useAuth();
  const { location, setLocation } = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.push("/map");
  };

  //Ref
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={location}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
        clickableIcons={false}
      >
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
            // onClick={() => setSelected(marker)}
          />
        ))}
      </GoogleMap>
      <ButtonForms
        position={"absolute"}
        right={0}
        top={"100%"}
        marginLeft={"2px"}
        marginBottom={"2px"}
        marginTop={"5px"}
        width={["100px", "100px", "100px"]}
        type={undefined}
        onClick={handleClick}
        color={"gray.60"}
        backgroundColor={"green.300"}
        h={4}
        fontSize={"12px"}
      >
        Show full map
      </ButtonForms>
    </>
  );
};
