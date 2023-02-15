import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

interface Currency {
  base: string;
  date: string;
  rates: {
    cad: string;
    chf: string;
    eur: string;
    gbp: string;
    idr: string;
    jpy: string;
  };
}


interface Props {}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f06f37",
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "whitesmoke",
    height: "100vh",
    padding: "48px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  tableContainer: {
    maxWidth: "800px",
  },
}));

const CurrencyPage: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [data, setData] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const apiKey = "0bab8c39f06e4bfbac6b5da61d3e417b";
    const symbols = "CAD,IDR,JPY,CHF,EUR,GBP";
    fetch(
      `https://api.currencyfreaks.com/latest?apikey=${apiKey}&symbols=${symbols}`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  // const data ={
//   base: "USD",
//   date: "2023-02-15 00:00:00+00",
//   rates: {
//     CAD: "1.334140998289538",
//     CHF: "0.9215963333041568",
//     EUR: "0.9315135335872883",
//     GBP: "0.8214896644492455",
//     IDR: "15179.261954219648",
//     JPY: "132.98899996491014",
//   }
// }

//   const ratesArray = Object.keys(data?.rates).map(key => {
//     return {
//       currency: key,
//       rate: data.rates[key]
//     };
//   });
  return (
    <>
      <Box className={classes.root}>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Currency</StyledTableCell>
                <StyledTableCell align="left">We Buy</StyledTableCell>
                <StyledTableCell align="left">Exchange Rate</StyledTableCell>
                <StyledTableCell align="left">We Sell</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  name
                </StyledTableCell>
                <StyledTableCell align="left">Dummy</StyledTableCell>
                <StyledTableCell align="left">Dummy</StyledTableCell>
                <StyledTableCell align="left">Dummy</StyledTableCell>
              </StyledTableRow> */}
              {/* {data?.map((currency) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                     {currency.rates}
                  </StyledTableCell>
                  <StyledTableCell align="left">Dummy</StyledTableCell>
                  <StyledTableCell align="left">Dummy</StyledTableCell>
                  <StyledTableCell align="left">Dummy</StyledTableCell>
                </StyledTableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default CurrencyPage;
