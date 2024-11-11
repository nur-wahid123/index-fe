"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import ENDPOINT from "@/source/config/url"
import ckie from "js-cookie"
import React from "react"


export const description = "A simple login form."

export const iframeHeight = "870px"

export const containerClassName = "w-full h-full"

export default function LoginForm() {
  const router = useRouter()
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    await axios.post(`${ENDPOINT.LOGIN}`,state)
    .then(res => {
      ckie.set("token",res.data.access_token)
      router.push("/dashboard")
    })
  }
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
            <Link href="/" className="mb-7 w-fit">
        <ArrowLeft/>
            </Link>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={state.username}
                onChange={(e) => setState({ ...state, username: e.target.value })}
                type="text"
                placeholder="username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })}
              type="password"
               required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}