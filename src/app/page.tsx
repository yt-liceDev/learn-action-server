import AddForm from "@/components/AddForm"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function Home() {
  const data = await prisma.gathering.findMany()

  async function actionDel(formData: FormData) {
    "use server"
    await prisma.gathering.delete({
      where: {
        id: formData.get("meetId") as string,
      },
    })

    revalidatePath("/", "layout")
  }

  return (
    <main className='container py-8'>
      <section className='flex justify-center'>
        <Card className='w-full md:w-[60vw]'>
          <CardHeader>
            <CardTitle className='text-center'>Add Event</CardTitle>
          </CardHeader>
          <CardContent>
            <AddForm />
          </CardContent>
        </Card>
      </section>
      <section className='mt-20'>
        <h1 className='font-bold text-xl mb-8'>List Events</h1>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
          {data?.map((meet) => (
            <Card key={meet.id}>
              <CardHeader>
                <CardTitle>{meet.title}</CardTitle>
                <address>{meet.address}</address>
              </CardHeader>
              <CardContent>
                <p>{meet.description}</p>
              </CardContent>
              <CardFooter className='flex justify-end'>
                <form action={actionDel}>
                  <input type='hidden' name='meetId' value={meet.id} />
                  <Button>Delete</Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
