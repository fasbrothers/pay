import hero from '../../assets/hero.png'

export const SignSidebar = () => {
  return (
    <div className="bg-blue-600 w-1/2 h-screen">
      <div className='flex justify-center items-center h-full'>
      <img src={hero} alt="hero" className="w-4/6 h-3/5" />
      </div>
    </div>
  )
}
