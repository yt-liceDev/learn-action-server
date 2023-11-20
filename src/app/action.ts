"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const constraintStr = z.string().min(1)

const schema = z.object({
  title: constraintStr,
  address: constraintStr,
  description: constraintStr,
})

export async function addMeet(prevState: any, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return {
      type: "error" as const,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.gathering.create({
      data: {
        title: result.data.title,
        address: result.data.address,
        description: result.data.description,
      },
    })

    revalidatePath("/")

    return {
      type: "success" as const,
      message: "Added event",
    }
  } catch (error) {
    return {
      type: "error" as const,
      message: "Failed to create event",
    }
  }
}
