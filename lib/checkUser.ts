import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
  const user = await currentUser();

  //** Check for currently logged in Clerk user
  if (!user) {
    return null;
  }

  //** Check if user is in database */
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  //** If user is in database, return user */
  if (loggedInUser) {
    return loggedInUser;
  }

  //** If user is not in database, create user */
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
