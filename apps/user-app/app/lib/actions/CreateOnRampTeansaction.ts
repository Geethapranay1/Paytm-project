"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"


export async function CreateOnRampTransaction(amount: number, provider: string, ) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString() // from bank we should get it like const token = await axios.get("https://netbanking.hdfc.com", {amount})
    const userId = session.user.id;
    if(!userId) {
        return {
            msg: "User not loggid in"
        }
    }
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })

    return {
        msg: "On ramp transaction added"
    }
}