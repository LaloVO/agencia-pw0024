import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroProptech from '@/components/home/HeroProptech';
import DiferenciadoresProptech from '@/components/home/DiferenciadoresProptech';
import InmuebleInsignia from '@/components/home/InmuebleInsignia';
import ListadoPropiedades from '@/components/home/ListadoPropiedades';
import BioAgent from '@/components/home/BioAgent';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Asesor Demo | Asesoría Inmobiliaria y Créditos en Morelos</title>
        <meta
          name="description"
          content="Encuentra casas nuevas de un solo nivel y residenciales selectos en Cuautla y Morelos. Asesoría ágil y segura para todo tipo de créditos con Asesor Demo."
        />
      </Helmet>

      <Navbar />

      <main className="bg-background">
        <HeroProptech />
        <DiferenciadoresProptech />
        <InmuebleInsignia />
        <ListadoPropiedades />
        <BioAgent />
      </main>

      <Footer />
    </>
  );
};

export default Index;
