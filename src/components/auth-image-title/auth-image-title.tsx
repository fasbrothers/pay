
type AuthImageTitleProps = {
  logo: string,
  title: string
}

export const AuthImageTitle = ({logo, title}: AuthImageTitleProps) => {
  return (
    <>
      <div className="hidden md:block">
					<img src={logo} alt='logo' className='w-1/4 h-1/4' />
			</div>
				<h2 className='my-3 text-2xl font-medium md:mt-10 md:mb-8 md:font-bold md:text-4xl text-center md:text-left'>{title}</h2>
    </>
  )
}

