import React from 'react'

type AuthImageTitleProps = {
  logo: string,
  title: string
}

export const AuthImageTitle = ({logo, title}: AuthImageTitleProps) => {
  return (
    <>
      <div>
					<img src={logo} alt='logo' className='w-1/4 h-1/4' />
			</div>
				<h2 className='mt-10 mb-8 font-bold text-4xl'>{title}</h2>
    </>
  )
}

