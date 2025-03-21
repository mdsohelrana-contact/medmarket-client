"use client";

import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TitleContainer from "../../Shared/TitleContainer/TitleContainer";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReviewSection from "../../Home/ReviewSection/ReviewSection";
import SFormInput from "../../Shared/Form/SFormInput";
import { toast } from "sonner";
import { createReview } from "@/utils/actions/review";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for form validation
const reviewSchema = z.object({
  user: z.string().min(1, "Name is required"),
  comment: z.string().min(10, "Review must be at least 10 characters long"),
});
const About = () => {
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      user: "",
      comment: "",
    },
  });
  const [rating, setRating] = useState(0);

  const handleSubmit = async (data: any) => {
    const review = {
      ...data,
      rating,
    };

    // create a new review
    try {
      const res = await createReview(review);
      if (res.success) {
        toast.success("Review submitted successfully");
        form.reset();
        setRating(0);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error || "something went wrong");
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          <Card className=" transition-all">
            <CardHeader>
              <h3 className="text-2xl font-semibold font-title">Our Mission</h3>
            </CardHeader>
            <CardContent>
              <p className="font-description">
                Our mission is to provide affordable, high-quality medications
                to everyone. We ensure that all medicines are sourced from
                certified suppliers with fast, reliable delivery.
              </p>
            </CardContent>
          </Card>
          <Card className=" transition-all">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white font-title">
                Our Vision
              </h3>
            </CardHeader>
            <CardContent>
              <p className="font-description">
                We envision a world where access to medicine is seamless,
                transparent, and safe. Our goal is to be the most trusted and
                preferred online pharmacy platform.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-semibold font-title">Our Story</h3>
            </CardHeader>
            <CardContent>
              <p className="font-description">
                Founded in 2020, Your Website Name started as a small initiative
                to bridge the gap between patients and pharmacies. Over the
                years, we have grown into a trusted platform serving thousands
                of customers nationwide. Our journey has been driven by a
                passion for healthcare innovation and a commitment to customer
                satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="">
          <TitleContainer
            title="Our Core Values"
            description="These principles guide everything we do."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className=" transition-all">
              <CardHeader>
                <h3 className="text-xl font-semibold font-title ">Integrity</h3>
              </CardHeader>
              <CardContent>
                <p className="font-description">
                  We are committed to honesty, transparency, and ethical
                  practices in all our operations.
                </p>
              </CardContent>
            </Card>
            <Card className=" transition-all">
              <CardHeader>
                <h3 className="text-xl font-semibold font-title">Customer-Centric</h3>
              </CardHeader>
              <CardContent>
                <p className="font-description">
                  Our customers are at the heart of everything we do. We strive
                  to exceed their expectations.
                </p>
              </CardContent>
            </Card>
            <Card className=" transition-all">
              <CardHeader>
                <h3 className="text-xl font-semibold font-title ">Innovation</h3>
              </CardHeader>
              <CardContent>
                <p className="font-description">
                  We continuously innovate to improve our services and make
                  healthcare more accessible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="">
          <TitleContainer
            title="What Our Customers Are Saying"
            description="We value your feedback. Leave us a review!"
          />

          {/* Testimonial Carousel */}
          <div className="relative mx-5">
            <ReviewSection />
          </div>

          {/* Review Form */}
          <div className="">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold font-title">Leave a Review</h3>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="mb-5">
                      <SFormInput
                        control={form.control}
                        name="user"
                        label="Your name"
                        placeholder="your name"
                      />
                    </div>

                    {/* Textarea with Controller */}
                    <div className="mb-5">
                      <Controller
                        name="comment"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            placeholder="Write your review here..."
                            className="w-full p-3 border rounded-md "
                            rows={4}
                          />
                        )}
                      />
                    </div>

                    <div className="text-center mx-auto">
                      <Rating
                        style={{ maxWidth: 180 }}
                        value={rating}
                        onChange={setRating}
                        isRequired
                        className="mx-auto mt-5"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      className="w-full mt-5 font-description"
                    >
                      Submit Review
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
