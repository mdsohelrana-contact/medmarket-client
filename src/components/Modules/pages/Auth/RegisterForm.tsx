"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import SFormInput from "../../Shared/Form/SFormInput";
import { useForm } from "react-hook-form";
import SFormImageUpload from "../../Shared/Form/SFormImageUpload";
import { useState } from "react";
import useImageUploader from "@/utils/useImageUploader";
import { userRegisterValidation } from "./validation/userAuthValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/utils/actions/registerUser";
import { toast } from "sonner";

const RegisterForm = () => {
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();
  const form = useForm({
    resolver: zodResolver(userRegisterValidation),
  });

  const [profileImageUrl, setProfileImageUrl] = useState<File | File[]>([]);

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const handleSubmit = async (data: any) => {
    // Upload the image and get the URL
    const uploadedImageUrl = await uploadImagesToCloudinary(
      profileImageUrl,
      false
    );

    const formData = {
      ...data,
      profileImg: uploadedImageUrl, // Add the uploaded image URL
    };

    // Log or send the form data to your backend
    try {
      const res = await registerUser(formData);

      if (!res.success) {
        toast.error(res.message);
      }
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 max-w-2xl mx-auto">
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your Free Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <SFormInput
                    control={form.control}
                    name="name"
                    placeholder="John Doe"
                    label="Your Name"
                  />
                  <SFormInput
                    control={form.control}
                    name="email"
                    placeholder="m@example123.com"
                    label="Email"
                  />
                  <SFormInput
                    control={form.control}
                    name="phone"
                    placeholder="++0880000000"
                    label="Phone Number"
                  />
                  <SFormInput
                    control={form.control}
                    name="password"
                    placeholder="m@example123"
                    label="Password"
                    type="password"
                  />

                  <SFormInput
                    control={form.control}
                    name="confirmPassword"
                    placeholder="m@example123"
                    label="Confirm Password"
                    type="password"
                  />

                  {password !== confirmPassword && (
                    <div className="text-red-500">Passwords do not match</div>
                  )}

                  {/* Image Upload */}
                  <SFormImageUpload
                    control={form.control}
                    name="profileImg"
                    label="Profile Image"
                    multiple={false}
                    onImageUpload={setProfileImageUrl}
                  />

                  <Button
                    disabled={password !== confirmPassword || isUploading}
                    type="submit"
                    variant={"outline"}
                    className="w-full"
                  >
                    {isUploading ? "Registering..." : "Register"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
