// Validation schema with Zod
import { z } from "zod";
export const productFormSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  generic_name: z.string().min(1, "Generic name is required"),
  brand_name: z.array(z.string()).min(1, "At least one symptom is required"),
  category: z.string().min(1, "Category is required"),
  symptoms: z.array(z.string()).min(1, "At least one symptom is required"),
  strength: z.array(z.string()).min(1, "At least one strength is required"),
  dosage_form: z
    .array(z.string())
    .min(1, "At least one dosage form is required"),
  price: z.string({ required_error: "Price must be a positive number" }),
  stock: z.string({ required_error: "Price must be a positive number" }),
  imageUrl: z.array(z.string()),
  prescription_required: z.boolean().default(false),
});
