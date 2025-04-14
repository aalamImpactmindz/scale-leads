import "./blogs.css";
import BlogCard from "@/components/blog-card/BlogCard";
import Faqs from "@/components/faqs/Faqs";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import imageBlog1 from "@/public/assets/images/blog1.png";
import imageBlog2 from "@/public/assets/images/blog2.png";
import imageBlog3 from "@/public/assets/images/blog3.png";
import imageBlog4 from "@/public/assets/images/blog4.png";
import imageBlog5 from "@/public/assets/images/blog5.png";

const allBlogs = [
  {
    title: "Starting and Growing a Career in Web Design",
    image: imageBlog1,
    date: "8 avr. 2022",
    timeToRead: "6 min read",
  },
  {
    title: "Create a Landing Page That Performs Great",
    image: imageBlog2,
    date: "15 mars 2022",
    timeToRead: "5 min read",
  },
  {
    title: "How Can Designers Prepare for the Future?",
    image: imageBlog3,
    date: "28 févr. 2022",
    timeToRead: "5 min read",
  },
  {
    title: "Building a Navigation Component with Variables",
    image: imageBlog4,
    date: "6 févr. 2022",
    timeToRead: "6 min read",
  },
  {
    title: "How to Create an Effective Design Portfolio",
    image: imageBlog5,
    date: "12 janv. 2022",
    timeToRead: "6 min read",
  },
];

const Blogs = () => {
  return (
    <div className="page-blog">
      <Container className="sec-padding pb-0 text-center">
        <Heading
          title="Stay Inspired with Our Latest Insights"
          highlightedWords={["Insights"]}
          description="Dive into our blog for the latest trends, tips, and insights in the world of design and AI technology. Whether you’re looking for inspiration, tutorials, or industry news, our articles are crafted to keep you informed and inspired."
        />
        {allBlogs.length > 0 && (
          <Row className="row-cols-3 g-4">
            {allBlogs.map((blog, index) => {
              return (
                <Col key={index}>
                  <BlogCard
                    title={blog.title}
                    image={blog.image}
                    date={blog.date}
                    timeToRead={blog.timeToRead}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
      <Faqs />
    </div>
  );
};

export default Blogs;
