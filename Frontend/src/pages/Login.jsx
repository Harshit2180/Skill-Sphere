import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from '@/features/api/authApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { RadioGroup } from '@radix-ui/react-dropdown-menu'

const Login = () => {
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "", role: "" })
  const [loginInput, setLoginInput] = useState({ email: "", password: "" })

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation()
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation()

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    }
    else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  }

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  }

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful!")
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup failed!")
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful!")
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login failed")
    }
  }, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError])

  return (
    <div className='flex items-center justify-center w-full mt-20' >
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleRegistration("signup");
            }}>
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
                <div className='flex items-center justify-between'>
                  <RadioGroup className='flex items-center gap-4 my-1'>
                    <div className="flex items-center space-x-2">
                      <Input type="radio" name="role" value="student" checked={signupInput.role === "student"} onChange={(e) => changeInputHandler(e, "signup")} className='cursor-pointer' />
                      <Label htmlFor="r1">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="radio" name="role" value="instructor" checked={signupInput.role === "instructor"}  onChange={(e) => changeInputHandler(e, "signup")} className='cursor-pointer' />
                      <Label htmlFor="r2">Instructor</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                  {
                    registerIsLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
                      </>
                    ) : "Signup"
                  }
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleRegistration("login");
            }}>
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
                <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                  {
                    loginIsLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
                      </>
                    ) : "Login"
                  }
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login