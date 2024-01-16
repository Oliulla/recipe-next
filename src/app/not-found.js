import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className='text-center'>
        <h1 className='text-3xl m-2'>Not found – 404!</h1>
        <div>
          <Link href="/" className='bg-cyan-700 text-white rounded-md p-2 mt-4 block'>Go back to Home</Link>
        </div>
      </div>
    </div>
  )
}