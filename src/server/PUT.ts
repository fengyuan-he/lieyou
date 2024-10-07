import tSchema from "@/server/tSchema";
import rootsSchema from "@/server/rootsSchema";
import put from "@/prisma/put";
import server from "@/server/index";

export default server(async request => {
    const {nextUrl: {searchParams}} = request
    return put({
        lt: tSchema.parse(searchParams.get('lt') ?? undefined),
        gt: tSchema.parse(searchParams.get('gt') ?? undefined),
        in: rootsSchema.parse(await request.json())
    })
})