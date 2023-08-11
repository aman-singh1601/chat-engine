import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "../../axios";
import { toast } from "react-hot-toast/headless";
import { useDispatch } from "react-redux";
import { authSignin } from "@/features/userSlice";
const HomePage = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);

  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const upload = (e: any) => {
    setData({ ...data, pic: e.target.files[0] });
  };
  const handleClick = async () => {
    try {
      setLoading(true);
      if (!user) {
        let formdata = new FormData();
        formdata.append("pic", data.pic);
        formdata.append("fName", data.fName);
        formdata.append("lName", data.lName);
        formdata.append("password", data.password);
        formdata.append("confirmPassword", data.confirmPassword);
        formdata.append("email", data.email);
        const res = await axios.post("/user/signup", formdata);
        console.log(res.data);
        dispatch(authSignin(res.data));
      } else {
        const newdata = {
          email: `${data.email}`,
          password: `${data.password}`,
        };
        const res = await axios.post("user/login", newdata);
        console.log(res);
        dispatch(authSignin(res.data));
      }
      window.location.assign("/chats");
      // navigate("/chats");
    } catch (err: any) {
      toast.error("Something went wrong");
      console.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Tabs defaultValue="signup" className="w-[400px] m-auto py-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={() => setUser(true)}>
            Log In
          </TabsTrigger>
          <TabsTrigger value="signup" onClick={() => setUser(false)}>
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>Log In to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  name="email"
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pass">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  id="pass"
                  placeholder="Password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading} onClick={handleClick}>
                Log In
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  name="fName"
                  onChange={handleChange}
                  placeholder="Abc"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  name="lName"
                  onChange={handleChange}
                  placeholder="Xyz"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pss">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  id="pss"
                  placeholder="password"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cpass">Confirm Password</Label>
                <Input
                  id="cpass"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="confirm password"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fileUp">Profile Picture</Label>
                <Input id="fileUp" name="pic" onChange={upload} type="file" />
              </div>
              <div className="space-y-1 pt-2"></div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading} onClick={handleClick}>
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
