import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroProptech from '@/components/home/HeroProptech';
import DiferenciadoresProptech from '@/components/home/DiferenciadoresProptech';
import InmuebleInsignia from '@/components/home/InmuebleInsignia';
import ListadoPropiedades from '@/components/home/ListadoPropiedades';
import BioLarissa from '@/components/home/BioLarissa';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Larissa García | Asesoría Inmobiliaria y Créditos en Morelos</title>
        <meta
          name="description"
          content="Encuentra casas nuevas de un solo nivel y residenciales selectos en Cuautla y Morelos. Asesoría ágil y segura para todo tipo de créditos con Larissa García."
        />
      </Helmet>

      <Navbar />

      <main className="bg-background">
        <HeroProptech />
        <DiferenciadoresProptech />
        <InmuebleInsignia />
        <ListadoPropiedades />
        <BioLarissa />
      </main>

      <Footer />
    </>
  );
};

export default Index;
