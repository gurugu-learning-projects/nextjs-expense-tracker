import { toast } from "react-toastify";

import { getIncomeExpense } from "@/app/actions/getIncomeExpense";
import { addCommasToNumber } from "@/lib/utils";

const IncomeAndExpense = async () => {
  const { income, expense, error } = await getIncomeExpense();

  if (error) {
    toast.error(error);
    return null;
  }

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${income ? addCommasToNumber(income) : 0}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">
          ${expense ? addCommasToNumber(expense) : 0}
        </p>
      </div>
    </div>
  );
};

export default IncomeAndExpense;
