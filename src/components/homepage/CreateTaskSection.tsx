'use client'
import Image from "next/image"

const CreatTaskSection: React.FC = () => {
    return (
        <div className={'relative w-full h-96'}>
          <Image src="/img/home_img/home_page_img_3.png" alt="Image 3" width={150} height={400} className='absolute top-20 left-0'/>
          <Image src="/img/home_img/home_page_img_4.png" alt="Image 4" width={400} height={100} className='absolute top-0 right-0'/>
        <h2 className='text-green-900 text-5xl w-6/12 text-center absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-extrabold'>Schedule reliable assistance for household chores</h2>
        <div className='absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-16'>
          <form action="" className='flex align-center'>
              <input type="text" placeholder="What kind of task do you need help with?" className='focus:outline-none rounded-xl text-base font-semibold rounded-r-none inline w-4/5 border-green-900 border-2 py-4 px-4'/>
              <button type='submit' className='text-base rounded-xl rounded-l-none border-green-900 border-2 border-l-0 bg-lime-600 w-1/5 text-lg font-bold'>Create Task</button>
          </form>
        </div>
      </div>
    )
}
export default CreatTaskSection;