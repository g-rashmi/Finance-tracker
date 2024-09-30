import { useState ,useEffect} from "react";
import { CSVLink } from 'react-csv';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TransactionForm from "./Transaction.tsx";
import Header from "./Header.tsx";
interface Transaction {
  category: string;
  amount: number;
  type: string;
}


const Dashboard = () => {
  const [csvData, setCsvData] = useState<string[][]>([])
  const [total,settotal] =useState(0);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const generate=async ()=>{
    try{
      const csvrows=[['Category','Income/Expense','Amount']]; 
      for(const i of transactions){
        csvrows.push([i.category,i.type,i.amount.toString()]);
      }
      setCsvData(csvrows);    
    }
    catch(error){
      console.error('Error fetching company details:', error); 
    }
    }
    useEffect(() => {
      generate();
    }, [transactions]);
  
  const handleAddTransaction = (transaction: Transaction) => {
    if(transaction.amount>total&&transaction.type==='expense'){
      alert("u didn't have enough money") ;
      return ;
    }
    setTransactions([...transactions, transaction]);
  }
  useEffect(() => {
    const newTotal = transactions.reduce(
      (acc, trans) =>
        trans.type === "income" ? acc + trans.amount : acc - trans.amount,
      0
    );
    settotal(newTotal);
  }, [transactions]);
  const chartData = transactions.map((transaction, index) => ({
    name: `Transaction ${index + 1}`,
    Income: transaction.type === "income" ? transaction.amount : 0,
    Expense: transaction.type === "expense" ? transaction.amount : 0,
    Type: transaction.type,
  }));
  console.log(chartData);
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, backgroundColor: "#f5f5f5", boxShadow: 3 }}>
              <Box>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Account Balance
                </Typography>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  ₹
                  {(transactions.reduce(
                    (acc, trans) =>
                      trans.type === "income"
                        ? acc + trans.amount
                        : acc - trans.amount,
                    0
                  ))} 

                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, backgroundColor: "#f5f5f5", boxShadow: 3 }}>
              <Box>
                <Typography variant="h6"  color="textSecondary" gutterBottom>
                  Recent Transactions
                  <Button
        variant="contained"
        color="primary" style={{marginLeft:"10px"}}
        disabled={csvData.length===1}
        
        onClick={generate}
    
      >
        <CSVLink
          data={csvData}
          filename={"companies.csv"}
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
      Export as CSV
        </CSVLink>
      </Button>
                </Typography>
               
                <List>
                  {transactions.map((transaction, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={transaction.category}
                        secondary={`${transaction.type}- ₹${transaction.amount}`}
                        primaryTypographyProps={{
                          variant: "subtitle1",
                          fontWeight: "bold",
                        }}
                        secondaryTypographyProps={{
                          variant: "body2",
                          color: "textSecondary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, backgroundColor: "#f5f5f5", boxShadow: 3 }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Transaction Chart
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} barCategoryGap="3%">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Income" fill="green" barSize={30} />
                  <Bar dataKey="Expense" fill="red" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        <Paper sx={{ mt: 4, p: 3, backgroundColor: "#e3f2fd", boxShadow: 3 }}>
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;
