import prisma from "@/prisma/index";
import to from "@/base64/to";

export default async ({lt, gt, ...topicId}: { lt?: number, gt?: number, in: number[] }) => {
    if (lt !== undefined && gt !== undefined) throw new Error('不能同时有lt和gt')
    const result = (await prisma.reply.findMany({
        where: {
            ...lt !== undefined ? {id: {lt}} : gt !== undefined && {id: {gt}},
            topicId,
            commentator: true
        },
        orderBy: {
            id: gt !== undefined ? 'asc' : 'desc'
        },
        take: 10,
        select: {
            id: true,
            createdAt: true,
            messageData: true,
            messageVector: true
        }
    }))
    if (gt !== undefined) result.reverse()
    return result.map(({id, createdAt, messageData, messageVector}) => ({
        id,
        create: createdAt.valueOf(),
        messageData: to(messageData),
        messageVector: to(messageVector)
    }))
}