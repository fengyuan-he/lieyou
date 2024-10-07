import {Button} from "@/components/ui/button";
import {Home, MessagesSquare} from "lucide-react";
import {useRouter} from "next/navigation";
import {ReactNode} from "react";
import manifest from "@/../public/manifest.json";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

export default function Frame({title, header, actions, children}: {
    title?: string
    header: string
    actions: ReactNode
    children: ReactNode
}) {
    const {push} = useRouter()
    return (
        <div className="container py-6 space-y-4">
            <title>{title ? title + '|' + manifest.name : manifest.name}</title>
            <div className="flex items-center justify-between">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">{header}</h1>
                {actions}
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => push('/')}
                    >
                        <Home className="w-4 h-4"/>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                            >
                                <MessagesSquare className="w-4 h-4"/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <div>
                                <AlertDialogHeader className="max-h-[calc(100dvh-180px)] overflow-auto w-1/3 float-left">
                                    <AlertDialogTitle>报名</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        lala
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogHeader className="max-h-[calc(100dvh-180px)] overflow-auto w-1/3 float-left">
                                    <AlertDialogTitle>操作</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        lala
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogHeader className="max-h-[calc(100dvh-180px)] overflow-auto w-1/3 float-left">
                                    <AlertDialogTitle>推演</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        lala
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>关闭</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            {children}
        </div>
    )
}