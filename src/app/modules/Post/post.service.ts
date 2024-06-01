import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";

type TPayload = {
  title: string;
  image: string;
  description: string;
};

const createPost = async (user: JwtPayload | null, payload: TPayload) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
  const reviewsData = {
    userId: isUserExist.id,
    title: payload.title,
    description: payload.description,
    image: payload.image,
  };
  const result = await prisma.post.create({
    data: reviewsData,
  });
  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const postService = {
  createPost,
  getAllPost,
};
