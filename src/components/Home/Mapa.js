import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Report from './Report'; // Importa o componente Report

export default function Mapa() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do popup
  const [selectedCoords, setSelectedCoords] = useState({ lat: null, lng: null }); // Coordenadas selecionadas
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Acessa a chave da variável de ambiente

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lng) {
      // Carregar o Google Maps apenas após a localização ser obtida
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`; // Usa a variável de ambiente
      script.async = true;
      document.head.appendChild(script);

      window.initMap = function () {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: location,
          zoom: 14,
        });

        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: "Você está aqui!",
        });

        // Adiciona o listener de clique no marcador
        marker.addListener("click", (event) => {
          // Obtém a latitude e longitude do local clicado
          const clickedCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          setSelectedCoords(clickedCoords); // Armazena as coordenadas clicadas
          setShowPopup(true); // Exibe o popup ao clicar no marcador
        });
      };
    }
  }, [location, apiKey]);

  return (
    <>
      <Box position="fixed" top="0" left="0" right="0" bottom="0">
        <div id="map" style={{ height: "100%", width: "100%" }}></div>
      </Box>

      {/* Exibe o componente Report como um popup se o estado showPopup for true */}
      {showPopup && (
        <Box 
          position="fixed" 
          top="50%" 
          left="50%" 
          transform="translate(-50%, -50%)"
          bg="white" 
          p={4} 
          borderRadius="md" 
          boxShadow="md"
          zIndex={1000} // Garante que o popup fique sobre o mapa
        >
          <Report coords={selectedCoords} /> {/* Passa as coordenadas para o componente Report */}
        </Box>
      )}
    </>
  );
}
