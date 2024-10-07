import prisma from "@/prisma/index";
import {name, description} from "@/../public/manifest.json";

export default async ({lt, gt}: { lt?: number, gt?: number }) => {
    if (lt !== undefined && gt !== undefined) throw new Error('不能同时有lt和gt')
    const Topic = await prisma.topic.findMany({
        ...lt !== undefined ? {where: {id: {lt}}} : gt !== undefined && {where: {id: {gt}}},
        orderBy: {
            id: gt !== undefined ? 'asc' : 'desc'
        },
        take: 10,
        select: {
            id: true,
            createdAt: true,
            message: true
        }
    })
    if (gt !== undefined) Topic.reverse()
    return {
        announcement: `欢迎来到${name}（[永久网址](https://lieyou.netlify.app)|[开源仓库](https://github.com/fengyuan-he/lieyou)），${description}

内容支持[MDX](https://www.mdxjs.cn)格式，可以用\`<RefTopic>\`标签引用文游、用\`<RefComment>\`标签引用角色（children填id）`,
        list: Topic.map(({id, createdAt, message}) => ({
            id,
            create: createdAt.valueOf(),
            message
        }))
    }
}