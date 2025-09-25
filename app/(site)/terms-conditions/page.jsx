import Heading from "@/components/heading/Heading";
import React from "react";
import { Container } from "react-bootstrap";
export const metadata = {
  title: "Conditions d’utilisation | Vos Droits avec ScaleLeads",
  description:
    "Consultez les termes et conditions ScaleLeads. Toutes les conditions service prospection sont détaillées pour un usage clair, sécurisé et transparent.",
  keywords: [
    "conditions d’utilisation",
    "termes et conditions ScaleLeads",
    "conditions service prospection"
    
  ],
  openGraph: {
    title: "Conditions d’utilisation | Vos Droits avec ScaleLeads",
    description:
      "Consultez les termes et conditions ScaleLeads. Toutes les conditions service prospection sont détaillées pour un usage clair, sécurisé et transparent.",
    url: "https://scaleleads.fr/terms-conditions",
    siteName: "ScaleLeads",
    images: [
      {
        url: "https://scaleleads.fr/logo.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Conditions d’utilisation | Vos Droits avec ScaleLeads",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleleads.fr/terms-conditions",
  },
};

const TermsConditions = () => {
  return (
    <div className="page-content sec-padding">
      <Container fluid="xl">
        <Heading title="Terms & Conditions" />
        <p>
          In urna urna, rhoncus sed lorem id, blandit vulputate sem. Nullam
          dapibus augue congue vulputate maximus. Fusce tincidunt, nunc sit amet
          tempor malesuada, risus nulla interdum neque, venenatis ullamcorper
          tellus erat porttitor sem. Phasellus eget mollis massa. Proin faucibus
          mauris nec ultricies finibus. Mauris scelerisque ante felis, ac
          pretium purus vestibulum quis. Sed convallis orci id dignissim
          sodales. Aliquam porta ante lacinia leo porttitor lobortis. Nulla ante
          lorem, viverra nec mollis convallis, euismod quis tellus. Donec auctor
          facilisis dictum. Proin fringilla lectus at vehicula viverra. In hac
          habitasse platea dictumst. Fusce lobortis erat imperdiet dapibus
          tincidunt. Duis quam risus, facilisis ut libero nec, varius faucibus
          magna.
        </p>
        <p>
          Maecenas in auctor tortor, id lacinia est. Suspendisse eget lectus vel
          nibh dignissim tristique non eu nunc. Proin metus enim, ultricies sit
          amet semper id, rutrum vel nisi. Etiam varius tempus vehicula. Fusce
          pulvinar quam at nibh tempus euismod. Sed a maximus ipsum. Sed lacus
          mauris, malesuada sed viverra quis, finibus at augue. Donec tellus
          ipsum, euismod vitae rhoncus eu, aliquam id felis.
        </p>
        <p>
          Nam odio justo, mattis a semper ut, dignissim nec nulla. Fusce a
          placerat nunc. Duis efficitur quis felis pretium aliquet. Nam sagittis
          nibh ut ultricies ornare. Etiam sit amet erat ut arcu tempus efficitur
          eu id lectus. Curabitur non turpis consequat, semper libero quis,
          tincidunt magna. Nulla eget sem venenatis, facilisis lectus et,
          lacinia sem. Vestibulum purus enim, ornare sit amet magna vel,
          faucibus ultricies urna. Quisque sed libero efficitur, convallis metus
          in, finibus mauris. Mauris eu porta mauris, ut semper nisi.
        </p>
        <p>
          Aenean mauris justo, venenatis a velit ut, tincidunt accumsan velit.
          Mauris ut laoreet erat, quis tempus felis. Quisque finibus eleifend
          nulla, sit amet rutrum sem volutpat non. Integer pharetra nibh at ex
          aliquet, placerat dignissim diam euismod. Nunc eu sapien vitae dui
          condimentum rhoncus eget in est. Quisque a tellus a dui iaculis
          ultrices non eget felis. Vivamus vel condimentum orci, ac tincidunt
          odio. Donec nisi metus, sollicitudin ac felis quis, condimentum
          rhoncus erat.
        </p>
      </Container>
    </div>
  );
};

export default TermsConditions;
