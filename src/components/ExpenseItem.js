import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';
export const ExpenseItem = ({expense, handleEdit, handleDelete}) => {
    const {id, charge, amount} = expense;
    // grabs the 'item' created on map from expense list loops through each data point that is destructed on 'item' 
    // renders. renders edit/cancal links
    return (
        <li className="item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">${amount}</span>
            </div>
            <div >
                <button className="edit-btn" aria-label="edit button" onClick={() => handleEdit(id)}><MdEdit /></button></div>
                <button className="clear-btn" aria-label="delete button" onClick={() => handleDelete(id)}><MdDelete /></button>
        </li>
        
    )
}
