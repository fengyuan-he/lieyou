import prisma from "@/prisma/index";
import to from "@/base64/to";

export default async ({lt, gt, ...topicId}: { lt?: number, gt?: number, in: number[] }) => {
    if (lt !== undefined && gt !== undefined) throw new Error('不能同时有lt和gt')
    const result = await prisma.comment.findMany({
        where: {
            ...lt !== undefined ? {id: {lt}} : gt !== undefined && {id: {gt}},
            topicId,
        },
        orderBy: {
            id: gt !== undefined ? 'asc' : 'desc'
        },
        take: 10,
        select: {
            id: true,
            createdAt: true,
            keyWrapped: true,
            messageData: true,
            messageVector: true
        }
    })
    if (gt !== undefined) result.reverse()
    return result.map(({id, createdAt, keyWrapped, messageData, messageVector}) => ({
        id,
        create: createdAt.valueOf(),
        keyWrapped: to(keyWrapped),
        messageData: to(messageData),
        messageVector: to(messageVector)
    }))
}