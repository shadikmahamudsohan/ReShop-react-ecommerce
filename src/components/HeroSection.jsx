import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white">
      <div className="pt-6 bg-white sm:pt-8 ">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
                Design a better website template.
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center   
 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-10"
                  >
                    Free Download
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1723142481057-49e9a440c014?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="A plant in a pot"
                className="object-cover object-center w-full h-full sm:rounded-lg lg:rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
