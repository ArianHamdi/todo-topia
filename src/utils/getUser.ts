import prisma from "@/lib/prisma";

export default async function getUser(userId: string | null) {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId?.toString()!,
    },
  });

  return user;
}
