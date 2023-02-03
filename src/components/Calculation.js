import * as React from 'react';
import { useState , useEffect} from 'react';
import {Box, TextField, Container, Paper, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, alignItems} from '@mui/material';

export default function Calculation() {
    const paperStyle={padding: '50px 20px', width:600,margin:"20px auto"}
    const[userName,setUserName] = useState('')
    const[totalLoan,setTotalLoan] = useState('')
    const[annualInterest,setAnnualInterest] = useState('')
    const[annualLoanTime,setAnnualLoanTime] = useState('')

    const[calculation,setCalculation] = useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const calculation={userName,totalLoan,annualInterest,annualLoanTime}
        console.log(calculation)
        fetch(`http://localhost:8080/calculation/add?userName=${userName}&totalLoan=${totalLoan}&annualInterest=${annualInterest}&annualLoanTime=${annualLoanTime}`,{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(calculation)
    }).then(() =>{
        console.log("New Calculation Done")
        window.location.reload(false)
    })
    }

    useEffect(() => {
        fetch("http://localhost:8080/calculation/calculations")
        .then(res=>res.json())
        .then((result) => {
            setCalculation(result)
        })
    },[])


  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1><u>Mortage Calculator</u></h1>
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexWrap: 'wrap' }}
    > <div>
        <TextField id="outlined-basic" label="Enter Name" variant="outlined" fullWidth sx={{m:1}} 
        value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Enter Loan Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            label="Euro"
            value={totalLoan} onChange={(e) => setTotalLoan(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Enter Annual Interest</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            label="Amount"
            value={annualInterest} onChange={(e) => setAnnualInterest(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Enter Loan Time</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">Years</InputAdornment>}
            label="Amount"
            value={annualLoanTime} onChange={(e) => setAnnualLoanTime(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" size='large' onClick={handleClick}>Submit</Button>
      </div>
    </Box>
    </Paper>
    <h1><i>Calculation History</i></h1>
    <Paper elevation={3} style={paperStyle}>
        {calculation.map(calculation=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"center"}} key={calculation.id}>
                Prospect {calculation.id}: {calculation.userName} wants to borrow {calculation.totalLoan} for a period of {calculation.annualLoanTime} years <br/> and pay {calculation.monthlyPayment.toFixed(2)} € each month
            </Paper>
        ))}
    </Paper>
    </Container>
  );
}

