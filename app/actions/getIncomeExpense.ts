"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "User not found",
    };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
    });

    const income = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return {
      income,
      expense: Number(Math.abs(expense).toFixed(2)),
    };
  } catch (error) {
    return {
      error: "Something went wrong. Balance not found.",
    };
  }
}
