import { Box, Image, Stack, InputGroup, InputLeftElement, Input, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; // Ícone específico

export default function MenuTop() {
  return (
    <Box bg="rgb(0,128,199)" height="80px" display="flex" alignItems="center" px={4}>
      {/* Logo alinhada à esquerda */}
      <Box flex="1">
        <Image
        borderRadius="50px"
          src="/assets/logo.webp" 
          alt="Logo"
          height="60px" // Ajuste o tamanho da imagem conforme necessário
        />
      </Box>
      
      {/* Barra de pesquisa centralizada */}
      <Flex justifyContent="center" flex="2">
        <Stack spacing={4} width="100%" maxWidth="500px">
          <InputGroup bg="white" borderRadius={"20px"}>
            <InputLeftElement pointerEvents="none">
              <FontAwesomeIcon icon={faMagnifyingGlass} height="20px" />
            </InputLeftElement>
            <Input type="text" placeholder="Search" />
          </InputGroup>
        </Stack>
      </Flex>

      {/* Espaço adicional para manter a barra de pesquisa centralizada */}
      <Box flex="1" />
    </Box>
  );
}
