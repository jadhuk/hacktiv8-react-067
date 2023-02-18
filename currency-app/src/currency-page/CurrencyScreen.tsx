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
  const [data, setData] = useState<Currency>();
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
        if (result?.rates) {
          for (let key in result.rates) {
            result.rates[key.toLowerCase()] =
              result.rates[key as keyof typeof result.rates];
            delete result.rates[key];
          }
          //   const ratesAsNumber: { [key: string]: number } = {};
          //   for (const [key, value] of Object.entries(result.rates)) {
          //     result.rates[parseInt(value as string)] =
          //       ratesAsNumber[key as keyof typeof ratesAsNumber];
          //   }
        }
        //
        setData(result);
      });
  }, []);

  return (
    <>
      {!!loading && (
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
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    CAD
                  </StyledTableCell>
                  <StyledTableCell align="left">teas</StyledTableCell>
                  <StyledTableCell align="left">
                    {data?.rates.cad}
                  </StyledTableCell>
                  <StyledTableCell align="left">CHF</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    IDR
                  </StyledTableCell>
                  <StyledTableCell align="left">teas</StyledTableCell>
                  <StyledTableCell align="left">
                    {data?.rates.idr}
                  </StyledTableCell>
                  <StyledTableCell align="left">CHF</StyledTableCell>
                </StyledTableRow>{" "}
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    JPY
                  </StyledTableCell>
                  <StyledTableCell align="left">teas</StyledTableCell>
                  <StyledTableCell align="left">
                    {data?.rates.jpy}
                  </StyledTableCell>
                  <StyledTableCell align="left">CHF</StyledTableCell>
                </StyledTableRow>{" "}
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    CHF
                  </StyledTableCell>
                  <StyledTableCell align="left">teas</StyledTableCell>
                  <StyledTableCell align="left">
                    {data?.rates.chf}
                  </StyledTableCell>
                  <StyledTableCell align="left">CHF</StyledTableCell>
                </StyledTableRow>{" "}
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    EUR
                  </StyledTableCell>
                  <StyledTableCell align="left">teas</StyledTableCell>
                  <StyledTableCell align="left">
                    {data?.rates.eur}
                  </StyledTableCell>
                  <StyledTableCell align="left">CHF</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    GBP
                  </StyledTableCell>
                  <StyledTableCell align="left">teas</StyledTableCell>
                  <StyledTableCell align="left">{data?.rates.gbp}</StyledTableCell>
                  <StyledTableCell align="left">CHF</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default CurrencyPage;
