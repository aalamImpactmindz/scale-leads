import "./blog-card.css";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const BlogCard = ({ link, title, image, date, timeToRead }) => {
  return (
    <Link
      href={`/blog/${link}`}
      className="blog-card bg-gray d-block rounded-4 overflow-hidden text-start h-100"
    >
      <div className="b-card-image overflow-hidden ratio ratio-16x9">
        <Image
          src={image}
          alt={`${title} || Blog`}
          fill
          priority
          className="object-fit-cover w-100"
        />
      </div>
      <div className="b-card-text p-3">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <span>{date}</span>
          <span>{timeToRead}</span>
        </div>
        <h3 className="pe-4 color-light">{title}</h3>
      </div>
    </Link>
  );
};

export default BlogCard;
