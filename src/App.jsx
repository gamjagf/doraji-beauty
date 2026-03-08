import React, { useState, useEffect, useRef } from 'react';

// FadeIn component using Intersection Observer
const FadeInSection = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans bg-[#F8F4EC] text-slate-800 selection:bg-[#C9A84C] selection:text-white">
      {/* 1. Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#" className={`text-2xl font-bold tracking-widest ${scrolled ? 'text-[#3B4A8C]' : 'text-white'}`}>
            DORAJI
          </a>
          
          <div className="hidden md:flex space-x-8">
            {['브랜드스토리', '제품', '성분', '후기'].map((item) => (
              <a key={item} href={`#${item}`} className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C9A84C] ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>
                {item}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className={`w-6 h-6 ${scrolled ? 'text-[#3B4A8C]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ${mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="flex flex-col px-4 py-2">
            {['브랜드스토리', '제품', '성분', '후기'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-[#3B4A8C] font-medium border-b border-gray-100 last:border-0"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {/* 2. Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B4A8C] via-[#2A356A] to-[#1A2247] z-0">
            <div className="absolute inset-0 opacity-30 bg-[url('/images/hero_bg.png')] bg-cover bg-center mix-blend-overlay"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
            <FadeInSection>
              <h2 className="text-[#C9A84C] text-sm md:text-xl font-medium tracking-[0.3em] mb-6">PREMIUM HERBAL COSMETICS</h2>
            </FadeInSection>
            <FadeInSection delay={200}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
                자연이 빚은 깊은 미,<br className="hidden md:block" />
                <span className="font-bold mt-2 md:mt-0 inline-block">한방의 순수함</span>
              </h1>
            </FadeInSection>
            <FadeInSection delay={400}>
              <p className="text-white/80 text-base md:text-xl font-light mb-12 max-w-2xl mx-auto px-4">
                수천 년의 지혜를 담은 도라지 추출물로<br className="md:hidden" /> 당신의 피부 본연의 아름다움을 깨웁니다.
              </p>
            </FadeInSection>
            <FadeInSection delay={600}>
              <button className="bg-[#C9A84C] text-white px-8 md:px-12 py-4 rounded-full font-medium tracking-wider hover:bg-white hover:text-[#3B4A8C] transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                지금 경험하기
              </button>
            </FadeInSection>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-white/50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* 3. Brand Story */}
        <section id="브랜드스토리" className="py-24 md:py-32 px-4 max-w-7xl mx-auto scroll-mt-20">
          <FadeInSection>
            <div className="text-center mb-16 md:mb-24">
              <h3 className="text-[#C9A84C] font-semibold tracking-[0.2em] text-sm mb-3">BRAND STORY</h3>
              <h2 className="text-3xl md:text-5xl font-bold text-[#3B4A8C] mb-6">도라지의 숨겨진 생명력</h2>
              <div className="w-16 h-1 bg-[#C9A84C] mx-auto mb-8"></div>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
                혹독한 겨울을 이겨내고 피어나는 도라지는<br className="hidden md:block"/> 
                피부 깊숙이 수분을 채우고 자생력을 길러줍니다.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "깊은 보습",
                desc: "히알루론산보다 뛰어난 수분 보유력으로 24시간 촉촉함을 유지합니다.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              },
              {
                title: "항산화 에너지",
                desc: "사포닌 성분이 피부 장벽을 강화하고 외부 자극으로부터 보호합니다.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              },
              {
                title: "피부 진정",
                desc: "예민해진 피부를 빠르게 진정시키고 맑은 피부톤을 선사합니다.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              }
            ].map((item, idx) => (
              <FadeInSection key={idx} delay={idx * 150} className="h-full">
                <div className="bg-white p-10 h-full rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-[#F8F4EC]">
                  <div className="w-20 h-20 mx-auto bg-[#F8F4EC] rounded-full flex items-center justify-center mb-8 text-[#3B4A8C]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-[#3B4A8C] mb-4 text-center">{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-center font-light">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* 4. Products Lineup */}
        <section id="제품" className="py-24 md:py-32 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <FadeInSection>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
                <div>
                  <h3 className="text-[#C9A84C] font-semibold tracking-[0.2em] text-sm mb-3">BEST PRODUCTS</h3>
                  <h2 className="text-3xl md:text-5xl font-bold text-[#3B4A8C]">시그니처 라인업</h2>
                </div>
                <button className="hidden md:inline-flex items-center text-[#3B4A8C] font-medium hover:text-[#C9A84C] transition-colors mt-4 md:mt-0 group">
                  전체보기 
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {[
                { name: "도라지 수분 에센스", tag: "BEST", img: "/images/product_essence.png", price: "45,000" },
                { name: "한방 진정 크림", tag: "NEW", img: "/images/product_cream.png", price: "52,000" },
                { name: "도라지 클렌징 폼", tag: null, img: "/images/product_cleanser.png", price: "28,000" },
                { name: "브라이트닝 세럼", tag: null, img: "/images/product_serum.png", price: "68,000" }
              ].map((product, idx) => (
                <FadeInSection key={idx} delay={idx * 150}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden mb-6 bg-[#F8F4EC] aspect-[4/5] flex items-center justify-center">
                      {product.tag && (
                        <span className="absolute top-4 left-4 z-10 bg-[#C9A84C] text-white text-xs font-bold px-4 py-1.5 tracking-wider">
                          {product.tag}
                        </span>
                      )}
                      <img 
                        src={product.img} 
                        alt={product.name}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-white/90 backdrop-blur text-[#3B4A8C] py-3 font-medium hover:bg-[#3B4A8C] hover:text-white transition-colors">
                          장바구니 담기
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-medium text-gray-800 mb-2 group-hover:text-[#3B4A8C] transition-colors">{product.name}</h4>
                      <p className="text-[#C9A84C] font-semibold">₩ {product.price}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Highlight */}
        <section id="성분" className="py-24 md:py-32 overflow-hidden bg-[#3B4A8C] text-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <div className="lg:w-1/2 w-full order-2 lg:order-1">
                <FadeInSection>
                  <div className="relative overflow-hidden aspect-[4/5] lg:aspect-square">
                    <img 
                      src="/images/ingredient_doraji.png" 
                      alt="도라지 추출물"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#3B4A8C]/20 mix-blend-overlay"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/20 rounded-full"></div>
                    <div className="absolute -top-10 -right-10 w-60 h-60 border border-white/10 rounded-full"></div>
                  </div>
                </FadeInSection>
              </div>
              <div className="lg:w-1/2 w-full order-1 lg:order-2">
                <FadeInSection delay={200}>
                  <h3 className="text-[#C9A84C] font-semibold tracking-[0.2em] text-sm mb-6">CORE INGREDIENT</h3>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                    농축된 자연의 힘,<br />
                    <span className="font-light italic mt-2 inline-block">프리미엄 도라지 추출물</span>
                  </h2>
                  <div className="space-y-6 text-white/80 font-light text-lg leading-relaxed mb-12">
                    <p>
                      청정 지역에서 5년 이상 자란 도라지만을 엄선하여 특유의 사포닌 성분을 온전히 담아냈습니다.
                    </p>
                    <p>
                      독자적인 저온 추출 공법으로 열에 약한 유효 성분의 파괴를 최소화하여 피부에 생명력을 불어넣습니다.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div className="border border-white/20 p-6 md:p-8 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <span className="block text-4xl md:text-5xl font-bold text-[#C9A84C] mb-2">98<span className="text-2xl">%</span></span>
                      <span className="text-sm md:text-base text-white/70">자연 유래 성분</span>
                    </div>
                    <div className="border border-white/20 p-6 md:p-8 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <span className="block text-4xl md:text-5xl font-bold text-[#C9A84C] mb-2">24<span className="text-2xl">h</span></span>
                      <span className="text-sm md:text-base text-white/70">피부 보습 지속</span>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Review */}
        <section id="후기" className="py-24 md:py-32 bg-[#F8F4EC] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <FadeInSection>
              <div className="text-center mb-16 md:mb-24">
                <h3 className="text-[#C9A84C] font-semibold tracking-[0.2em] text-sm mb-3">CUSTOMER REVIEWS</h3>
                <h2 className="text-3xl md:text-5xl font-bold text-[#3B4A8C]">고객들이 증명하는 변화</h2>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              {[
                { name: "김*진", prod: "도라지 수분 에센스", text: "속당김이 심했는데 이 에센스 쓰고 나서는 하루종일 촉촉해요. 향도 은은한 한방 향이라 기분이 좋아집니다." },
                { name: "이*영", prod: "한방 진정 크림", text: "피부가 예민한 편인데 트러블 없이 진정이 잘 되네요. 발림성도 너무 부드럽고 고급스럽습니다." },
                { name: "박*희", prod: "도라지 클렌징 폼", text: "세안 후에도 당기지 않는 클렌징폼은 처음이에요. 거품도 쫀쫀하고 세정력도 우수합니다. 재구매 의사 100%입니다." }
              ].map((review, idx) => (
                <FadeInSection key={idx} delay={idx * 200} className="h-full">
                  <div className="bg-white p-8 md:p-10 shadow-sm h-full flex flex-col relative top-0 hover:-top-3 transition-all duration-500 border border-gray-100">
                    <div className="flex justify-center md:justify-start text-[#C9A84C] mb-6">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg key={star} className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-8 flex-grow leading-loose font-light">"{review.text}"</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-auto">
                      <div className="w-12 h-12 bg-[#F8F4EC] text-[#3B4A8C] rounded-full flex items-center justify-center font-bold text-lg">
                        {review.name[0]}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-[#3B4A8C]">{review.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{review.prod}</p>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="bg-[#1A2247] text-white/60 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold tracking-[0.3em] text-white mb-6">DORAJI</h2>
            <p className="mb-8 font-light max-w-sm leading-relaxed text-sm">
              전통의 지혜와 현대의 과학이 만나 탄생한<br/> 프리미엄 한방 코스메틱 브랜드.
            </p>
            <div className="flex space-x-4">
              {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-white transition-all text-sm">
                  <span className="sr-only">{social}</span>
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide">고객센터</h4>
            <ul className="space-y-4 font-light text-sm">
              <li className="text-xl text-white">1588-0000</li>
              <li>평일 09:00 - 18:00</li>
              <li>점심 12:00 - 13:00</li>
              <li>주말 및 공휴일 휴무</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide">기업정보</h4>
            <ul className="space-y-4 font-light text-sm">
              <li><a href="#" className="hover:text-white transition-colors">브랜드 소개</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-medium">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-white transition-colors">제휴문의</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-xs font-light text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 DORAJI Beauty. All rights reserved.</p>
          <p className="text-white/40">서울특별시 강남구 테헤란로 123 도라지빌딩 15층 | 대표자: 김도라지</p>
        </div>
      </footer>
    </div>
  );
}
