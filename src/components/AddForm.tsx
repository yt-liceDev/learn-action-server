"use client"

import { addMeet } from "@/app/action"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"
import { useFormState } from "react-dom"
import SubmitForm from "./SubmitForm"

export default function AddForm() {
  const [state, formAction] = useFormState(addMeet, { type: undefined, message: null })
  const ref = useRef<HTMLFormElement>(null)

  state?.type === "success" && ref.current?.reset()

  return (
    <form action={formAction} ref={ref} className="space-y-4">
      <div className="flex items-center w-full">
        <Label htmlFor="title" className="basis-1/4">
          Title :
        </Label>
        <div className="basis-3/4">
          <Input type="text" id="title" name="title" />
          <small className="text-destructive">
            {state?.type === "error" && state?.errors?.title}
          </small>
        </div>
      </div>
      <div className="flex items-center w-full">
        <Label htmlFor="address" className="basis-1/4">
          Address :
        </Label>
        <div className="basis-3/4">
          <Input type="text" id="address" name="address" />
          <small className="text-destructive">
            {state?.type === "error" && state?.errors?.address}
          </small>
        </div>
      </div>
      <div className="flex items-center w-full">
        <Label htmlFor="description" className="basis-1/4">
          Description :
        </Label>
        <div className="basis-3/4">
          <Textarea id="description" name="description" className="resize-none" />
          <small className="text-destructive">
            {state?.type === "error" && state?.errors?.description}
          </small>
        </div>
      </div>
      <div className="text-end">
        <SubmitForm />
      </div>
    </form>
  )
}
