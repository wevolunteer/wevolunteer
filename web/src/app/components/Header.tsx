import Image from 'next/image'
import appstorePic from "../assets/images/appstore.png"
import logoPic from "../assets/images/logo.png"
import playstorePic from "../assets/images/playstore.png"
import { APPLE_STORE_URL, GOOGLE_PLAY_URL } from '../consts'

export default function Header() {
  return (
    <div className="m-4 md:mx-10 flex items-center justify-between">
      <a href="/">
        <Image src={logoPic} alt="Attivati! L'app del volontariato del Trentino" width={182} />
      </a>

      <div className='flex items-center space-x-4'>
        <a href={APPLE_STORE_URL}>
          <Image src={appstorePic} alt="Scarica da App Store" className='w-[128px] hidden lg:block' />
        </a>

        <a href={GOOGLE_PLAY_URL}>
          <Image src={playstorePic} alt="Scarica da Play Store" className='w-[141px] hidden lg:block' />
        </a>
      </div>

    </div>
  )
}

