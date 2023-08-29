import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Budget = () => {
  const [budgetAmount, setBudgetAmount] = useState(""),
    storeBudget = localStorage.getItem("budget"),
    initialBudget = storeBudget ? JSON.parse(storeBudget) : [],
    [budgetVal, setBudgetVal] = useState(initialBudget),
    [errortext, setErrorText] = useState(""),
    [isError, setIsError] = useState(false),
    [expense, setExpense] = useState(""),
    [amountVal, setAmountVal] = useState(""),
    storeExpense = localStorage.getItem("expense"),
    initialExpense = storeExpense ? JSON.parse(storeExpense) : [],
    [expenseItems, setExpenseItems] = useState(initialExpense),
    storeExpenseAmount = localStorage.getItem("expenseAmount"),
    initialAmount = storeExpenseAmount ? JSON.parse(storeExpenseAmount) : [],
    [amountList, setAmountList] = useState(initialAmount),
    [expenseError, setExpensErrro] = useState(""),
    [amountError, setAmoutErrro] = useState(""),
    [addExpenseBudget, setAddExpenseBudgett] = useState(0),
    expenseValid = /^[A-Za-z\s\-.,!()]+$/;

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const calculateEvent = () => {
    !budgetAmount
      ? (() => {
          setErrorText("*The budget cannot be empty.");
          return setIsError(true);
        })()
      : budgetAmount <= 0
      ? (() => {
          setErrorText("*The budget must be greater than zero.");
          return setIsError(true);
        })()
      : (() => {
          setBudgetVal([budgetAmount]);
          setBudgetAmount("");
          return setIsError(false);
        })();
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    amountList.forEach((item) => {
      totalAmount += parseInt(item.amountVal);
    });
    return totalAmount;
  };

  useEffect(() => {
    const TotalExpenseAmount = calculateTotalAmount();
    setAddExpenseBudgett(TotalExpenseAmount);
  }, [amountList]);

  const expenseEvent = () => {
    setExpensErrro("");
    !expense.trim()
      ? (() => {
          setExpensErrro("*Please add your expense.");
          return setIsError(true);
        })()
      : !expenseValid.test(expense)
      ? (() => {
          setExpensErrro("*Please enter a valid expense.");
          return setIsError(true);
        })()
      : !amountVal.trim()
      ? (() => {
          setAmoutErrro("*Expense amount can not be empty.");
          return setIsError(true);
        })()
      : parseInt(amountVal) <= 0
      ? (() => {
          setAmoutErrro("*The expense amount must be greater than zero.");
          return setIsError(true);
        })()
      : budgetVal.length === 0 ||
        addExpenseBudget + parseInt(amountVal) > parseInt(budgetVal[0])
      ? (() => {
          setAmoutErrro("*You don't have enough budget.");
          return setIsError(true);
        })()
      : (() => {
          setExpenseItems([
            ...expenseItems,
            { id: expenseItems.length + 1, expense: expense },
          ]);
          setAmountList([
            ...amountList,
            { id: amountList.length + 1, amountVal: amountVal },
          ]);
          setExpense("");
          setAmountVal("");
          return setIsError(false);
        })();
  };

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budgetVal));
  }, [budgetVal]);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenseItems));
  }, [expenseItems]);

  useEffect(() => {
    localStorage.setItem("expenseAmount", JSON.stringify(amountList));
  }, [amountList]);

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
            <span className="text-[#B62F31] font-[600] absolute bottom-[-43%]">
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
          <li className="basis-[40%] font-[600] mb-4">
            <h3>Expense Title</h3>
          </li>
          <li className="basis-[40%] font-[600] mb-4">
            <h3>Expense Value </h3>
          </li>
        </ul>
        <ul className="flex justify-between">
          <li className="basis-[40%]">
            <span className="text-[#B62F31] font-[700]">Coffee</span>
          </li>
          <li className="basis-[40%]">
            <span className="text-[#B62F31] font-[700]">$200</span>
          </li>
          <li className="basis-[5%] icon indent-[-9999px] before:indent-[0] before:content-['\f044'] cursor-pointer">
            <button>Edit</button>
          </li>
          <li className="basis-[5%] icon indent-[-9999px] before:indent-0 before:content-['\f1f8'] cursor-pointer">
            <button>Delete</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Budget;
