import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Login = () => {
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" })
  const [loginInput, setLoginInput] = useState({ email: "", password: "" })

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    }
    else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  }

  const handleRegistration = (type) => {
    const inputDate = type === "signup" ? signupInput : loginInput;
    console.log(inputDate);
  }

  return (
    <div className='flex items-center justify-center w-full my-10' >
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Sign up now to create your account and start your journey!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" value={signupInput.name} onChange={(e) => changeInputHandler(e, "signup")} placeholder="Full Name" required="true" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input type="email" onChange={(e) => changeInputHandler(e, "signup")} name="email" value={signupInput.email} placeholder="Email" required="true" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input type="password" name="password" onChange={(e) => changeInputHandler(e, "signup")} placeholder="Password" required="true" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signup")}>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Log in to access your account and continue where you left off!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input type="email" name="email" value={loginInput.email} onChange={(e) => changeInputHandler(e, "login")} placeholder="Email" required="true" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input type="password" name="password" value={loginInput.password} onChange={(e) => changeInputHandler(e, "login")} placeholder="Password" required="true" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login