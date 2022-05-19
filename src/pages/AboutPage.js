import { useParams } from "react-router-dom";

function AboutPage(){
  const params = useParams();
    console.log(params.xd);
  return (
    <p>Jesteśmy nowoczesną cukiernią zlokalizowaną na warszawskim Bemowie.</p>
  );
}

export default AboutPage;