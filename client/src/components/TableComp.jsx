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
  VStack,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdPlayArrow, MdPlaylistAdd, MdOutlineSearch } from "react-icons/md";
import { getSongs } from "../../store/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import DropdownMenuComp from "./DropdownMenuComp";

let pageSize = 10;
let defaultOffset = 0;
function CustomTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchArtist, setSearchArtist] = useState("");
  const songsData = useSelector((state) => state.songs.data);
  const countData = useSelector((state) => state.songs.count);

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentPage == 0) setCurrentPage(1);
    if (currentPage == 1) {
      defaultOffset = 0;
    } else {
    }
    dispatch(
      getSongs(currentPage * pageSize, defaultOffset, searchTitle, searchArtist)
    );
  }, [currentPage]);

  const filteredData = [...songsData]; // Create a copy of the original array

  filteredData.sort((a, b) => {
    const titleA = a.judul.toLowerCase();
    const titleB = b.judul.toLowerCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

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
          onClick={() => setCurrentPage(0)}
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
      <div
        style={{
          display: "flex",
          textAlign: "center",
          marginTop: "1rem",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          isDisabled={(currentPage + 1) * 10 >= countData}
          ml="1rem"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default CustomTable;
