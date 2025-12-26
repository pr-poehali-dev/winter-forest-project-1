import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Snowflake = ({ delay, duration, left }: { delay: number; duration: number; left: string }) => {
  return (
    <div
      className="absolute text-white opacity-80 pointer-events-none"
      style={{
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <div className="animate-snowfall text-2xl">❄</div>
    </div>
  );
};

const Index = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; delay: number; duration: number; left: string }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      left: `${Math.random() * 100}%`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-purple-900">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} delay={flake.delay} duration={flake.duration} left={flake.left} />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="text-4xl animate-float">❄️</div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Зимняя Сказка</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-white/90 hover:text-white transition-colors font-medium">
              О нас
            </a>
            <a href="#gallery" className="text-white/90 hover:text-white transition-colors font-medium">
              Галерея
            </a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors font-medium">
              Контакты
            </a>
          </nav>
        </header>

        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Волшебство
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  Нового Года
                </span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Окунитесь в атмосферу сказочного зимнего леса, где Дед Мороз и Снегурочка готовят волшебные подарки
                для всех детей и взрослых!
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
                >
                  <Icon name="Gift" className="mr-2" size={20} />
                  Заказать подарок
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold px-8 py-6 text-lg backdrop-blur-sm transition-all hover:scale-105"
                >
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Узнать больше
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              <Card className="relative overflow-hidden border-4 border-white/20 backdrop-blur-md bg-white/10 shadow-2xl rounded-3xl">
                <div className="aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src="https://cdn.poehali.dev/projects/19309753-f764-4683-99d6-3c7295d9a35c/files/7fe970d2-b64a-4c0c-9efe-ed8017464de2.jpg"
                    alt="Дед Мороз и Снегурочка в зимнем лесу"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">Наши герои</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 backdrop-blur-md bg-white/10 border-2 border-white/20 hover:border-purple-400/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group">
                <div className="text-7xl mb-4 group-hover:animate-float">🎅</div>
                <h4 className="text-2xl font-bold text-white mb-3">Дед Мороз</h4>
                <p className="text-white/80 leading-relaxed">
                  Добрый волшебник с белой бородой, который дарит радость и исполняет самые заветные желания детей со
                  всего мира.
                </p>
              </Card>
              <Card className="p-8 backdrop-blur-md bg-white/10 border-2 border-white/20 hover:border-blue-400/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group">
                <div className="text-7xl mb-4 group-hover:animate-float">👸</div>
                <h4 className="text-2xl font-bold text-white mb-3">Снегурочка</h4>
                <p className="text-white/80 leading-relaxed">
                  Внучка Деда Мороза, прекрасная снежная девушка, которая помогает дедушке развозить подарки и создает
                  праздничное настроение.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section id="gallery" className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center animate-fade-in">
              Зимние чудеса
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '🎄', title: 'Новогодняя ёлка', desc: 'Украшенная игрушками и гирляндами' },
                { icon: '🎁', title: 'Подарки', desc: 'Для каждого найдется что-то особенное' },
                { icon: '⛷️', title: 'Зимние забавы', desc: 'Катание на санках и коньках' },
                { icon: '🏔️', title: 'Снежные горы', desc: 'Величественные заснеженные вершины' },
                { icon: '🦌', title: 'Северные олени', desc: 'Верные помощники Деда Мороза' },
                { icon: '✨', title: 'Волшебство', desc: 'Сказка становится реальностью' },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-6 backdrop-blur-md bg-white/10 border-2 border-white/20 hover:border-orange-400/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-6xl mb-4 group-hover:animate-float">{item.icon}</div>
                  <h5 className="text-xl font-bold text-white mb-2">{item.title}</h5>
                  <p className="text-white/70">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="container mx-auto px-4 py-20 pb-32">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
              Напишите Деду Морозу
            </h3>
            <Card className="p-8 md:p-12 backdrop-blur-md bg-white/10 border-2 border-white/20">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-purple-400 transition-colors backdrop-blur-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-purple-400 transition-colors backdrop-blur-sm"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Ваше желание..."
                    rows={5}
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-purple-400 transition-colors resize-none backdrop-blur-sm"
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-6 text-lg shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105"
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить письмо
                </Button>
              </form>
            </Card>
          </div>
        </section>

        <footer className="border-t border-white/20 backdrop-blur-md bg-white/5">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/70">© 2024 Зимняя Сказка. Все права защищены.</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <Icon name="Facebook" size={20} />
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <Icon name="Instagram" size={20} />
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <Icon name="Twitter" size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;