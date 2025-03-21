"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SFormInput from "../Form/SFormInput";
import SFormImageUpload from "../Form/SFormImageUpload";
import { useState } from "react";
import useImageUploader from "@/utils/useImageUploader";
import Image from "next/image";
import { updateUser } from "@/utils/actions/user/userActions";
import { toast } from "sonner";

interface ProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser;
}

const ProfileModal = ({ isOpen, onOpenChange, user }: ProfileModalProps) => {
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      profileImg: user.profileImg || "",
    },
  });

  const [profileImageUrl, setProfileImageUrl] = useState<File | File[]>([]);

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

    try {
      const res = await updateUser(user._id, formData);

      console.log(res);

      if (!res.success) {
        toast.error(res.message);
      }
      if (res.success) {
        toast.success(res.message);
        onOpenChange(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-10/12 rounded-lg">
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
          <DialogDescription>
            View and edit your profile information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <SFormInput
                    control={form.control}
                    name="name"
                    label="Your Name"
                  />
                  <SFormInput
                    control={form.control}
                    name="email"
                    label="Email"
                  />
                  <SFormInput
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                  />

                  {/* Image Upload */}
                  <SFormImageUpload
                    control={form.control}
                    name="profileImg"
                    label="Profile Image"
                    multiple={false}
                    onImageUpload={setProfileImageUrl}
                  />

                  {user?.profileImg && (
                    <Image
                      alt={user?.name}
                      width={100}
                      height={100}
                      src={user?.profileImg}
                    />
                  )}

                  <Button
                    type="submit"
                    variant={"outline"}
                    className="w-full font-description "
                  >
                    {isUploading ? "Updating..." : "Update"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="default">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
