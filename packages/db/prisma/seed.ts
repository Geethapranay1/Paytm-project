import { PrismaClient } from "@prisma/client"

import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: {
            number: "122121312"
        },
        update: {},
        create: {
            number: "122121312",
            password: await bcrypt.hash("alice", 10),
            name: "alice",
            balance: {
                create: {
                    amount: 200000,
                    locked: 0
                }
            },
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 200000,
                    token: "token_1",
                    provider: "HDFC bank"
                },
            },
        },

    })
    const bob = await prisma.user.upsert({
        where: {
            number: "111111111"
        },
        update: {},
        create: {
            number: "111111111",
            password: await bcrypt.hash("bob", 10),
            name: "bob",
            balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
            },
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 2000,
                    token: "token_2",
                    provider: "HDFC bank"
                },
            },
        },

    })
    console.log({alice, bob})
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })