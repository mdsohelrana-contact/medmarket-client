"use client";
import Autoplay from "embla-carousel-autoplay";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IReview } from "@/types/reviewTypes";

const ReviewCard = ({ reviews }: { reviews: IReview[] }) => {

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {reviews?.map((review, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card key={index} className=" shadow-lg rounded-lg">
                <CardHeader>
                  <div className="flex justify-center">
                    <Rating
                      style={{ maxWidth: 120 }}
                      value={review?.rating}
                      readOnly
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center px-4 py-2">
                  <p className=" italic">{review?.comment}</p>
                </CardContent>
                <CardFooter className="text-center text-sm text-gray-600">
                  <p>{review?.user}</p>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ReviewCard;
