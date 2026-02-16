import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Скалодром</h3>
            <p className="text-gray-400">
              Ваш путь к новым высотам начинается здесь
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/groups" className="hover:text-white transition-colors">
                  Группы
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Стоимость
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Правила посещения
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
              <li>Email: info@climbing-gym.ru</li>
              <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Скалодром. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
