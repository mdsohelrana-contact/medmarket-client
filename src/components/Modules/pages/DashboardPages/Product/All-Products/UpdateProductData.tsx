"use client";

import SFormInput from "@/components/Modules/Shared/Form/SFormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import SFormImageUpload from "@/components/Modules/Shared/Form/SFormImageUpload";
import useImageUploader from "@/utils/useImageUploader";
import { IMedicine } from "@/types/medicinesTypes";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { updateMedicine } from "@/utils/actions/products";
import { useRouter } from "next/navigation";

type FormData = {
  name?: string;
  generic_name?: string;
  brand_name?: string[];
  category?: string;
  symptoms?: string[];
  strength?: string[];
  dosage_form?: string[];
  price?: any;
  stock?: any;
  rating: number;
  imageUrl?: string[] | string;
  manufacturer_details: string;
  prescription_required?: boolean;
};

const UpdateProductForm = ({ medicine }: { medicine: IMedicine }) => {
  const {
    _id,
    name,
    brand_name,
    category,
    generic_name,
    prescription_required,
    price,
    stock,
    strength,
    symptoms,
    dosage_form,
    manufacturer_details,
    rating,
    imageUrl,
  } = medicine;

  const { uploadImagesToCloudinary, isUploading } = useImageUploader();
  const router = useRouter();
  const [medicineImageUrl, setMedicineImageUrl] = useState<File | File[]>([]);

  const form = useForm<FormData>({
    defaultValues: {
      name,
      generic_name,
      brand_name,
      category,
      symptoms,
      strength,
      dosage_form,
      price,
      stock,
      rating: medicine?.rating,
      imageUrl: imageUrl || [],
      manufacturer_details: manufacturer_details || "Not available",
      prescription_required,
    },
  });

  // Handle Form Submit
  const handleSubmit = async (data: any) => {
    try {
      const uploadedImageUrl = await uploadImagesToCloudinary(
        medicineImageUrl,
        true
      );

      // Prepare final data
      const updatedData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        rating: Number(data.rating),
        imageUrl: uploadedImageUrl,
      };

      const res = await updateMedicine(updatedData, _id);

      if (res.success) {
        toast.success(res.message);
        router.push(`/dashboard/manage-products`);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  // Handle Add New Field
  const handleAddItem = (field: keyof FormData) => {
    const currentValue = form.getValues(field);
    if (Array.isArray(currentValue)) {
      form.setValue(field, [...currentValue, ""]);
    }
  };

  // Handle Remove Item
  const handleRemoveItem = (field: keyof FormData, index: number) => {
    const currentValue = form.getValues(field);
    if (Array.isArray(currentValue)) {
      const updatedArray = currentValue.filter((_, i) => i !== index);
      form.setValue(field, updatedArray);
    }
  };

  return (
    <section className=" py-8 px-4 w-full lg:py-16">
      <h2 className="mb-4 text-xl font-bold ">
        Update This <Badge variant="destructive">{medicine?.name}</Badge>
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 justify-end items-center">
            <SFormInput
              control={form.control}
              name="name"
              label="Medicine Name"
              placeholder="Enter medicine name..."
            />
            <SFormInput
              control={form.control}
              name="generic_name"
              label="Generic Name"
              placeholder="Enter generic name..."
            />
            <SFormInput
              control={form.control}
              name="manufacturer_details"
              label="Manufacturer"
            />

            <SFormInput
              control={form.control}
              name="category"
              label="Category"
              placeholder="Enter category..."
            />

            {/* Price and Stock Inputs */}
            <SFormInput
              control={form.control}
              name="price"
              label="Price"
              placeholder="Enter price..."
              type="number"
            />
            <SFormInput
              control={form.control}
              name="stock"
              label="Stock"
              placeholder="Enter stock..."
              type="number"
            />
            <SFormInput
              control={form.control}
              name="rating"
              label="Rating"
              placeholder="Enter rating..."
              type="number"
            />
          </div>

          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 my-5">
            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium">Brand Name</label>
              {form.watch("brand_name")?.map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <SFormInput
                    control={form.control}
                    name={`brand_name.${index}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem("brand_name", index)}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem("brand_name")}
                className="text-blue-500"
              >
                Add Another Brand Name
              </button>
            </div>

            {/* strength*/}
            <div>
              <label className="block text-sm font-medium">Strength</label>
              {form.watch("strength")?.map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <SFormInput
                    control={form.control}
                    name={`strength.${index}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem("strength", index)}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem("strength")}
                className="text-blue-500"
              >
                Add Another Strength
              </button>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium">Symptoms</label>
              {form.watch("symptoms")?.map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <SFormInput
                    control={form.control}
                    name={`symptoms.${index}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem("symptoms", index)}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem("symptoms")}
                className="text-blue-500"
              >
                Add Another Symptom
              </button>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium">Dosage Form</label>
              {form.watch("dosage_form")?.map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <SFormInput
                    control={form.control}
                    name={`dosage_form.${index}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem("dosage_form", index)}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem("dosage_form")}
                className="text-blue-500"
              >
                Add Another Symptom
              </button>
            </div>
          </div>

          {/* Image Upload  */}
          <SFormImageUpload
            control={form.control}
            name="imageUrl"
            label="Medicine Images"
            multiple={true}
            onImageUpload={setMedicineImageUrl}
          />

          {/* Image Preview */}
          <div className="mb-5 flex flex-wrap gap-5">
            {Array.isArray(imageUrl) &&
              imageUrl.map((item: any, index: number) => (
                <Image
                  key={index}
                  alt={name}
                  width={100}
                  height={100}
                  src={item}
                />
              ))}
          </div>

          {/* Prescription Required */}
          <div className="flex items-center">
            <label className="mr-3 text-lg">Prescription Required</label>
            <Switch
              checked={form.watch("prescription_required")}
              onCheckedChange={(value) =>
                form.setValue("prescription_required", value)
              }
            />
          </div>

          <div className="my-5">
            <Button
              disabled={isUploading}
              variant="outline"
              className="w-full"
              type="submit"
            >
              {isUploading ? "Updating..." : "Update Medicine"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default UpdateProductForm;
