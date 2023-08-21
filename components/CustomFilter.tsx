'use client'
import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CustomFIlterProps } from '@/types'
import { Listbox, Transition } from '@headlessui/react'



const CustomFilter = ({ title, options }: CustomFIlterProps) => {
  const [selected, setSelected] = useState(options[0])
  const router = useRouter()

  const handleUpdateSearchParams = (e: { title: string, value: string }) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(title, e.value);
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    return router.push(newPathname);
  }
  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e)
          handleUpdateSearchParams(e)
        }}
      >
        <div className='relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image
              className='ml-24 object-contain'
              alt='chevron up down'
              width={20}
              height={20}
              src='/chevron-up-down.svg'
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              className='custom-filter__options'
            >
              {options.map((option) => (
                <Listbox.Option
                  value={option}
                  key={option.title}
                  className={({ active }) => `relative cursor-default select-none px-4 py-2 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.title}</span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter