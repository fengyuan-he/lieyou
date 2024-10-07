import prisma from "@/prisma/index";

export default async (data: {
    keyVerify: Buffer
    keyWrap: Buffer
    message: string
}) => prisma.topic.create({
    data,
    select: {
        id: true
    }
}).then(({id}) => id)