import "./blog-card.css";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const BlogCard = ({ link, title, image, date, timeToRead }) => {
  return (
    <Link
      href={`/blog/${link}`}
      className="blog-card d-block overflow-hidden text-start h-100"
    >
      <div className="b-card-image overflow-hidden ratio ratio-4x3">
        <Image
          src={image}
          alt={`${title} || Blog`}
          fill
          priority
          className="object-fit-cover w-100"
        />
      </div>
      <div className="b-card-text p-3 p-md-4">
        <div className="d-flex flex-wrap justify-content-between mb-3 small">
          <span>{date}</span>
          <span>{timeToRead}</span>
        </div>
        <h3 className="pe-4 color-light fs-4">{title}</h3>
      </div>
    </Link>
  );
};

export default BlogCard;
