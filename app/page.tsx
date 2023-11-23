import Image from 'next/image'
import ChoicesForm from './_components/choicesForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-4 w-full">
      <ChoicesForm />
    </main>
  )
}
