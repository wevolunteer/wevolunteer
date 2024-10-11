"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import appstorePic from "../assets/images/appstore.png";
import playstorePic from "../assets/images/playstore.png";
import { APPLE_STORE_URL, GOOGLE_PLAY_URL } from '../consts';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadDialog({ isOpen, onClose }: DownloadDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    console.log('isOpen', isOpen, dialogRef.current);
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);


  return (
    <dialog ref={dialogRef} className={`backdrop:bg-gray-50
      ${isOpen ? 'showing' : 'closing'} 
      fixed bg-white rounded-lg max-w-screen-sm shadow-lg border`} >
      <div className="relative text-center border-b py-2">
        <button className="absolute left-3 top-3" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 hover:text-gray-900" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 >Entra in Attivati!</h3>
      </div>
      <div className="p-4">
        <p className="mb-4 text-3xl">
          Vuoi partecipare o navigare tra altre esperienze di volontariato?
          Scarica l’APP e segui le attività delle tue organizzazioni preferite.
        </p>

        <p className='text-sm py-4'>
          Scarica l’app ed entra in Attivati!
        </p>

        <div className='flex items-center space-x-4'>
          <a href={APPLE_STORE_URL}>
            <Image src={appstorePic} alt="Scarica da App Store" width={128} />
          </a>
          <a href={GOOGLE_PLAY_URL}>
            <Image src={playstorePic} alt="Scarica da Play Store" width={141} />
          </a>
        </div>
      </div>
    </dialog>
  )
}