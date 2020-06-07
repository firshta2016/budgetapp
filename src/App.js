import * as React from 'react';
import './App.css';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseForm } from './components/ExpenseForm';
import { Alert } from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

// const initialExpense = [
//   {id: uuidv4(), charge:"rent", amount:1600},
//   {id: uuidv4(), charge:"car", amount:200},
//   {id: uuidv4(), charge:"internet", amount:900},
// ];

const initialExpense = localStorage.getItem("expense") ? JSON.parse(localStorage.getItem("expenses")) : [];

function App() {
const [ expenses, setExpenses ] = React.useState(initialExpense);
const [ charge, setCharge ] = React.useState('');
const [ amount, setAmount ] = React.useState('');
const [ alert, setAlert ] = React.useState({show:false});
const [ edit, setEdit ] = React.useState(false);
const [ id, setId ] = React.useState(0);

React.useEffect(()=> {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses])
const handleCharge = e => {
  setCharge(e.target.value)
}

const handleAmount = e => {
  setAmount(e.target.value)
}

const handleAlert = ({type, text}) => {
  setAlert({show:true, type, text})
  setTimeout(()=>{
    setAlert({ show: false })
  }, 5000)
}
const handleSubmit = e => {
  e.preventDefault();
  if (charge !== '' && amount > 0) {
    if(edit) {
      const tempExpenses = expenses.map(item => {
        return item.id === id ? {...item, charge, amount} : item;
      });
      setExpenses(tempExpenses);
      setEdit(false);
    } else {
      const singleExpense = {id: uuidv4(), charge, amount}
    setExpenses([...expenses, singleExpense]);
    //[...] spread operator allows you to keep the current item in the state, then pass the new state.
    handleAlert({type:'success', text: 'item added'})
    }
    setCharge('');
    setAmount('');
  } else {
    handleAlert({type: 'danger', text: 'please make sure all inputs are met'})
  }
}

const clearItems = () => {
  setExpenses([]);
  handleAlert({type: "danger", text: "all items deleted"});
}

const handleDelete = id => {
  let tempExpenses = expenses.filter(item => item.id !== id);
  setExpenses(tempExpenses);
  handleAlert({type: "danger", text: "item deleted"});
};

const handleEdit = id => {
  let expense = expenses.find(item => item.id === id);
  let {charge, amount} = expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
}
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm 
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList 
        expenses={expenses}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        clearItems={clearItems}
       />
        </main> 
        {/* add the total */}
        <h1>total spending: 
        <span className="total">
        $ {expenses.reduce((acc, curr) => {
          return ( acc += parseInt(curr.amount))
        },0)}
          </span> 
          </h1>         
    </>
  );
}

export default App;
