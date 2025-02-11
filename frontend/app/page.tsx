'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react";

const formSchema = z.object({
  todo: z.string().min(2, {
    message: "username must be atleast 2 characters",
  }),
})

const server = process.env.server || "http://localhost:8000/todos";

export default function Home() {

  const [todoList, setTodoList] = useState<{id: string; name: string; completed: boolean}[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.todo)
    axios
      .post(server, {name: values.todo, completed: false}) // axios.post automatically converts body into json before sending it. 
      .then(res => {
        setTodoList(res.data)
        form.reset();
      })
  }
  return (
    <>
      <div className="bg-green-500 h-20 text-white text-5xl flex items-center justify-center flex-col"> <p> TODO APP</p></div>         
    
      <div className="flex justify-center m-32">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Todo</FormLabel>
                  <FormControl>
                    <Input className="w-96" placeholder="go for a run" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add todo to the list.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>     
      </div>

      <div className="text-black">
        {todoList.map((todo, index) => (
            <div key={index} className=" border border-red-100  w-1/2 h-16 mx-auto rounded p-2 m-2 flex justify-between items-center shadow-md text-sky-700">
              <p className="flex-1 text-center font-semibold"><strong>{todo.name}</strong></p>
              <Button 
                className="text-sm text-right" 
                onClick={() => {
                  axios
                  .put(server, {id: todo.id, name: todo.name, completed: !todo.completed})
                  .then(res => setTodoList(res.data))
                }}>
                  {todo.completed ? "✅" : "❌"}
              </Button>

              <Button 
                className="text-sm text-right ml-4" 
                onClick={() => {
                  axios
                  .delete(server, {
                    data: {id: todo.id}
                  })
                  .then(res => setTodoList(res.data))
                }}>
                  {"delete"}
              </Button>

            </div>
        ))}
      </div>
    </>
  );
}
