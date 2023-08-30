import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ExpenseList from "./ExpenseList";

const Budget = () => {
  const [budgetAmount, setBudgetAmount] = useState(""),
    storeBudget = localStorage.getItem("budget"),
    initialBudget = storeBudget ? JSON.parse(storeBudget) : "",
    [budgetVal, setBudgetVal] = useState(initialBudget),
    [errortext, setErrorText] = useState(""),
    [isError, setIsError] = useState(false),
    [expense, setExpense] = useState(""),
    [amountVal, setAmountVal] = useState(""),
    storeExpenseItems = localStorage.getItem("expenseItems"),
    initialExpenseItems = storeExpenseItems
      ? JSON.parse(storeExpenseItems)
      : [],
    [expenseItems, setExpenseItems] = useState(initialExpenseItems),
    [expenseError, setExpensErrro] = useState(""),
    [amountError, setAmoutErrro] = useState(""),
    [addExpenseBudget, setAddExpenseBudgett] = useState(0),
    [isEditing, setIsEditing] = useState(false),
    [editingIndex, setEditingIndex] = useState(null),
    expenseValid = /^[A-Za-z\s\-.,!()]+$/;

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const addError = (msg) => {
    setErrorText(msg);
    return setIsError(true);
  };

  const addExpenseError = (msg) => {
    setExpensErrro(msg);
    return setIsError(true);
  };
  const addAmountError = (msg) => {
    setAmoutErrro(msg);
    return setIsError(true);
  };

  const calculateEvent = () => {
    !budgetAmount
      ? (() => {
          addError("*The budget cannot be empty.");
        })()
      : budgetAmount <= 0
      ? (() => {
          addError("*The budget must be greater than zero.");
        })()
      : budgetVal
      ? (() => {
          let updatedBudget = parseInt(budgetVal) + parseInt(budgetAmount);
          setBudgetVal(updatedBudget);
        })()
      : (() => {
          setBudgetVal(budgetAmount);
          setBudgetAmount("");
          return setIsError(false);
        })();
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    expenseItems.forEach((item) => {
      if (!isEditing || (isEditing && item.id !== editingIndex)) {
        totalAmount += parseInt(item.amountVal);
      }
    });
    return totalAmount;
  };

  useEffect(() => {
    const TotalExpenseAmount = calculateTotalAmount();
    setAddExpenseBudgett(TotalExpenseAmount);
  }, [expenseItems, isEditing, editingIndex]);

  const expenseEvent = () => {
    setExpensErrro("");
    !expense.trim()
      ? (() => {
          addExpenseError("*Please add your expense.");
        })()
      : !expenseValid.test(expense)
      ? (() => {
          addExpenseError("*Please enter a valid expense.");
        })()
      : !amountVal.trim()
      ? (() => {
          addAmountError("*Expense amount can not be empty.");
        })()
      : parseInt(amountVal) <= 0
      ? (() => {
          addAmountError("*The expense amount must be greater than zero.");
        })()
      : !budgetVal ||
        addExpenseBudget + parseInt(amountVal) > parseInt(budgetVal)
      ? (() => {
          addAmountError("*You don't have enough budget.");
        })()
      : (() => {
          if (isEditing && editingIndex) {
            const updatedItems = expenseItems.map((item) =>
              item.id === editingIndex ? { ...item, expense, amountVal } : item
            );
            setExpenseItems(updatedItems);
            setIsEditing(false);
            setEditingIndex(null);
          } else {
            setExpenseItems([
              ...expenseItems,
              {
                id: expenseItems.length + 1,
                amountVal,
                expense,
              },
            ]);
          }
          setExpense("");
          setAmountVal("");
          return setIsError(false);
        })();
  };
  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budgetVal));
  }, [budgetVal]);

  useEffect(() => {
    localStorage.setItem("expenseItems", JSON.stringify(expenseItems));
  }, [expenseItems]);

  return (
    <>
      <div className="basis-[41%]">
        <h1 className="common-text">BUDGET APP</h1>
        <form
          action="#FIXME"
          method="post"
          className="border-2 border-[#476B3F] rounded-[4px] py-5 px-[3%] mt-6 mb-16"
          onSubmit={SubmitHandler}
        >
          <div className="flex flex-col relative">
            <label htmlFor="budget" className="font-[600] ">
              Please Enter Your Budget
            </label>
            <input
              type="number"
              name="budget"
              id="budget"
              className="common-input border-[#476B3F]"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
            />
            <span className="text-[#B62F31] font-[600] absolute bottom-[-43%]">
              {isError && errortext.length != 0 ? errortext : null}
            </span>
          </div>
          <div className="mt-3">
            <input
              type="submit"
              value="Calculate"
              className="common-btn border-[#476B3F] text-[#476B3F] lg:hover:bg-[#476B3F]"
              onClick={() => calculateEvent()}
            />
          </div>
        </form>
        <form
          action="#FIXME"
          method="post"
          className="border-2 border-[#B62F31] rounded-[4px] py-5 px-[3%]"
          onSubmit={SubmitHandler}
        >
          <div className="flex flex-col relative">
            <label htmlFor="Expense" className="font-[600] ">
              Please Enter Your Expense
            </label>
            <input
              type="text"
              name="budget"
              id="Expense"
              onChange={(e) => setExpense(e.target.value)}
              value={expense}
              className="common-input border-[#B62F31] mb-5"
            />
            <span className="text-[#B62F31] font-[600] absolute bottom-[-1%]">
              {isError && expenseError.length != 0 ? expenseError : null}
            </span>
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="Amount" className="font-[600] ">
              Please Enter Expense Amount
            </label>
            <input
              type="number"
              name="budget"
              id="Amount"
              value={amountVal}
              onChange={(e) => setAmountVal(e.target.value)}
              className="common-input border-[#B62F31]"
            />
            <span className="text-[#B62F31] font-[600] absolute bottom-[-43%] sm:text-base text-[15px]">
              {isError && amountError.length != 0 ? amountError : null}
            </span>
          </div>
          <div className="mt-3">
            <input
              type="submit"
              value="Add Expense"
              onClick={() => expenseEvent()}
              className="common-btn border-[#B62F31] text-[#B62F31] lg:hover:bg-[#B62F31]"
            />
          </div>
        </form>
      </div>
      <div className="basis-[51%] mt-[43px]">
        <ul className="flex justify-between mb-14">
          <li>
            <h2 className="common-text">Budget</h2>
            <span className="common-text text-[#476B3F] before:content-['\f0d6'] common-before icon">
              ${budgetVal}
            </span>
          </li>
          <li>
            <h2 className="common-text">Expenses</h2>
            <span className="common-text text-[#B62F31] before:content-['\f09d'] common-before icon">
              ${addExpenseBudget}
            </span>
          </li>
          <li>
            <h2 className="common-text">Balance</h2>
            <span className="common-text text-[#476B3F] before:content-['\24'] common-before icon">
              ${budgetVal - addExpenseBudget}
            </span>
          </li>
        </ul>
        <ul className="flex">
          <li className="basis-[35%] sm:basis-[40%] font-[600] mb-4">
            <h3>Expense Title</h3>
          </li>
          <li className="basis-[35%] sm:basis-[40%] font-[600] mb-4">
            <h3>Expense Value </h3>
          </li>
        </ul>
        <ExpenseList
          expenseItems={expenseItems}
          setExpenseItems={setExpenseItems}
          setIsEditing={setIsEditing}
          setEditingIndex={setEditingIndex}
          setExpense={setExpense}
          setAmountVal={setAmountVal}
        />
      </div>
    </>
  );
};

export default Budget;
