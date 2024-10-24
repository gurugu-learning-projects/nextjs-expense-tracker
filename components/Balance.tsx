import { toast } from "react-toastify";

import getUserBalance from "@/app/actions/getUserBalance";
import { addCommasToNumber } from "@/lib/utils";

const Balance = async () => {
  const { balance, error } = await getUserBalance();

  if (error) {
    toast.error(error);
    return null;
  }

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${balance ? addCommasToNumber(balance) : 0}</h1>
    </>
  );
};

export default Balance;
