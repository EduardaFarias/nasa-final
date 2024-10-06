import { Box } from "@chakra-ui/react";
import MenuTop from "./MenuTop";
import Mapa from "./Mapa";

export default function HomePage() {
  return (
    <>
      <Box bg="rgb(217,217,217)" minHeight="100vh" width="100%" position="relative">
        {/* MenuTop com posição fixa */}
        <Box position="fixed" top="0" left="0" right="0" zIndex="1000">
          <MenuTop />
        </Box>

        {/* Mapa ocupando o espaço restante da tela abaixo do MenuTop */}
        <Box
          position="absolute"
          top="80px" // Ajuste conforme a altura do MenuTop
          left="0"
          right="0"
          bottom="0"
          zIndex="1"
        >
          <Mapa />
        </Box>
      </Box>
    </>
  );
}
