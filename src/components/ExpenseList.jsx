import React from "react";

const ExpenseList = ({
  expenseItems,
  setExpenseItems,
  setIsEditing,
  setEditingIndex,
  setExpense,
  setAmountVal,
}) => {
  const editHandler = (id) => {
    const editVal = expenseItems.find((val) => val.id === id);
    setExpense(editVal.expense);
    setAmountVal(editVal.amountVal);
    setIsEditing(true);
    setEditingIndex(id);
  };

  const clearExpens = (id) => {
    const updatedItems = expenseItems.filter((value) => value.id !== id);
    setExpenseItems(updatedItems);
  };

  return (
    <ul>
      {expenseItems.map((value) => {
        return (
          <li key={value.id} className="flex mb-2">
            <span className="basis-[45%] text-[#B62F31] font-[700] flex">
              {value.expense}
            </span>
            <span className="basis-[45%] text-[#B62F31] font-[700] flex">
              {value.amountVal}
            </span>
            <button
              className="icon before:content-['\f044'] common-icon text-[#476B3F]"
              onClick={() => editHandler(value.id)}
            >
              Edit
            </button>
            <button
              className="icon before:content-['\f1f8'] common-icon text-[#B62F31]"
              onClick={() => clearExpens(value.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ExpenseList;
