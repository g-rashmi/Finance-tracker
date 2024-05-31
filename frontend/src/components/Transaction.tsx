import React, { useState } from 'react';
import { Container, TextField, Button, Box, MenuItem, Typography } from '@mui/material';

const TransactionForm = ({ onAddTransaction }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({ category, amount, type });
    setCategory('');
    setAmount('');
    setType('');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Add New Transaction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="number"
            placeholder="Enter amount"
          />
          <TextField
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            margin="normal"
            select
            required
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>Add Transaction</Button>
        </form>
      </Box>
    </Container>
  );
};

export default TransactionForm;
