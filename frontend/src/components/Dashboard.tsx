import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
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

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };
console.log(transactions);
  // Preparing data for the chart
  const chartData = transactions.map((transaction, index) => ({
    name: `Transaction ${index + 1}`,
    Amount: parseFloat(transaction.amount),
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
                  {transactions.reduce(
                    (acc, trans) =>
                      trans.type === "income"
                        ? acc + parseFloat(trans.amount)
                        : acc - parseFloat(trans.amount),
                    0
                  )}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, backgroundColor: "#f5f5f5", boxShadow: 3 }}>
              <Box>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Recent Transactions
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
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Amount"
                    fill= 'green'/>
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
