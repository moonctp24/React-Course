import Todo from './components/Todo'
import NewExpense from './NewExpense/NewExpense';

function App() {
  const addExpenseHandler = expense => {
    console.log('In App.js');
    console.log(expense);
  }
  return (
    <div>
      <h1>My Todos</h1>
      <Todo text='Learn React' />
      <Todo text='Master React'/>
      <NewExpense onAddExpense={addExpenseHandler}/>
    </div>
  );
}

export default App;

// delete newExpense after section 4 