import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import imageBlog4 from "@/public/assets/images/blog4.png";
import Image from "next/image";
import BlogCard from "@/components/blog-card/BlogCard";

const blogBuildingANavigationComponent = () => {
  return (
    <div className="blog-detail sec-padding">
      <Container fluid="xl">
        <Heading title="Building a Navigation Component with Variables" />
        <div className="ratio ratio-16x9 mb-3">
          <Image
            src={imageBlog4}
            alt="Blog"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="d-flex flex-wrap justify-content-between small mb-3">
          <span>6 févr. 2022</span>
          <span>6 min de lecture</span>
        </div>
        <p>
          La navigation est essentielle dans toute interface numérique. Composants intelligents nous permettre de créer des composants de navigation interactifs personnalisés qui fonctionnent parfaitement avec le reste de votre prototype. Dans ce guide, nous aborderons les concepts d'imbrication de composants, d'ajout d'événements aux éléments d'un composant utilisant des variables d'événement et les transmettant via votre composants. L’un des principaux avantages de l’utilisation de composants imbriqués est qu'il offre un contrôle total sur ses états, comme un survol unique états des éléments au sein d'un autre composant.
        </p>
        <h3 className="color-light">En commençant au niveau atomique</h3>
        <p>
         Framer vous permet de créer des composants entièrement interactifs et animés, et vous permet même d'imbriquer des composants dans d'autres composants. Nous sommes création d'un composant de barre de navigation pour un site Web qui contiendra deux types différents de composants imbriqués, avec leur propre unique interactions. Notre projet contiendra une barre de navigation qui contient divers composants imbriqués, à savoir cinq éléments Nav et un panier composant. La conception de nos composants imbriqués, l'élément de liste de navigation et le panier aura un impact sur la façon dont nous concevons notre barre de navigation. Pour pour cette raison, un flux de travail optimal inclut de commencer par le « plus profond » composant imbriqué et construction à partir de là.
        </p>
        <h3 className="color-light">Composants de nidification</h3>
        <p>
          {" "}
         Une fois nos deux composants prêts, nous pouvons commencer à créer le composant dans lequel nous allons les imbriquer. Dessinez votre barre de navigation, sélectionnez-le sur le canevas et cliquez sur l'outil Composant dans la barre d'outils. Pour imbriquer un composant différent dans notre nouveau composant, faites simplement glisser n'importe lequel autre composant du Component Canvas et placez-le dans votre barre de navigation conçue.
        </p>
        <h3 className="color-light">
          Déclenchement des interactions depuis la barre de navigation
        </h3>
        <p>
          De retour sur la toile principale, nous aimerions pouvoir demander sur « Vêtements » et accédez à un tout nouveau écran. Si vous connectez le composant en utilisant le connecteur de prototypage vers un nouvel écran, nous pourrions configurer un Interaction. Dépendant, cela sert declenché si nous appuyions n'importe où au sein de notre compositeur. Ce n'est pas ce que nous voulons faire, comme nous le voulons déclenchez cette transition unique à partir d'un élément spécifique. C'est ici Les variables d'événement arrivant, qui sont des types spéciaux de variables non attaché à des propriétés (comme l'opacité ou le remblissage) mais plutôt à des événements.
        </p>
      </Container>
      <div className="more-blogs sec-padding">
        <Container>
          <h3 className="mb-3">
            Lire<span className="color-theme">Plus</span>
          </h3>
          <Row className="g-3 g-lg-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog4}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog4}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog4}
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

export default blogBuildingANavigationComponent;
