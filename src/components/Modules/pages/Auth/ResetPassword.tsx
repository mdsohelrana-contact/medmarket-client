"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SFormInput from "../../Shared/Form/SFormInput";
import { resetPasswordValidation } from "./validation/userRegisterValidation";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}
const ResetPassword = () => {
  const form = useForm(
    {
      resolver: zodResolver(resetPasswordValidation),
    }
  );

  const password = form.watch("newPassword");
  const confirmPassword = form.watch("confirmPassword");

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="flex  flex-col w-full gap-6 max-w-2xl mx-auto">
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <SFormInput
                    control={form.control}
                    name="email"
                    label="Your Email"
                    placeholder="registeremail@gmail.com"
                  />

                    <SFormInput
                      control={form.control}
                      name="newPassword"
                      label="New Password"
                      placeholder="newPassword"
                      type="password"
                    />
                    <SFormInput
                      control={form.control}
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="confirmPassword"
                      type="password"
                    />
                    {password !== confirmPassword && (
                      <p className="text-red-500">Passwords do not match</p>
                    )}
                  <Button disabled={password !== confirmPassword} type="submit" variant={"outline"} className="w-full">
                    Reset password
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
