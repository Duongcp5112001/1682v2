import { Button } from 'antd';
import React, { useRef } from 'react'
import TailwindButton from '~/components/atoms/TailwindButton';

const Contact = () => {
  const form = useRef<any>();

  // const sendEmail = (e: any) => {
  //   e.preventDefault();

  //   emailjs.sendForm(
  //     'service_h462wqo',
  //     'template_jzgdwtj', 
  //     form.current, 
  //     'yeXjsQGLVQ17JgQ5c'
  //   )
  //     .then((result: any) => {
  //         console.log(result.text);
  //         onSendMessage(true)
  //         form.current.reset()
  //     }, (error: any) => {
  //         console.log(error.text);
  //     });
  // };

  return (
    <section className='p-16 h-[75vh] mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg' id='contact'>
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row'>
          {/* Text */}
          <div 
            className='flex-1 flex justify-start items-center'
          >
            <div>
              <h4 className='text-xl uppercase text-accent font-medium mb-2 tracking-wide'>
                Get in touch
              </h4>
              <h2 className='text-[45px] lg:text-[90px] leading-none mb-12'>
                Let's work <br /> together!
              </h2>
            </div>
          </div>
          {/* form */}
          <form
            className='flex-1 border rounded-2xl flex flex-col gap-y-6 pb-24 p-6 items-start'
            ref={form}
            // onSubmit={sendEmail}
          >
            <input 
              className='bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all'
              type="text"
              placeholder='Your name'
              name="user_name"
            />
             <input 
              className='bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all'
              type="email"
              placeholder='Your email'
              name="user_email"
            />
            <textarea 
              className='bg-transparent border-b py-12 outline-none w-full placeholder:text-white focus:border-accent transition-all resize-none mb-12' 
              placeholder='Your message'
              name="message"
            >
            </textarea>
            <button type="submit" className='px-3 py-2 rounded-lg bg-gradient-to-r from-white to-white hover:from-green-400 hover:to-blue-500'>Send message</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact