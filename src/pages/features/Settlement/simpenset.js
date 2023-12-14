import Head from 'next/head'
import { Container, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Button, Link } from "@chakra-ui/react";
import { useEffect, useState, Fragment } from 'react';
import { axiosInstance } from "@/lib/axios"

/*
formik -> handle form
yup -> validate
tanstack-query -> manage api calls (cahcing, state, dll);
*/

export default function Home() {

  const ITEMS_PER_PAGE = 5;

  const [transaksis, setTransaksis] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

const fetchTransaksi = async () =>{
  try {
    const transaksiResponse = await axiosInstance.get("/unsettle");
    setTransaksis(transaksiResponse.data);
  } catch (error) {
    console.log(error);
  }
};

const handleTabClick = (id) => {
  setSelectedTab(id);
};

useEffect(() => {
  fetchTransaksi();
}, []);

// const handlePrevPage = () => {
//   if (currentPage > 1) {
//     setCurrentPage(currentPage - 1);
//   }
// };

// const handleNextPage = () => {
//   const totalPages = Math.ceil(transaksis.length / ITEMS_PER_PAGE);
//   if (currentPage < totalPages) {
//     setCurrentPage(currentPage + 1);
//   }
// };

// const renderTabs = () => {
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const visibleTransaksis = transaksis.slice(startIndex, endIndex);

//   return visibleTransaksis.map((transaksi) => (
//     <Tab key={transaksi.id} onClick={() => handleTabClick(transaksi.id)}>
//       {transaksi.id}
//     </Tab>
//   ));
// };

const renderTransaksiDetails = () => {
  if (!selectedTab) {
    return null; // No tab selected, do not render details
  }

  const selectedTransaksi = transaksis.find((transaksi) => transaksi.id === selectedTab);

  if (!selectedTransaksi) {
    return <div>No data for selected tab</div>;
  }

  return (
    <TabPanels key={selectedTransaksi.id}>
      <div>{selectedTransaksi.kartu}</div>
      <div>{selectedTransaksi.traceNumber}</div>
      <div>{selectedTransaksi.date}</div>
      <div>{selectedTransaksi.refNumber}</div>
      <div>{selectedTransaksi.totalHarga}</div>
    </TabPanels>
  );
};


  return (
    <>
          {/* <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </Button>
            <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(transaksis.length / ITEMS_PER_PAGE)}>
              Next
            </Button> */}
          <Tabs>
          {/* <TabList>{renderTabs()}</TabList> */}
            <TabList>{renderTransaksiDetails()}</TabList>
          </Tabs>
          <Button>
      <Link href="/dashboard">Back</Link>
    </Button>
    </>
  )
}
