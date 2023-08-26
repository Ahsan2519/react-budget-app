import React from "react";

const Budget = () => {
  const SubmitHandler = (e)=>{
    e.preventDefault()
  }
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
          <div className="flex flex-col">
            <label htmlFor="budget" className="font-[600] ">
              Please Enter Your Budget
            </label>
            <input
              type="number"
              name="budget"
              id="budget"
              className="common-input border-[#476B3F]"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Calculate"
              className="common-btn border-[#476B3F] text-[#476B3F] lg:hover:bg-[#476B3F]"
            />
          </div>
        </form>
        <form
          action="#FIXME"
          method="post"
          className="border-2 border-[#B62F31] rounded-[4px] py-5 px-[3%]"
          onSubmit={SubmitHandler}
        >
          <div className="flex flex-col">
            <label htmlFor="Expense" className="font-[600] ">
              Please Enter Your Expense
            </label>
            <input
              type="text"
              name="budget"
              id="Expense"
              className="common-input border-[#B62F31] mb-5"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Amount" className="font-[600] ">
              Please Enter Expense Amount
            </label>
            <input
              type="number"
              name="budget"
              id="Amount"
              className="common-input border-[#B62F31]"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Add Expense"
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
              $3000
            </span>
          </li>
          <li>
            <h2 className="common-text">Expenses</h2>
            <span className="common-text text-[#B62F31] before:content-['\f09d'] common-before icon">
              $3000
            </span>
          </li>
          <li>
            <h2 className="common-text">Balance</h2>
            <span className="common-text text-[#476B3F] before:content-['\24'] common-before icon">
              $3000
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
