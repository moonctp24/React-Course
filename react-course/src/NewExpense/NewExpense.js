// delete after section 4
import React from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense';

const NewExpense = (props) => {
    const onSaveExpenseDataHandler = (enteredExpenseDate) => {
        const expenseData = {
            ...enteredExpenseDate, // ...(전개연산자) : 좌항에서 명시적으로 할당되지 않은 나머지 배열 값 사용
            id: Math.random().toString()
        };
        props.onAddExpense(expenseData)
    };
    return (<div className="new-expense">
        <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} />
    </div>
    );
};

export default NewExpense;

