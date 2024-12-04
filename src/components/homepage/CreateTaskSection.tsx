'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreatTaskSection: React.FC = () => {
    const router = useRouter();
    const [task_content, setTaskContent] = useState('');
    const handleTaskSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(task_content) {
        router.push(`/create-task?task=${encodeURIComponent(task_content)}`);
      }
    }

    return (
      <div className={'relative w-full h-96 x-sm:h-60 sm:h-72 md:h-80 lg:h-96 2sm:h-56'}>
          <Image src="/img/home_img/home_page_img_3.png" alt="Image 3" width={150} height={400} className='absolute top-20 left-0 lg:block 2sm:hidden'/>
          <Image src="/img/home_img/home_page_img_4.png" alt="Image 4" width={400} height={100} className='absolute top-0 right-0 1200:block 2sm:hidden'/>
        <h2 className='text-green-900 lg:text-5xl md:text-4xl sm:text-3xl x-sm:text-2xl 2sm:text-base w-6/12 text-center absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-extrabold'>Schedule reliable assistance for household chores</h2>
        <div className='absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-16'>
          <form onSubmit={handleTaskSubmit} className='flex align-center'>
              <input 
                type="text"
                placeholder="What kind of task do you need help with?"
                value={task_content}
                onChange={(e) => setTaskContent(e.target.value)}
                required
                maxLength={50}
                className='focus:outline-none rounded-xl md:text-base x-sm:text-xs 2sm:text-[8px] font-semibold rounded-r-none inline w-4/5 border-green-900 border-2 py-4 px-4'/>
              <button type='submit' className='rounded-xl rounded-l-none border-green-900 border-2 border-l-0 bg-lime-600 w-1/5 md:text-lg x-sm:text-sm 2sm:text-[8px] font-bold'>Create Task</button>
          </form>
        </div>
      </div>
    )
}
export default CreatTaskSection;