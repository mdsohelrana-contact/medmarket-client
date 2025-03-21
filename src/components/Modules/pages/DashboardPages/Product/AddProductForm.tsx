"use client";

import SFormInput from "@/components/Modules/Shared/Form/SFormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { addMedicine } from "@/utils/actions/products";
import { toast } from "sonner";
import { useState } from "react";
import SFormImageUpload from "@/components/Modules/Shared/Form/SFormImageUpload";
import useImageUploader from "@/utils/useImageUploader";

type FormData = {
  name: string;
  generic_name: string;
  brand_name: string[];
  category: string;
  symptoms: string[];
  strength: string[];
  dosage_form: string[];
  price: string;
  stock: string;
  rating: number;
  imageUrl: string[];
  manufacturer_details: string;
  prescription_required: boolean;
};

const AddProductForm = () => {
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();
  const form = useForm<FormData>({
    // resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      generic_name: "",
      brand_name: [""],
      category: "",
      symptoms: [""],
      strength: [""],
      dosage_form: [""],
      price: "",
      stock: "",
      imageUrl: [],
      prescription_required: false,
    },
  });

  const [medicineImageUrl, setMedicineImageUrl] = useState<File | File[]>([]);

  // Submit handler
  const handleSubmit = async (data: FormData) => {
    const uploadedImageUrl = await uploadImagesToCloudinary(
      medicineImageUrl,
      true
    );

    const formData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      rating: Number(data.rating),
      imageUrl: uploadedImageUrl,
    };

    // Handle image upload
    try {
      const res = await addMedicine(formData);

      if (res.success) {
        toast.success("Medicine added successfully!");
        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
    }
  };

  // add new field
  const handleAddItem = (field: keyof FormData) => {
    const currentValue = form.getValues(field);

    if (Array.isArray(currentValue)) {
      form.setValue(field, [...currentValue, ""]);
    }
  };

  // Remove item from array field
  const handleRemoveItem = (field: keyof FormData, index: number) => {
    const currentValue = form.getValues(field);

    if (Array.isArray(currentValue)) {
      const updatedArray = currentValue.filter((_, i) => i !== index);
      form.setValue(field, updatedArray);
    }
  };

  return (
    <section className="w-full md:w-10/12  py-8 px-4 mx-auto  lg:py-16">
      <h2 className="mb-4 text-xl font-bold ">Add a New Medicine</h2>

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
              placeholder="Enter Manufacturer details..."
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

          <div className="grid grid-cols-1 md:grid-cols-2  justify-center items-center gap-5 my-5">
            {/* Brand name as Dynamic Array */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Name
              </label>
              {form.watch("brand_name").map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <SFormInput
                    control={form.control}
                    name={`brand_name.${index}`}
                    label={`brand_name ${index + 1}`}
                    placeholder="Enter brand name..."
                  />
                  <Button
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

            {/* Symptoms as Dynamic Array */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Symptoms
              </label>
              {form.watch("symptoms").map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <SFormInput
                    control={form.control}
                    name={`symptoms.${index}`}
                    label={`Symptom ${index + 1}`}
                    placeholder="Enter symptom"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-5"
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

            {/* Strength as Dynamic Array */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Strength
              </label>
              {form.watch("strength").map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <SFormInput
                    control={form.control}
                    name={`strength.${index}`}
                    label={`Strength ${index + 1}`}
                    placeholder="Enter strength"
                  />
                  <Button
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

            {/* Dosage Form as Dynamic Array */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dosage Form
              </label>
              {form.watch("dosage_form").map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <SFormInput
                    control={form.control}
                    name={`dosage_form.${index}`}
                    label={`Dosage Form ${index + 1}`}
                    placeholder="Enter dosage form"
                  />
                  <Button
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
                Add Another Dosage Form
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

          {/* Prescription Required Toggle */}
          <div className="sm:col-span-2 flex items-center">
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
              {isUploading ? "Medicine adding..." : "Add Medicine"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AddProductForm;
