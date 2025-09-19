import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        transactions: {
          where: {
            type: "CREDIT_PURCHASE",
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (loggedInUser) {
      // Sync role into Clerk publicMetadata
      await clerkClient.users.updateUser(user.id, {
        publicMetadata: { role: loggedInUser.role || "UNASSIGNED" },
      });
      return loggedInUser;
    }

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        role: "UNASSIGNED",
        transactions: {
          create: {
            type: "CREDIT_PURCHASE",
            packageId: "free_user",
            amount: 200,
          },
        },
      },
    });

    // Sync role into Clerk publicMetadata
    await clerkClient.users.updateUser(user.id, {
      publicMetadata: { role: newUser.role },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getUserRoleByClerkId = async (clerkUserId) => {
  try {
    const user = await db.user.findUnique({
      where: { clerkUserId },
      select: { role: true },
    });

    return user?.role || null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};
