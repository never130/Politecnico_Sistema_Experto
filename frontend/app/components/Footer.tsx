import { HeartIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-8 sm:mt-16 w-full">
      <div className="max-w-full sm:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
        {/* Desktop: Una línea horizontal */}
        <div className="hidden lg:flex flex-wrap justify-between items-center text-sm">
          
          {/* Sistema */}
          <div className="flex items-center text-blue-700">
            <HeartIcon className="h-4 w-4 text-blue-500 mr-2" />
            <span className="font-medium">Sistema Experto Respiratorio</span>
            <span className="mx-2 text-blue-300">•</span>
            <span className="text-blue-600">Tierra del Fuego, Argentina</span>
          </div>

          {/* Desarrollador */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Desarrollado por <span className="font-semibold text-blue-700">Ever Loza</span>
            </span>
            <a 
              href="https://everloza-porfolio.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium text-xs"
            >
              🌐 Portfolio
            </a>
          </div>

          {/* Institución */}
          <div className="text-gray-500 text-xs">
            <span className="font-medium">Desarrollo de Sistema de IA</span>
            <span className="mx-2">•</span>
            <span>Politécnico Malvinas Argentinas</span>
          </div>
        </div>

        {/* Tablet: Dos líneas */}
        <div className="hidden md:flex lg:hidden flex-col space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-blue-700">
              <HeartIcon className="h-4 w-4 text-blue-500 mr-2" />
              <span className="font-medium text-sm">Sistema Experto Respiratorio</span>
              <span className="mx-2 text-blue-300">•</span>
              <span className="text-blue-600 text-sm">Tierra del Fuego, Argentina</span>
            </div>
            <a 
              href="https://everloza-porfolio.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium text-xs"
            >
              🌐 Portfolio
            </a>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Desarrollado por <span className="font-semibold text-blue-700">Ever Loza</span>
            </span>
            <span className="text-gray-500 text-xs">
              Desarrollo de Sistema de IA • Politécnico Malvinas Argentinas
            </span>
          </div>
        </div>

        {/* Mobile: Una columna */}
        <div className="flex flex-col md:hidden space-y-2 text-xs sm:text-sm mt-2">
          <div className="flex items-center text-blue-700">
            <HeartIcon className="h-4 w-4 text-blue-500 mr-2" />
            <span className="font-medium text-sm">Sistema Experto Respiratorio</span>
          </div>
          <div className="text-blue-600 text-xs">Tierra del Fuego, Argentina</div>
          <div className="text-gray-600 text-sm">
            Desarrollado por <span className="font-semibold text-blue-700">Ever Loza</span>
          </div>
          <a 
            href="https://everloza-porfolio.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium text-sm"
          >
            🌐 Ver Portfolio
          </a>
          <div className="text-gray-500 text-xs">
            Desarrollo de Sistema de IA<br/>
            Politécnico Malvinas Argentinas
          </div>
        </div>
      </div>
    </footer>
  )
}
