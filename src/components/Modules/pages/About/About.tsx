"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useEffect } from "react";
import TitleContainer from "../../Shared/TitleContainer/TitleContainer";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const About = () => {
  useEffect(() => {
    document.title = "About Us - Your Website Name";
  }, []);

  const form = useForm();

  const handleSubmit = async (data: any) => {
    console.log(data, "review data ");
  };

  return (
    <div className="py-5 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mission and Vision */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Our Mission
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Our mission is to provide affordable, high-quality medications
                to everyone. We ensure that all medicines are sourced from
                certified suppliers with fast, reliable delivery.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Our Vision
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                We envision a world where access to medicine is seamless,
                transparent, and safe. Our goal is to be the most trusted and
                preferred online pharmacy platform.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12 text-center">
          <TitleContainer
            title="
            What customers are saying"
            description="
           We value your feedback. Leave us a review!.
"
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <Textarea
                className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white"
                placeholder="Write your review here..."
              ></Textarea>
              <Button
                type="submit"
                className="mt-3 bg-blue-500 hover:bg-blue-600"
              >
                Submit Review
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default About;
