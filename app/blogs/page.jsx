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
    link: "starting-a-career-in-web-design",
    title: "Starting and Growing a Career in Web Design",
    image: imageBlog1,
    date: "8 avr. 2022",
    timeToRead: "6 min read",
  },
  {
    link: "create-a-landing-page-that-performs-great",
    title: "Create a Landing Page That Performs Great",
    image: imageBlog2,
    date: "15 mars 2022",
    timeToRead: "5 min read",
  },
  {
    link: "how-can-designers-prepare-for-the-future",
    title: "How Can Designers Prepare for the Future?",
    image: imageBlog3,
    date: "28 févr. 2022",
    timeToRead: "5 min read",
  },
  {
    link: "building-a-navigation-component",
    title: "Building a Navigation Component with Variables",
    image: imageBlog4,
    date: "6 févr. 2022",
    timeToRead: "6 min read",
  },
  {
    link: "how-to-create-an-effective-design-portfolio",
    title: "How to Create an Effective Design Portfolio",
    image: imageBlog5,
    date: "12 janv. 2022",
    timeToRead: "6 min read",
  },
];

const Blogs = () => {
  return (
    <div className="page-blog">
      <Container fluid="xl" className="sec-padding text-center">
        <Heading
          title="Stay Inspired with Our Latest Insights"
          highlightedWords={["Insights"]}
          description="Dive into our blog for the latest trends, tips, and insights in the world of design and AI technology. Whether you’re looking for inspiration, tutorials, or industry news, our articles are crafted to keep you informed and inspired."
        />
        {allBlogs.length > 0 && (
          <Row className="g-3 g-lg-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
            {allBlogs.map((blog, index) => {
              return (
                <Col key={index}>
                  <BlogCard
                    link={blog.link}
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
