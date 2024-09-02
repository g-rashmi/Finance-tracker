import { useState } from 'react';
import { Container, TextField, Button, Box,Grid, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface TransactionFormProps {
  onAddTransaction: (transaction: { category: string; amount: number; type:string  }) => void;
}
const TransactionForm: React.FC<TransactionFormProps>  = ({ onAddTransaction }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
const navigate=useNavigate();
  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    onAddTransaction({ category, amount, type });
    setCategory('');
    setAmount(0);
    setType('');
  
}

  return (
    <div >
      <div>    
        <Container maxWidth="sm">
      <Grid container spacing={4}>
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
          onChange={(e) => setAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
          required
          type="number"
          placeholder="Enter amount"
        />
        <TextField
          label="Type"
          value={type}
          onChange={(e) => setType((e.target.value))}
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
    
  </Grid>
  </Container>
  </div>
<Box  sx={{
          position: 'fixed',
          bottom: 19,
          right: 20,
          zIndex: 1,
          
        }} ><Button variant="contained" type="button" color="success" sx={{ m: 2 ,borderRadius:'100px'}} onClick={()=>{navigate("/chat")}}>AI-CHAT</Button></Box>
  </div>

  );
};

export default TransactionForm;
