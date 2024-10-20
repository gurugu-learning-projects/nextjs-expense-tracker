"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get("text") as string;
  const amountValue = formData.get("amount") as string;

  if (!textValue || !amountValue) {
    return {
      error: "Please enter text and amount",
    };
  }

  const { userId } = auth(); // Get logged in user

  if (!userId) {
    return {
      error: "User not found",
    };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text: textValue,
        amount: Number(amountValue),
        userId,
      },
      include: {
        user: true,
      },
    });

    revalidatePath("/");

    return {
      data: transactionData,
    };
  } catch (error) {
    return {
      error: "Something went wrong. Transaction not added.",
    };
  }
}

export default addTransaction;
