import { currentUser } from "@clerk/nextjs/server";
import Guest from "@/components/Guest";
import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import IncomeAndExpense from "@/components/IncomeAndExpense";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <main>
      <h2>Welcome, {user.firstName}</h2>
      <Balance />
      <IncomeAndExpense />
      <AddTransaction />
    </main>
  );
};

export default HomePage;
