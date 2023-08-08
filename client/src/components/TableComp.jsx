import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdPlayArrow, MdPlaylistAdd, MdOutlineSearch } from "react-icons/md";
import { getSongs } from "../../store/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

let pageSize = 10;
let defaultOffset = 0;
function CustomTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchArtist, setSearchArtist] = useState("");
  const songsData = useSelector((state) => state.songs.data);

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentPage == 1) {
      defaultOffset = 0;
    } else {
      defaultOffset = currentPage * 10;
    }
    dispatch(getSongs(currentPage * pageSize, defaultOffset));
  }, [currentPage]);

  const filteredData = songsData.filter(
    (item) =>
      item.judul.includes(searchTitle) && item.artis.includes(searchArtist)
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <div
      style={{
        maxWidth: "80%",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "5px 0 30px 0px",
        }}
      >
        <Input
          placeholder="Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          marginRight={2}
        />
        <Input
          placeholder="Artist"
          value={searchArtist}
          onChange={(e) => setSearchArtist(e.target.value)}
          marginLeft={2}
        />
        <Button
          colorScheme="teal"
          variant="outline"
          width={"10rem"}
          marginLeft={"1rem"}
        >
          <Icon as={MdOutlineSearch} w={6} h={6} />
        </Button>
      </div>
      <div style={{ overflowX: "auto", maxHeight: "20rem" }}>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Artist</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
        </Table>
      </div>
      <div
        style={{
          height: "25rem",
          overflow: "auto",
          borderTop: "1px solid #ccc",
        }}
      >
        <Table>
          <Tbody>
            {displayedData.map((item, index) => (
              <Tr key={index + 1}>
                <Td>{item.judul}</Td>
                <Td>{item.artis}</Td>
                <Td>
                  <HStack style={{ gap: "2rem" }}>
                    <Button colorScheme="teal" variant="outline">
                      <Icon as={MdPlayArrow} w={6} h={6} />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          //   isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          //   isDisabled={endIndex >= filteredData.length}
          ml="1rem"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default CustomTable;
