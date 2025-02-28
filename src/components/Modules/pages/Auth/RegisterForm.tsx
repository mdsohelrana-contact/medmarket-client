"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import SFormInput from "../../Shared/Form/SFormInput";
import { Label } from "@/components/ui/label";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userRegisterValidation } from "./validation/userRegisterValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import SFormImageUpload from "../../Shared/Form/SFormImageUpload";
import { ChangeEvent, useState } from "react";
import useImageUploader from "@/components/utils/useImageUploader";

const RegisterForm = () => {
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();
  const form = useForm({
    // resolver: zodResolver(userRegisterValidation),
  });

  const [profileImageUrl, setProfileImageUrl] = useState<File| File[]>([]); // Store image URL

  console.log("Profile Image URL:", profileImageUrl);

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = {
      ...data, // Add image URL to form data
    };

    const uploadedImageUrls = await uploadImagesToCloudinary(profileImageUrl, true); // Pass true for multiple images

    formData.profileImageUrls = uploadedImageUrls;

    console.log("Uploaded Image URLs:", uploadedImageUrls)
    console.log("Final Form Data:", formData);
    // You can now send formData to your backend
  };

  return (
    <div className="flex  flex-col w-full gap-6 max-w-2xl mx-auto">
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
                    name="profileImage"
                    label="Profile Image"
                    multiple={true}
                    onImageUpload={setProfileImageUrl}
                  />

                  <Button
                    disabled={password !== confirmPassword || isUploading}
                    type="submit"
                    variant={"outline"}
                    className="w-full"
                  >

                    {
                      isUploading ? "Registering..." : "Register"
                    }
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
