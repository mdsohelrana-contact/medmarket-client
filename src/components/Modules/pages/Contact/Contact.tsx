"use client";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TitleContainer from "../../Shared/TitleContainer/TitleContainer";

const Contact = () => {
  return (
    <div className=" py-5 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Contact Info Section */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card className="transition-all">
            <CardHeader>
              <h3 className="text-2xl font-semibold  flex items-center">
                <FaMapMarkerAlt className="inline-block mr-2 text-blue-600" />
                Our Location
              </h3>
            </CardHeader>
            <CardContent>
              <p className="">123, Medicine Street, E-Commerce City, Country</p>
            </CardContent>
          </Card>

          <Card className="transition-all ">
            <CardHeader>
              <h3 className="text-2xl font-semibold  flex items-center">
                <FaPhoneAlt className="inline-block mr-2 text-blue-600" />
                Phone
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">+1 234 567 890</p>
            </CardContent>
          </Card>

          <Card className="transition-all ">
            <CardHeader>
              <h3 className="text-2xl font-semibold  flex items-center">
                <FaEnvelope className="inline-block mr-2 text-blue-600" />
                Email
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                support@yourmedstore.com
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="mt-5">
          <TitleContainer
            title="Send Us a Message"
            description=" Have any questions or need support? Drop us a message, and we'll get
            back to you as soon as possible."
          />

          <div className=" flex justify-center">
            <form className="w-full sm:w-2/3 lg:w-1/2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full"
                />
                <Input
                  name="email"
                  placeholder="Your Email"
                  type="email"
                  required
                  className="w-full"
                />
              </div>
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                required
                className="w-full"
              />
              <div className="text-center">
                <Button
                  type="submit"
                  variant="default"
                  className="w-full"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
