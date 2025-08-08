import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import imageBlog3 from "@/public/assets/images/blog3.png";
import Image from "next/image";
import BlogCard from "@/components/blog-card/BlogCard";

const blogHowCanDesignersPrepareForTheFuture = () => {
  return (
    <div className="blog-detail sec-padding">
      <Container fluid="xl">
        <Heading title="How Can Designers Prepare for the Future?" />
        <div className="ratio ratio-16x9 mb-3">
          <Image
            src={imageBlog3}
            alt="Blog"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="d-flex flex-wrap justify-content-between small mb-3">
          <span>28 févr. 2022</span>
          <span>7 min read</span>
        </div>
        <p>
          As the internet continues to develop and grow exponentially, jobs
          related to the industry do too, particularly those that relate to web
          design and development. The prediction is that by 2029, the job
          outlook for these two fields will grow by 8%—significantly faster than
          average. Whether you're seeking salaried employment or aiming to work
          in a freelance capacity, a career in web design can offer a variety of
          employment arrangements, competitive salaries, and opportunities to
          utilize both technical and creative skill sets.
        </p>
        <h3 className="color-light">
          What does a career in web design involve?
        </h3>
        <p>
          A career in website design can involve the design, creation, and
          coding of a range of website types. Other tasks will typically include
          liaising with clients and discussing website specifications,
          incorporating feedback, working on graphic design and image editing,
          and enabling multimedia features such as audio and video. Requiring a
          range of creative and technical skills, web designers may be involved
          in work across a range of industries, including software companies, IT
          consultancies, web design companies, corporate organizations, and
          more.
        </p>
        <p>
          In contrast with web developers, web designers tend to play a more
          creative role, crafting the overall vision and design of a site, and
          determining how to best incorporate the necessary functionality.
          However, there can be significant overlap between the roles.
        </p>
        <h3 className="color-light">
          Full-stack, back-end, and front-end web development
        </h3>
        <p>
          The U.S. Bureau of Labor Statistics (BLS) Occupational Outlook
          Handbook tends to group web developers and digital designers into one
          category. However, they define them separately, stating that web
          developers create and maintain websites and are responsible for the
          technical aspects including performance and capacity. Web or digital
          designers, on the other hand, are responsible for the look and
          functionality of websites and interfaces. They develop, create, and
          test the layout, functions, and navigation for usability.
        </p>
        <p>
          Web developers can focus on the back-end, front-end, or full-stack
          development, and typically utilize a range of programming languages,
          libraries, and frameworks to do so. Web designers may work more
          closely with front-end engineers to establish the user-end
          functionality and appearance of a site.
        </p>
        <h3 className="color-light">Are web designers in demand?</h3>
        <p>
          In our ever-increasingly digital environment, there is a constant need
          for websites—and therefore for web designers and developers. With 17.4
          billion websites in existence as of January 2020, the demand for web
          developers is only expected to rise. Web designers with significant
          coding experience are typically in higher demand and can usually
          expect a higher salary. Like all jobs, there are likely to be a range
          of opportunities, some of which are better paid than others.
        </p>
        <h3 className="color-light">
          Best practices for creating a landing page
        </h3>
        <p>
          If you're interested in pursuing a career in web design or starting a
          freelance business, having a professional portfolio website is
          essential. You can explore ready-made web design templates tailored
          for showcasing your work and impressing potential clients at{" "}
          <a
            href="https://templyo.io/templates"
            target="_blank"
            className="link-main"
          >
            Templyo
          </a>
          . These templates make it easier to create stunning websites without
          the need for extensive coding knowledge.
        </p>
      </Container>
      <div className="more-blogs sec-padding">
        <Container>
          <h3 className="mb-3">
            Read <span className="color-theme">More</span>
          </h3>
          <Row className="g-3 g-lg-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog3}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog3}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog3}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default blogHowCanDesignersPrepareForTheFuture;
