import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Pokemon = ({ data }) => {
  const router = useRouter();

  // Esta validacion no es necesaria si fallback = 'blocking'
  if (router.isFallback) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>
        {data.name} #{data.id}
      </h1>
      <Image
        src={data.sprites.front_default}
        alt={data.name}
        width={400}
        height={400}
      />
      <Link href="/">Volver al inicio</Link>
    </div>
  );
};

export default Pokemon;

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );
  const data = await response.json();
  return { props: { data } };
};

export const getStaticPaths = () => {
  const paths = [{ params: { id: "1" } }];

  return {
    paths,
    // fallback: false // Solo genera html para las rutas definidas en paths
    fallback: true, // Para mejorar el tiempo de build
    // fallback: 'blocking' // Se utiliza para esperar la respuesta de getStaticProps antes de renderizar html
  };
};

// export const getServerSideProps = async ({ params }) => {
//   const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${params.id}`
//   );
//   const data = await response.json();
//   return { props: { data } };
// };
