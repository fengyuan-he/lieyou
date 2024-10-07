import prisma from "@/prisma";

export default async (data: {
    commentId: number
    commentator: boolean
    messageData: Buffer
    messageVector: Buffer
}) => prisma.reply.create({data, select: {id: true}}).then(({id}) => id)