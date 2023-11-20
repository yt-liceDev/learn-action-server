"use client"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export default function SubmitForm() {
  const { pending } = useFormStatus()

  return (
    <Button aria-disabled={pending} disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </Button>
  )
}
