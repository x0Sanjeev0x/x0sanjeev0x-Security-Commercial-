
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Lock, 
  Globe, 
  Cpu, 
  Menu, 
  X,
  ChevronRight,
  ArrowRight,
  Check
} from 'lucide-react';
import SecurityVisual from './components/SecurityVisual';
import FeatureCard from './components/FeatureCard';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

// Comprehensive Translation Dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    heroTag: "New Standard in Enterprise Security",
    heroTitle: "There is a Better Way to Secure.",
    heroDesc: "We protect billion-dollar data through multi-layered architecture and autonomous monitoring.",
    pilotBtn: "Request Pilot Access",
    methodologyBtn: "Watch Methodology",
    partnersTitle: "Trusted by Industry Leaders",
    featuresTitle: "Architected for Resilience. Built for Scale.",
    featuresDesc: "Security shouldn't be a bottleneck. Our platform integrates seamlessly into your DevOps stack while maintaining the highest security posture.",
    connectBtn: "Let's Connect",
    platform: "Platform",
    solutions: "Solutions",
    company: "Company",
    footerDesc: "Empowering enterprise security through advanced intelligence and automated protection.",
    ctaTitle: "Protect your assets with the best.",
    ctaDesc: "Join the elite organizations that trust x0sanjeev0x with their most sensitive infrastructure.",
    demoBtn: "Schedule a Demo",
    whitepaperBtn: "Download Whitepaper",
    globalLabel: "Global / English",
    monitoring: "Continuous Monitoring",
    monitoringDesc: "Real-time observation of your infrastructure, identifying vulnerabilities before they manifest.",
    compliance: "Regulatory Compliance",
    complianceDesc: "Automated reporting and adherence tracking for GDPR, HIPAA, and SOC2 standards.",
    zeroTrust: "Zero Trust Access",
    zeroTrustDesc: "Identity-first security protocols ensuring data is only accessible to verified entities.",
    adaptive: "Adaptive Protection",
    adaptiveDesc: "AI-driven systems that learn from emerging threats to harden your perimeter automatically.",
    deepDiveTitle: "Eliminate the blind spots in your cloud ecosystem.",
    deepDiveDesc: "Modern infrastructure is complex. x0sanjeev0x maps every node, every connection, and every byte of data to ensure zero leakage and full visibility.",
    identityLabel: "Identity Resolution",
    identityDetail: "Granular control over user permissions and machine-to-machine auth.",
    threatLabel: "Threat Modeling",
    threatDetail: "Proactive simulation of attack vectors tailored to your architecture.",
    quantumLabel: "Quantum Readiness",
    quantumDetail: "Encryption standards prepared for the next era of computing.",
    liveAnalytics: "Live Analytics",
    systemHealthy: "System Healthy",
    riskScore: "Risk Score",
    uptime: "Uptime",
    usage: "Usage",
    resources: "Resources",
    legal: "Legal",
    social: "Social",
    selectLang: "Select Language",
    langSub: "Choose your preferred localization."
  },
  ta: {
    heroTag: "நிறுவன பாதுகாப்பில் புதிய தரம்",
    heroTitle: "பாதுகாக்க ஒரு சிறந்த வழி உள்ளது.",
    heroDesc: "பல அடுக்கு கட்டமைப்பு மற்றும் தன்னாட்சி கண்காணிப்பு மூலம் பில்லியன் டாலர் தரவை நாங்கள் பாதுகாக்கிறோம்.",
    pilotBtn: "பைலட் அணுகலைக் கோருங்கள்",
    methodologyBtn: "முறையைப் பார்க்கவும்",
    partnersTitle: "தொழில்முறை தலைவர்களால் நம்பப்படுகிறது",
    featuresTitle: "தாங்கும் திறன் கொண்டதாக வடிவமைக்கப்பட்டுள்ளது. வளர்ச்சிக்காக உருவாக்கப்பட்டது.",
    featuresDesc: "பாதுகாப்பு ஒரு தடையாக இருக்கக்கூடாது. மிக உயர்ந்த பாதுகாப்பு நிலையைப் பராமரிக்கும் அதே வேளையில் எங்கள் தளம் உங்கள் DevOps ஸ்டேக்கில் தடையின்றி ஒருங்கிணைக்கிறது.",
    connectBtn: "இணைவோம்",
    platform: "தளம்",
    solutions: "தீர்வுகள்",
    company: "நிறுவனம்",
    footerDesc: "மேம்பட்ட நுண்ணறிவு மற்றும் தானியங்கி பாதுகாப்பு மூலம் நிறுவன பாதுகாப்பை மேம்படுத்துதல்.",
    ctaTitle: "சிறந்தவற்றுடன் உங்கள் சொத்துக்களைப் பாதுகாக்கவும்.",
    ctaDesc: "தங்கள் மிக முக்கியமான உள்கட்டமைப்பை x0sanjeev0x உடன் நம்பும் உயரடுக்கு அமைப்புகளில் சேருங்கள்.",
    demoBtn: "ஒரு டெமோவைத் திட்டமிடுங்கள்",
    whitepaperBtn: "வெள்ளை அறிக்கையைப் பதிவிறக்கவும்",
    globalLabel: "உலகளாவிய / தமிழ்",
    monitoring: "தொடர்ச்சியான கண்காணிப்பு",
    monitoringDesc: "உங்கள் உள்கட்டமைப்பின் நிகழ்நேர கண்காணிப்பு, பாதிப்புகள் வெளிப்படுவதற்கு முன்பே அவற்றைக் கண்டறிதல்.",
    compliance: "ஒழுங்குமுறை இணக்கம்",
    complianceDesc: "GDPR, HIPAA மற்றும் SOC2 தரநிலைகளுக்கான தானியங்கி அறிக்கை மற்றும் பின்பற்றுதல் கண்காணிப்பு.",
    zeroTrust: "ஜீரோ டிரஸ்ட் அணுகல்",
    zeroTrustDesc: "சரிபார்க்கப்பட்ட நிறுவனங்களுக்கு மட்டுமே தரவை அணுக முடியும் என்பதை உறுதிப்படுத்தும் அடையாள-முதல் பாதுகாப்பு நெறிமுறைகள்.",
    adaptive: "தகவமைப்பு பாதுகாப்பு",
    adaptiveDesc: "உங்கள் சுற்றளவை தானாகவே கடினப்படுத்த வளர்ந்து வரும் அச்சுறுத்தல்களிலிருந்து கற்கும் AI-உந்துதல் அமைப்புகள்.",
    deepDiveTitle: "உங்கள் கிளவுட் சுற்றுச்சூழல் அமைப்பில் உள்ள குருட்டுப் புள்ளிகளை அகற்றவும்.",
    deepDiveDesc: "நவீன உள்கட்டமைப்பு சிக்கலானது. x0sanjeev0x ஒவ்வொரு முனை, ஒவ்வொரு இணைப்பு மற்றும் ஒவ்வொரு பைட் தரவையும் வரைபடமாக்குகிறது.",
    identityLabel: "அடையாளத் தீர்வு",
    identityDetail: "பயனர் அனுமதிகள் மற்றும் இயந்திர அங்கீகாரத்தின் மீது சிறுமணி கட்டுப்பாடு.",
    threatLabel: "அச்சுறுத்தல் மாடலிங்",
    threatDetail: "உங்கள் கட்டமைப்பிற்கு ஏற்ப அச்சுறுத்தல் திசையன்களின் செயலில் உருவகப்படுத்துதல்.",
    quantumLabel: "குவாண்டம் தயார்நிலை",
    quantumDetail: "கம்ப்யூட்டிங்கின் அடுத்த சகாப்தத்திற்கு தயாராக உள்ள குறியாக்க தரநிலைகள்.",
    liveAnalytics: "நேரடி பகுப்பாய்வு",
    systemHealthy: "கணினி ஆரோக்கியமானது",
    riskScore: "ஆபத்து மதிப்பெண்",
    uptime: "இயக்க நேரம்",
    usage: "பயன்பாடு",
    resources: "ஆதாரங்கள்",
    legal: "சட்டம்",
    social: "சமூக",
    selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்",
    langSub: "உங்களுக்கு விருப்பமான உள்ளூர்மயமாக்கலைத் தேர்ந்தெடுக்கவும்."
  },
  ru: {
    heroTag: "Новый стандарт корпоративной безопасности",
    heroTitle: "Есть лучший способ обеспечить безопасность.",
    heroDesc: "Мы защищаем данные на миллиарды долларов с помощью многоуровневой архитектуры и автономного мониторинга.",
    pilotBtn: "Запросить пилотный доступ",
    methodologyBtn: "Посмотреть методологию",
    partnersTitle: "Нам доверяют лидеры отрасли",
    featuresTitle: "Спроектировано для отказоустойчивости. Построено для масштабирования.",
    featuresDesc: "Безопасность не должна быть узким местом. Наша платформа легко интегрируется в ваш DevOps-стек, сохраняя при этом высочайший уровень безопасности.",
    connectBtn: "Связаться с нами",
    platform: "Платформа",
    solutions: "Решения",
    company: "Компания",
    footerDesc: "Расширение возможностей корпоративной безопасности с помощью передового интеллекта и автоматизированной защиты.",
    ctaTitle: "Защитите свои активы с лучшими.",
    ctaDesc: "Присоединяйтесь к элитным организациям, которые доверяют x0sanjeev0x свою самую важную инфраструктуру.",
    demoBtn: "Запланировать демо",
    whitepaperBtn: "Скачать Whitepaper",
    globalLabel: "Глобально / Русский",
    monitoring: "Непрерывный мониторинг",
    monitoringDesc: "Наблюдение за вашей инфраструктурой в режиме реального времени, выявление уязвимостей до их проявления.",
    compliance: "Соблюдение нормативов",
    complianceDesc: "Автоматизированная отчетность и отслеживание соблюдения стандартов GDPR, HIPAA и SOC2.",
    zeroTrust: "Доступ с нулевым доверием",
    zeroTrustDesc: "Протоколы безопасности, ориентированные на идентификацию, гарантирующие доступ к данным только проверенным объектам.",
    adaptive: "Адаптивная защита",
    adaptiveDesc: "Системы на базе ИИ, которые учатся на возникающих угрозах для автоматического укрепления вашего периметра.",
    deepDiveTitle: "Устраните слепые зоны в вашей облачной экосистеме.",
    deepDiveDesc: "Современная инфраструктура сложна. x0sanjeev0x отображает каждый узел и каждое соединение.",
    identityLabel: "Разрешение идентификации",
    identityDetail: "Детализированный контроль разрешений пользователей и авторизации машин.",
    threatLabel: "Моделирование угроз",
    threatDetail: "Проактивное моделирование векторов атак, адаптированное к вашей архитектуре.",
    quantumLabel: "Квантовая готовность",
    quantumDetail: "Стандарты шифрования, подготовленные к следующей эре вычислений.",
    liveAnalytics: "Живая аналитика",
    systemHealthy: "Система в норме",
    riskScore: "Оценка риска",
    uptime: "Аптайм",
    usage: "Использование",
    resources: "Ресурсы",
    legal: "Юридические",
    social: "Социальные",
    selectLang: "Выберите язык",
    langSub: "Выберите предпочтительную локализацию."
  },
  zh: {
    heroTag: "企业安全新标准",
    heroTitle: "有一种更好的安全方式。",
    heroDesc: "我们通过多层架构和自主监控保护价值数十亿美元的数据。",
    pilotBtn: "申请试点访问",
    methodologyBtn: "观看方法论",
    partnersTitle: "行业领导者的信任",
    featuresTitle: "为弹性而设计。为规模而建造。",
    featuresDesc: "安全不应成为瓶颈。我们的平台无缝集成到您的 DevOps 技术栈中，同时保持最高安全态势。",
    connectBtn: "让我们联系",
    platform: "平台",
    solutions: "解决方案",
    company: "公司",
    footerDesc: "通过先进的智能和自动化保护增强企业安全。",
    ctaTitle: "用最好的保护您的资产。",
    ctaDesc: "加入那些将其最敏感的基础设施托付给 x0sanjeev0x 的精英组织。",
    demoBtn: "预约演示",
    whitepaperBtn: "下载白皮书",
    globalLabel: "全球 / 中文",
    monitoring: "持续监控",
    monitoringDesc: "实时观察您的基础设施，在漏洞显现之前识别它们。",
    compliance: "合规管理",
    complianceDesc: "针对 GDPR、HIPAA 和 SOC2 标准的自动化报告和合规性跟踪。",
    zeroTrust: "零信任访问",
    zeroTrustDesc: "身份优先的安全协议，确保只有经过验证的实体才能访问数据。",
    adaptive: "自适应保护",
    adaptiveDesc: "由人工智能驱动的系统，可从新出现的威胁中学习，自动强化您的边界。",
    deepDiveTitle: "消除云生态系统中的盲点。",
    deepDiveDesc: "现代基础设施非常复杂。x0sanjeev0x 绘制每个节点、每个连接和每个字节数据的图谱。",
    identityLabel: "身份解析",
    identityDetail: "对用户权限和机器间认证的粒度控制。",
    threatLabel: "威胁建模",
    threatDetail: "针对您的架构定制的主动攻击向量模拟。",
    quantumLabel: "量子就绪",
    quantumDetail: "为下一代计算准备的加密标准。",
    liveAnalytics: "实时分析",
    systemHealthy: "系统健康",
    riskScore: "风险评分",
    uptime: "运行时间",
    usage: "使用率",
    resources: "资源",
    legal: "法律",
    social: "社交",
    selectLang: "选择语言",
    langSub: "选择您偏好的本地化版本。"
  }
};

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Tamil', code: 'ta' },
  { name: 'Russian', code: 'ru' },
  { name: 'Chinese', code: 'zh' }
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Open language selector after initial load
      setTimeout(() => setIsLangModalOpen(true), 1200);
    }, 3500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const t = (key: string) => translations[currentLang][key] || translations['en'][key];

  const REDIRECT_URL = "https://www.fiverr.com/x0sanjeev0x/";

  const handleRedirect = () => {
    window.open(REDIRECT_URL, '_blank');
  };

  const features = [
    {
      id: '1',
      title: t('monitoring'),
      description: t('monitoringDesc'),
      icon: <Activity size={24} />,
    },
    {
      id: '2',
      title: t('compliance'),
      description: t('complianceDesc'),
      icon: <ShieldCheck size={24} />,
    },
    {
      id: '3',
      title: t('zeroTrust'),
      description: t('zeroTrustDesc'),
      icon: <Lock size={24} />,
    },
    {
      id: '4',
      title: t('adaptive'),
      description: t('adaptiveDesc'),
      icon: <Cpu size={24} />,
    },
  ];

  const partners = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  ];

  const chartData = [40, 60, 45, 80, 55, 90, 70, 85];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <CustomCursor />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
               <ShieldCheck size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">x0sanjeev0x</span>
          </div>

          <div className="hidden md:flex items-center gap-12 text-sm font-medium text-gray-600">
            <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">{t('platform')}</a>
            <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">{t('solutions')}</a>
            <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">{t('company')}</a>
            <button 
              onClick={handleRedirect}
              className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all cursor-pointer"
            >
              {t('connectBtn')}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Language Modal */}
      <AnimatePresence>
        {isLangModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLangModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-black/5"
            >
              <div className="p-8 border-b border-black/5 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold">{t('selectLang')}</h3>
                <button onClick={() => setIsLangModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 grid grid-cols-1 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setIsLangModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${currentLang === lang.code ? 'bg-black text-white' : 'hover:bg-black/5'}`}
                  >
                    <span className="text-lg font-medium">{lang.name}</span>
                    {currentLang === lang.code && <Check size={20} />}
                  </button>
                ))}
              </div>
              <div className="p-8 bg-gray-50 border-t border-black/5 text-center text-sm text-gray-400">
                {t('langSub')}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-semibold">
              <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>{t('platform')}</a>
              <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>{t('solutions')}</a>
              <a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>{t('company')}</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  handleRedirect();
                }} 
                className="w-fit px-8 py-3 bg-black text-white rounded-full text-lg cursor-pointer"
              >
                {t('connectBtn')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Fade-In after loading */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase mb-6">
                {t('heroTag')}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8">
                {t('heroTitle').split('.').length > 1 ? (
                  <>
                    {t('heroTitle').split('.')[0]}. <br />
                    <span className="text-gray-400">{t('heroTitle').split('.')[1]}</span>
                  </>
                ) : t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mb-12 leading-relaxed">
                {t('heroDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleRedirect}
                  className="px-10 py-5 bg-black text-white rounded-full font-semibold flex items-center justify-center gap-3 hover:gap-5 transition-all group"
                >
                  {t('pilotBtn')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleRedirect}
                  className="px-10 py-5 border border-black/10 rounded-full font-semibold hover:bg-black/5 transition-all"
                >
                  {t('methodologyBtn')}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
              className="relative"
            >
              <SecurityVisual />
            </motion.div>
          </div>
        </section>

        {/* Partners Section - Dark Theme */}
        <section className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-gray-500 uppercase tracking-widest text-sm font-bold">{t('partnersTitle')}</h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
               {partners.map((logo, i) => (
                 <img key={i} src={logo} alt="Partner" className="h-6 md:h-10 w-auto" />
               ))}
            </div>
          </div>
        </section>

        {/* Features Section - Dark Theme Continued */}
        <section className="bg-black py-32 md:py-48 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-end">
              <div className="lg:col-span-7">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  {t('featuresTitle')}
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-xl text-gray-400">
                  {t('featuresDesc')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <FeatureCard 
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive / Value Prop Section */}
        <section className="py-32 md:py-48 bg-[#FDFDFD]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-12">
                 <div>
                   <h3 className="text-3xl md:text-5xl font-bold mb-6">{t('deepDiveTitle')}</h3>
                   <p className="text-lg text-gray-600">
                      {t('deepDiveDesc')}
                   </p>
                 </div>
                 
                 <div className="space-y-8">
                   {[
                     { label: t('identityLabel'), detail: t('identityDetail') },
                     { label: t('threatLabel'), detail: t('threatDetail') },
                     { label: t('quantumLabel'), detail: t('quantumDetail') }
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-6 items-start">
                       <div className="mt-1 p-2 rounded-lg bg-black text-white">
                         <ShieldCheck size={18} />
                       </div>
                       <div>
                         <h4 className="text-xl font-bold mb-2">{item.label}</h4>
                         <p className="text-gray-500">{item.detail}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="bg-gray-100 rounded-3xl p-8 md:p-12 border border-black/5">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-black/5 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-500">{t('liveAnalytics')}</span>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-gray-400">{t('systemHealthy')}</span>
                      </div>
                    </div>
                    <div className="h-48 w-full bg-gray-50 rounded-lg overflow-visible relative">
                      <div className="absolute inset-0 flex items-end px-4 gap-2 pb-4">
                        {chartData.map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            whileHover={{ 
                              backgroundColor: '#F59E0B',
                              scaleY: 1.05,
                              transition: { duration: 0.2 }
                            }}
                            transition={{ 
                              height: { delay: i * 0.05, duration: 1, ease: "easeOut" }
                            }}
                            className="flex-1 bg-black/10 rounded-t cursor-default relative group origin-bottom"
                          >
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap z-[60] pointer-events-none shadow-xl transform translate-y-3 group-hover:translate-y-0">
                              {t('usage')}: {h}%
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-black" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 border border-black/5">
                        <p className="text-xs text-gray-500 mb-1">{t('riskScore')}</p>
                        <p className="text-2xl font-bold">0.02</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 border border-black/5">
                        <p className="text-xs text-gray-500 mb-1">{t('uptime')}</p>
                        <p className="text-2xl font-bold">99.99%</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-black text-white p-12 md:p-24 text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">{t('ctaTitle')}</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto relative z-10">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button 
                onClick={handleRedirect}
                className="px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all cursor-pointer"
              >
                {t('demoBtn')}
              </button>
              <button 
                onClick={handleRedirect}
                className="px-10 py-5 bg-white/10 text-white rounded-full font-bold backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
              >
                {t('whitepaperBtn')}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 bg-[#FDFDFD] border-t border-black/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                  <span className="text-lg font-bold tracking-tight">x0sanjeev0x</span>
                </div>
                <p className="text-gray-500 max-w-xs leading-relaxed">
                  {t('footerDesc')}
                </p>
              </div>
              <div>
                <h5 className="font-bold mb-6">{t('platform')}</h5>
                <ul className="space-y-4 text-gray-500">
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">Architecture</a></li>
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">{t('compliance')}</a></li>
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6">{t('resources')}</h5>
                <ul className="space-y-4 text-gray-500">
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">Case Studies</a></li>
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">Documentation</a></li>
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">Security Blog</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6">{t('legal')}</h5>
                <ul className="space-y-4 text-gray-500">
                  <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-black">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-black">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6">{t('social')}</h5>
                <ul className="space-y-4 text-gray-500">
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">LinkedIn</a></li>
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">X (Twitter)</a></li>
                  <li><a href={REDIRECT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
              <p>© 2025 x0sanjeev0x Security Inc. All rights reserved.</p>
              <div className="flex gap-8">
                 <button 
                   onClick={() => setIsLangModalOpen(true)}
                   className="flex items-center gap-2 hover:text-black transition-colors"
                 >
                   <Globe size={14} /> {t('globalLabel')}
                 </button>
              </div>
            </div>
          </div>
        </footer>
      </motion.main>
    </div>
  );
};

export default App;
