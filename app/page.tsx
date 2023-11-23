import Image from 'next/image'
import ChoicesForm from './_components/choicesForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-4 w-full">
      <div className="flex items-center w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="neural" className="w-10 mx-4">
          <path d="M55,39a7,7,0,1,0-6.9-8H37.9a6,6,0,1,0,0,2H48.1a6.7,6.7,0,0,0,1,2.8L35.8,47.4A5.7,5.7,0,0,0,32,46a6.5,6.5,0,0,0-3.6,1.2L18.2,37.4A9.2,9.2,0,0,0,20,32a8.8,8.8,0,0,0-1.7-5.3l9.2-8.3A7.1,7.1,0,0,0,32,20a7,7,0,1,0-7-7,6.7,6.7,0,0,0,1.2,3.9L17,25.3A9.1,9.1,0,0,0,11,23a9,9,0,0,0,0,18,9.2,9.2,0,0,0,5.8-2.1L27,48.6A6.7,6.7,0,0,0,26,52a6,6,0,0,0,12,0,5.6,5.6,0,0,0-.9-3.1L50.4,37.3a7.6,7.6,0,0,0,2.3,1.3L50.9,48A5,5,0,1,0,56,53a4.9,4.9,0,0,0-3.1-4.6L54.7,39ZM32,36a4,4,0,1,1,4-4A4,4,0,0,1,32,36ZM54,53a3,3,0,1,1-3-3A2.9,2.9,0,0,1,54,53ZM32,8a5,5,0,1,1-5,5A5,5,0,0,1,32,8ZM11,39a7,7,0,1,1,7-7A7,7,0,0,1,11,39ZM32,56a4,4,0,1,1,4-4A4,4,0,0,1,32,56ZM50,32a5,5,0,1,1,5,5A5,5,0,0,1,50,32Z" data-name="Neural Network" fill="#ffffff"></path>
        </svg>
        <span className="font-bold text-white text-lg">
            ChoiceFork.ai
        </span>
      </div>
      <ChoicesForm />
    </main>
  )
}
