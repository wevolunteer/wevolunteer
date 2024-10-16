"use client"

import Image from 'next/image';
import { useState } from 'react';
import heroPic from "./assets/images/hero.png";
import skateGirlPic from "./assets/images/skate-girl.png";
import personPic from "./assets/images/walk-person.png";
import DownloadDialog from './components/DownloadDialog';
import { APPOINTMENT_URL, INFO_URL, NEWSLETTER_URL, OPPORTUNITY_URL } from './consts';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="flex flex-col relative lg:gap-10">
      <section className="relative h-[470px] lg:h-[570px]">
        <Image src={heroPic} alt="E nata: Attivati!" className="absolute inset-0 w-full h-[470px] lg:h-[570px] object-cover" />

        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 lg:px-16  lg:text-left text-center gap-2 max-w-screen-sm">
          <h1 className="text-5xl font-regular">È nata: Attivati!</h1>
          <div className="text-5xl font-regular ">
            La nostra bacheca del
          </div>

          <div className="text-5xl font-regular ">
            volontariato Trentino
          </div>
        </div>
      </section>

      <section className='max-w-screen-lg mx-auto'>
        <div className="flex flex-col lg:flex-row lg:gap-4 w-full ">
          <div className='flex-1 px-4 py-8 bg-secondary flex flex-col gap-4  items-start relative'>
            <h2 className='text-3xl'>
              Vuoi fare <br />volontariato?
            </h2>
            <p className='flex-1 pr-24'>
              In quale ambito vorresti attivarti? Ce n’è per tutti i gusti! <br />Cominciamo da qui…
            </p>
            <a onClick={() => setShowModal(true)} className='mt-6 text-sm bg-primary  text-white  py-2 px-10 text-center cursor-pointer'>
              Scarica l’APP e inizia subito
            </a>
            <Image src={personPic} alt="person" className="absolute bottom-0 right-0 h-[224px] w-[107px]" />
          </div>

          <div className='flex-1 px-4 py-8 bg-primary text-white flex flex-col gap-4 items-start'>
            <h2 className='text-3xl'>
              Sei <br /> un&#39;organizzazione?
            </h2>
            <p className='flex-1'>
              Stai cercando nuove volontarie e volontari da attivare nei tuoi servizi, progetti e/o eventi?
            </p>
            <a href={OPPORTUNITY_URL} className='mt-6 text-sm bg-secondary text-primary  py-2 px-10 text-center'>
              Carica la tua richiesta
            </a>
          </div>
        </div>
      </section>

      <section className='max-w-screen-lg mx-auto mt-5 '>
        <div className="flex flex-col gap-4 w-full relative items-start px-4 lg:px-0 lg:pr-32">
          <h2 className='text-3xl '>Non ti bastano le informazioni che hai trovato qui? Incontriamoci di persona!</h2>

          <p>
            Il nostro servizio di orientamento ti aiuta a trovare l’esperienza di volontariato più vicina alle tue passioni e competenze, attraverso un appuntamento individuale con noi, online oppure in presenza a Trento.
          </p>
          <p>
            Se hai meno di 35 anni, oltre al volontariato in Trentino, possiamo anche aiutarti per il volontariato all’estero. Grazie alla collaborazione con l’associazione InCo-Interculturalità e Comunicazione scoprirai le numerose opportunità per partire con un progetto di volontariato internazionale.
          </p>

          <div className='flex gap-4'>
            <a href={INFO_URL} className='mt-6 text-sm bg-primary  text-white  py-2 px-10 text-center'>
              Richiedi più informazioni
            </a>
            <a href={APPOINTMENT_URL} className='mt-6 text-sm bg-secondary text-primary  py-2 px-10 text-center'>
              Prenota un appuntamento
            </a>
          </div>
          <Image src={skateGirlPic} alt="person" className="absolute hidden lg:block bottom-0 right-0 max-h-full w-auto" />
        </div>
      </section>

      <div className="w-full">

        <section className='max-w-screen-lg mx-auto my-20 '>
          <div className='bg-[#d9d9d9] flex items-center flex-col lg:flex-row py-8 px-4 gap-4 '>
            <div className="flex-1">
              <h2 className='text-3xl mb-2'>Resta aggiornat*</h2>
              <p>
                Iscriviti alla newsletter del CSV di Trento e non perdere nessuna notizia, curiosità, opportunità di volontariato...
              </p>
            </div>

            <a href={NEWSLETTER_URL} className='text-sm  bg-secondary text-primary  py-2 px-10 text-center'>
              Iscriviti alla newsletter
            </a>
          </div>
        </section>
      </div>

      <DownloadDialog isOpen={showModal} onClose={() => setShowModal(false)} />

    </main >
  );
}
