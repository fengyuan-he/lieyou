import prisma from "@/prisma";

export default async (data: {
    commentId: number
    commentator: boolean
    messageData: Buffer
    messageVector: Buffer
}) => prisma.reply.create({
    data: {
        ...data,
        ...await prisma.comment.findUniqueOrThrow({
            where: {
                id: data.commentId
            },
            select: {
                topicId: true
            }
        })
    },
    select: {
        id: true
    }
}).then(({id}) => id)