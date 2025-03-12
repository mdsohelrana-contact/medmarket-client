import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const reviews = [
  {
    rating: 5,
    quote:
      "“Fewer trips to the pharmacy and more reliable service than I was getting with my old pharmacy.”",
    author: "Avita F, Amazon Pharmacy customer",
  },
  {
    rating: 5,
    quote:
      "“Ordering from Amazon is so simple. I don’t have to wait in line, and when I order it shows up at the door.”",
    author: "Lock D, Amazon Pharmacy customer",
  },
  {
    rating: 5,
    quote:
      "“I don’t have to follow up with my doctor’s office for refills anymore. Amazon Pharmacy handles everything.”",
    author: "Neresith M, Amazon Pharmacy customer",
  },
  {
    rating: 5,
    quote:
      "“It is very easy to order my prescriptions and then receive them delivered to my home very quickly!”",
    author: "Eretrisen F, Amazon Pharmacy customer",
  },
  {
    rating: 5,
    quote:
      "“Fast, easy, and reliable service. I no longer have to worry about missing a refill!”",
    author: "Jonathan P, Amazon Pharmacy customer",
  },
  {
    rating: 5,
    quote:
      "“Amazon Pharmacy provides great customer service and always delivers my medication on time.”",
    author: "Samantha R, Amazon Pharmacy customer",
  },
];
const ReviewSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className=" shadow-lg rounded-lg">
              <CardHeader>
                <div className="flex justify-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="text-center px-4 py-2">
                <p className=" italic">{review.quote}</p>
              </CardContent>
              <CardFooter className="text-center text-sm text-gray-600">
                <p>{review.author}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
