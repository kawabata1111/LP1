import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  CheckCircle, 
  ArrowRight, 
  PhoneOff, 
  FileX, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Smartphone,
  Menu,
  X,
  ChevronDown,
  Download,
  PlayCircle
} from "lucide-react";

// --- Hooks ---

const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-up-element").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// --- Components ---

const Button = ({ children, variant = "primary", className = "", ...props }: { 
  children?: React.ReactNode; 
  variant?: "primary" | "secondary" | "outline" | "accent" | "white"; 
  className?: string;
  [key: string]: any;
}) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-4 border text-base font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0";
  const variants = {
    primary: "border-transparent text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-blue-500 shadow-blue-500/30",
    secondary: "border-gray-200 text-blue-700 bg-white hover:bg-gray-50 focus:ring-blue-500 shadow-gray-200",
    outline: "border-white text-white bg-transparent hover:bg-white/10 focus:ring-white",
    accent: "border-transparent text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:ring-orange-500 shadow-orange-500/30",
    white: "border-transparent text-blue-700 bg-white hover:bg-gray-100 focus:ring-white shadow-lg",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "", bg = "white" }: { children?: React.ReactNode; className?: string; id?: string; bg?: "white" | "gray" | "dark" | "blue" }) => {
  const bgColors = {
    white: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-slate-900 text-white",
    blue: "bg-blue-900 text-white"
  };

  return (
    <section id={id} className={`py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden ${bgColors[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto relative">
        {children}
      </div>
    </section>
  );
};

const Badge = ({ children, color = "blue" }: { children?: React.ReactNode, color?: "blue" | "red" | "orange" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    red: "bg-red-100 text-red-800 border-red-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200"
  };
  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border mb-6 shadow-sm ${colors[color]}`}>
      {children}
    </span>
  );
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <div className="fade-up-element" style={{ transitionDelay: `${delay}ms` }}>
    {children}
  </div>
);

// --- Sections ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-800">
            Smart<span className="text-blue-600">Order</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">機能</a>
          <a href="#benefits" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">メリット</a>
          <a href="#flow" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">導入フロー</a>
          <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">料金</a>
          <Button variant="primary" className="py-2.5 px-6 text-sm h-auto shadow-md">資料を見る</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 md:hidden flex flex-col space-y-4 border-t border-gray-100">
          <a href="#features" className="text-slate-800 font-bold p-2 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>機能</a>
          <a href="#benefits" className="text-slate-800 font-bold p-2 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>メリット</a>
          <a href="#flow" className="text-slate-800 font-bold p-2 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>導入フロー</a>
          <a href="#pricing" className="text-slate-800 font-bold p-2 hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>料金</a>
          <Button variant="primary" className="w-full justify-center">資料を見る</Button>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-bg">
    {/* Floating Blobs */}
    <div className="absolute top-20 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-3xl animate-float-delayed"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-5xl mx-auto fade-up-element visible">
        <Badge color="blue">累計導入数 1,200社突破</Badge>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.15] mb-8 tracking-tight">
          B2B受発注を、<br />
          <span className="gradient-text">ECのようにシンプル</span>に。
        </h1>
        <p className="text-lg md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
          FAX・電話の受注業務を<span className="bg-yellow-100 px-1 font-bold text-slate-800">ゼロ</span>へ。<br className="md:hidden"/>
          スマホ対応のWeb注文フォームで、<br className="hidden md:block"/>
          売上アップと業務効率化を同時に実現します。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button variant="accent" className="w-full sm:w-auto text-lg px-10 py-5 shadow-orange-500/40">
            30日間無料で試す <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto text-lg px-10 py-5">
            <PlayCircle className="mr-2 w-5 h-5 text-blue-600" /> デモ動画を見る
          </Button>
        </div>
        <p className="mt-6 text-sm text-slate-500 font-medium flex justify-center items-center gap-4">
          <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-500" /> クレジットカード不要</span>
          <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-500" /> 最短3日で開始</span>
        </p>
      </div>

      {/* Hero Image / Dashboard Mockup with Parallax effect */}
      <div className="mt-20 relative fade-up-element" style={{ transitionDelay: '200ms' }}>
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-lg opacity-20"></div>
        <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-slate-900/5 bg-white mx-auto max-w-6xl">
           <div className="bg-slate-900 h-10 flex items-center px-4 space-x-2">
             <div className="flex space-x-2">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
             </div>
             <div className="ml-4 bg-slate-800 rounded-md px-3 py-1 text-xs text-slate-400 font-mono flex-1 text-center">smartorder.app/dashboard</div>
           </div>
           
           {/* Abstract Dashboard UI */}
           <div className="aspect-[16/9] md:aspect-[21/10] bg-slate-50 relative flex overflow-hidden">
              {/* Sidebar */}
              <div className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col p-4 z-10">
                 <div className="h-8 bg-slate-100 rounded-md w-3/4 mb-8 animate-pulse"></div>
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="h-10 mb-2 rounded-md flex items-center px-2 hover:bg-blue-50">
                     <div className="w-5 h-5 bg-slate-200 rounded mr-3"></div>
                     <div className="h-3 bg-slate-200 rounded w-20"></div>
                   </div>
                 ))}
              </div>
              
              {/* Main Area */}
              <div className="flex-1 p-6 md:p-8 overflow-hidden">
                 <div className="flex justify-between items-center mb-8">
                    <div>
                      <div className="h-8 bg-slate-200 rounded w-48 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-32"></div>
                    </div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/30">
                      新規注文 +12件
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {['本日の売上', '今月の注文数', '新規取引先'].map((label, i) => (
                      <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                         <div className="text-slate-500 text-sm font-bold mb-2">{label}</div>
                         <div className="text-3xl font-black text-slate-800">
                           {i === 0 ? '¥1,284,000' : i === 1 ? '432件' : '15社'}
                         </div>
                         <div className="text-green-500 text-xs font-bold mt-2 flex items-center">
                           <TrendingUp className="w-3 h-3 mr-1" /> 前日比 +{(i+1)*5}%
                         </div>
                      </div>
                    ))}
                 </div>

                 {/* Order List Table */}
                 <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex gap-4 font-bold text-slate-400 text-xs">
                       <div className="w-1/4">注文ID</div>
                       <div className="w-1/4">取引先</div>
                       <div className="w-1/4">金額</div>
                       <div className="w-1/4">ステータス</div>
                    </div>
                    {[1,2,3,4].map((i) => (
                       <div key={i} className="p-4 border-b border-slate-50 flex gap-4 items-center">
                          <div className="w-1/4 font-mono text-slate-600">#OD-{202400 + i}</div>
                          <div className="w-1/4 font-bold text-slate-800">株式会社サンプル{String.fromCharCode(64+i)}</div>
                          <div className="w-1/4 font-bold">¥{(i * 12000).toLocaleString()}</div>
                          <div className="w-1/4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${i===1 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                              {i===1 ? '未発送' : '発送済'}
                            </span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              
              {/* Floating Notification - Mobile-like */}
              <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 w-72 animate-float">
                 <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                       <Smartphone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                       <div className="font-bold text-slate-800 text-sm">LINEで注文が入りました</div>
                       <div className="text-xs text-slate-500 mt-1">佐藤商店より「季節の詰め合わせセット」他3点</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const LogoScroll = () => (
  <div className="bg-slate-50 py-10 border-y border-slate-200 overflow-hidden">
    <div className="text-center text-slate-400 text-sm font-bold mb-6 tracking-wider">
      業界リーダー企業 1,200社以上が選んだ信頼
    </div>
    <div className="logo-scroll-container">
      <div className="logo-scroll-wrapper">
        {/* Repeating logos for infinite scroll effect */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="logo-item">
            LOGO {i + 1}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Problems = () => (
  <Section bg="dark" className="relative">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#475569 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

    <div className="text-center mb-16 relative z-10 fade-up-element">
      <Badge color="red">BEFORE</Badge>
      <h2 className="text-3xl md:text-5xl font-black mb-6">
        「アナログ受発注」の限界、<br />
        感じていませんか？
      </h2>
      <p className="text-slate-400 text-lg">
        FAXや電話中心の業務は、ミスを生み、社員を疲弊させます。
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8 relative z-10">
      {[
        { 
          icon: <FileX className="w-16 h-16 text-red-500" />, 
          title: "FAX解読・手入力の地獄", 
          desc: "クセ字の判読に悩み、基幹システムへ手打ちする日々。1文字のミスが誤出荷につながるプレッシャー。" 
        },
        { 
          icon: <PhoneOff className="w-16 h-16 text-red-500" />, 
          title: "電話対応で「作業中断」", 
          desc: "「在庫ある？」「いつ届く？」の電話で営業活動がストップ。言った言わないのトラブルも絶えない。" 
        },
        { 
          icon: <Clock className="w-16 h-16 text-red-500" />, 
          title: "属人化する業務ノウハウ", 
          desc: "「あの人じゃないと分からない」商品や顧客ルール。担当者が休むと業務が回らないリスク。" 
        }
      ].map((item, idx) => (
        <div key={idx} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-red-500/50 transition-colors duration-300 fade-up-element" style={{ transitionDelay: `${idx * 100}ms` }}>
          <div className="mb-6 opacity-90">
            {item.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
          <p className="text-slate-400 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
    
    <div className="mt-16 text-center fade-up-element">
      <div className="inline-block p-4 rounded-full bg-slate-800 border border-slate-700 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
      <p className="mt-4 text-white font-bold text-lg">その悩み、すべて自動化できます。</p>
    </div>
  </Section>
);

const Solution = () => (
  <Section bg="white" id="features">
    <div className="text-center mb-20 fade-up-element">
      <Badge color="blue">SOLUTION</Badge>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
        B2B取引を、<br />
        もっとスマートに、もっと自由に。
      </h2>
      <p className="text-slate-600 text-xl max-w-3xl mx-auto">
        SmartOrderは、B2B特有の商習慣に対応しながら、<br className="hidden md:block"/>
        誰でも簡単に使える「やさしい」受発注システムです。
      </p>
    </div>

    {/* Feature 1 */}
    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-24">
      <div className="w-full md:w-1/2 fade-up-element">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 shadow-inner border border-blue-100">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
             {/* Mock UI: Catalog */}
             <div className="bg-slate-800 text-white p-3 text-xs font-bold flex justify-between">
                <span>商品カタログ</span>
                <Menu className="w-4 h-4" />
             </div>
             <div className="p-4 grid grid-cols-2 gap-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="border rounded-lg p-2">
                     <div className="w-full h-20 bg-slate-100 rounded mb-2"></div>
                     <div className="h-3 bg-slate-200 w-3/4 mb-1"></div>
                     <div className="flex justify-between items-center">
                        <div className="h-3 bg-slate-200 w-1/3"></div>
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">+</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 fade-up-element" style={{ transitionDelay: '100ms' }}>
        <h3 className="text-3xl font-bold text-slate-900 mb-6">
          スマホで「ポチッ」と<br />
          LINE感覚で発注完了。
        </h3>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          パソコンが苦手な職人さんや、忙しい店舗スタッフでも直感的に操作できるデザインを追求しました。
          LINE連携機能を使えば、リマインド通知からそのまま注文画面へ。
          FAX用紙を探す手間も、電話がつながらないストレスもありません。
        </p>
        <ul className="space-y-4">
           {[
             "写真付きカタログで商品選びが直感的に",
             "「いつもの」注文は履歴からワンタップ",
             "スマホ、タブレット、PC、全デバイス対応"
           ].map((txt, i) => (
             <li key={i} className="flex items-center text-slate-700 font-bold">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 shrink-0">
                 <CheckCircle className="w-4 h-4" />
               </div>
               {txt}
             </li>
           ))}
        </ul>
      </div>
    </div>

    {/* Feature 2 */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 mb-24">
      <div className="w-full md:w-1/2 fade-up-element">
        <div className="bg-gradient-to-bl from-orange-50 to-amber-50 rounded-3xl p-8 lg:p-12 shadow-inner border border-orange-100 relative">
          {/* Mock UI: Price Logic */}
          <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10">
             <div className="flex items-center justify-between mb-4 pb-4 border-b">
               <div className="font-bold text-slate-700">取引先設定</div>
               <div className="text-xs text-slate-400">Settings</div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                   <span className="font-bold text-slate-600">A社 (大口)</span>
                   <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">掛率 65%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                   <span className="font-bold text-slate-600">B社 (通常)</span>
                   <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-bold">掛率 80%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                   <span className="font-bold text-slate-600">C社 (限定)</span>
                   <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-bold">特定商品のみ</span>
                </div>
             </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 animate-float-delayed z-20">
             <div className="text-xs font-bold text-slate-400 mb-1">自動計算</div>
             <div className="text-xl font-black text-slate-800">ミスゼロへ</div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 fade-up-element" style={{ transitionDelay: '100ms' }}>
        <h3 className="text-3xl font-bold text-slate-900 mb-6">
          「あの会社は特別価格」<br />
          複雑な商習慣もそのまま再現。
        </h3>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          「A社は掛率70%」「B社にはこの商品は見せない」といった、B2B特有の細かなルール設定が可能。
          取引先ごとに最適なカタログを自動表示するので、価格の入力ミスや、見せてはいけない商品の誤表示を防ぎます。
        </p>
        <ul className="space-y-4">
           {[
             "顧客ランク別の掛率・単価設定",
             "商品ごとの公開・非公開設定",
             "最低注文数量(MOQ)やロット単位の設定"
           ].map((txt, i) => (
             <li key={i} className="flex items-center text-slate-700 font-bold">
               <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3 shrink-0">
                 <CheckCircle className="w-4 h-4" />
               </div>
               {txt}
             </li>
           ))}
        </ul>
      </div>
    </div>
  </Section>
);

const ImplementationStep = () => (
  <Section bg="gray" id="flow">
    <div className="text-center mb-16 fade-up-element">
      <h2 className="text-3xl font-black text-slate-900 mb-4">導入は驚くほど簡単</h2>
      <p className="text-slate-500">お申し込みから最短3営業日で、Web受注を開始できます。</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 relative">
       {/* Connecting Line (Desktop) */}
       <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-slate-200 z-0 transform translate-y-1/2"></div>

       {[
         { step: "01", title: "アカウント開設", text: "お申し込み後、即座に管理者アカウントを発行します。" },
         { step: "02", title: "データ登録", text: "商品データと取引先データをCSVで一括アップロード。" },
         { step: "03", title: "利用開始案内", text: "取引先に招待メール/LINEを送るだけでスタート！" }
       ].map((item, i) => (
         <div key={i} className="relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center fade-up-element" style={{ transitionDelay: `${i * 150}ms` }}>
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-blue-500/30 transform -rotate-3">
              {item.step}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-600">{item.text}</p>
         </div>
       ))}
    </div>
    
    <div className="mt-12 text-center fade-up-element">
      <p className="text-sm text-slate-500 mb-4">※ データ移行サポート（有料）もご用意しています。</p>
      <Button variant="outline" className="text-blue-600 border-blue-200 bg-white hover:bg-blue-50">
        導入マニュアルをダウンロード <Download className="ml-2 w-4 h-4" />
      </Button>
    </div>
  </Section>
);

const Testimonial = () => (
  <Section bg="blue">
    <div className="text-center mb-12 fade-up-element">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">導入企業様の声</h2>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {[
        {
          name: "株式会社フーズ・サプライ",
          role: "営業部長",
          person: "佐藤 健一 様",
          comment: "FAX注文の入力作業だけで毎日3時間かかっていましたが、導入後はほぼゼロに。空いた時間で新規開拓に注力でき、昨対比120%の売上を達成しました。",
          tag: "食品卸"
        },
        {
          name: "ライフスタイル雑貨Co.",
          role: "代表取締役",
          person: "田中 美咲 様",
          comment: "展示会での受注用に導入しました。その場でiPadから注文してもらえるので、持ち帰ってからの集計作業がなくなり、出荷までのリードタイムが3日短縮されました。",
          tag: "雑貨メーカー"
        }
      ].map((item, i) => (
        <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 fade-up-element" style={{ transitionDelay: `${i * 100}ms` }}>
           <div className="flex items-start mb-6">
              <div className="bg-white/20 text-white text-xs px-2 py-1 rounded mr-3">{item.tag}</div>
              <div className="text-yellow-400">★★★★★</div>
           </div>
           <p className="text-lg text-white leading-relaxed mb-6 font-medium">"{item.comment}"</p>
           <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 mr-4"></div>
              <div>
                 <div className="text-white font-bold">{item.name}</div>
                 <div className="text-blue-200 text-sm">{item.role} {item.person}</div>
              </div>
           </div>
        </div>
      ))}
    </div>
  </Section>
);

const Pricing = () => (
  <Section id="pricing" className="bg-white">
    <div className="text-center mb-16 fade-up-element">
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">シンプルな料金プラン</h2>
      <p className="text-slate-500">初期費用0円。リスクなく始められます。</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
      {/* Plan 1 */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 fade-up-element">
        <h3 className="text-lg font-bold text-slate-500 mb-2">フリー</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-black text-slate-900">¥0</span>
          <span className="text-slate-500 ml-2">/月</span>
        </div>
        <p className="text-slate-600 mb-8 text-sm">受注件数 30件/月まで。<br/>小規模なテスト運用に。</p>
        <Button variant="secondary" className="w-full mb-6 border-slate-200">無料で始める</Button>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 shrink-0"/> 商品登録 100点</li>
          <li className="flex"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 shrink-0"/> 取引先 10社</li>
        </ul>
      </div>

      {/* Plan 2 - Featured */}
      <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl relative transform scale-105 z-10 fade-up-element" style={{ transitionDelay: '100ms' }}>
        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl shadow-lg">
          一番人気
        </div>
        <h3 className="text-lg font-bold text-blue-400 mb-2">スタンダード</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-5xl font-black text-white">¥29,800</span>
          <span className="text-slate-400 ml-2">/月</span>
        </div>
        <p className="text-slate-300 mb-8 text-sm">制限なしで使いたい<br/>成長企業のためのプラン。</p>
        <Button variant="primary" className="w-full mb-8 py-4 text-lg">
          30日間無料で試す
        </Button>
        <ul className="space-y-4 text-sm text-white font-medium">
          <li className="flex"><CheckCircle className="w-5 h-5 text-cyan-400 mr-3 shrink-0"/> 受注件数 無制限</li>
          <li className="flex"><CheckCircle className="w-5 h-5 text-cyan-400 mr-3 shrink-0"/> 商品・取引先 無制限</li>
          <li className="flex"><CheckCircle className="w-5 h-5 text-cyan-400 mr-3 shrink-0"/> CSV一括登録・出力</li>
          <li className="flex"><CheckCircle className="w-5 h-5 text-cyan-400 mr-3 shrink-0"/> 優先チャットサポート</li>
        </ul>
      </div>

      {/* Plan 3 */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 fade-up-element" style={{ transitionDelay: '200ms' }}>
        <h3 className="text-lg font-bold text-slate-500 mb-2">エンタープライズ</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-black text-slate-900">要見積</span>
        </div>
        <p className="text-slate-600 mb-8 text-sm">基幹システム連携や<br/>専任サポートが必要な場合。</p>
        <Button variant="outline" className="w-full mb-6 text-slate-700 border-slate-300 hover:bg-slate-50">お問い合わせ</Button>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 shrink-0"/> API連携オプション</li>
          <li className="flex"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 shrink-0"/> 専任カスタマーサクセス</li>
          <li className="flex"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 shrink-0"/> IPアドレス制限など</li>
        </ul>
      </div>
    </div>
  </Section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "導入までにかかる期間は？", a: "最短3営業日で利用開始できます。商品データをCSVでインポートするだけで、すぐにカタログが作成できます。" },
    { q: "既存の基幹システムと連携できますか？", a: "はい、CSVによる連携は標準対応しています。API連携についてはエンタープライズプランにてご相談ください。" },
    { q: "取引先への案内はどうすればいいですか？", a: "案内用のチラシテンプレートをご用意しています。また、取引先向けのマニュアルも完備しています。" },
    { q: "ITに詳しくない担当者でも使えますか？", a: "はい、管理者画面も注文画面も、専門知識不要で使えるように設計されています。無料トライアルで実際の操作感をお試しください。" }
  ];

  return (
    <Section className="bg-gray-50 max-w-4xl mx-auto rounded-3xl my-12">
      <h2 className="text-3xl font-black text-center mb-12 text-slate-900">よくあるご質問</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 fade-up-element">
            <button 
              className="w-full text-left px-6 py-5 font-bold text-slate-800 flex justify-between items-center hover:bg-slate-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="flex items-center"><span className="text-blue-600 mr-4 text-xl">Q.</span> {faq.q}</span>
              <span className={`transform transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </span>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed pl-14">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 shadow-2xl transition-transform duration-500 z-50 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="hidden md:block">
           <div className="font-bold text-slate-800 text-lg">まずは30日間、無料でお試しください</div>
           <div className="text-sm text-slate-500">クレジットカード登録不要・自動課金なし</div>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <Button variant="accent" className="flex-1 md:flex-none py-3 px-8 text-base shadow-lg">無料で始める</Button>
          <Button variant="secondary" className="flex-1 md:flex-none py-3 px-8 text-base border-slate-300">資料請求</Button>
        </div>
      </div>
    </div>
  );
};

const CTA = () => (
  <div className="bg-slate-900 py-24 text-center px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-900/50"></div>
    
    <div className="max-w-4xl mx-auto relative z-10 fade-up-element">
      <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
        受発注業務を変革し、<br />
        ビジネスを次のステージへ。
      </h2>
      <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
        1,200社以上が選んだNo.1受発注システム。<br />
        あなたも、FAXや電話の呪縛から解放されませんか？
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <Button variant="accent" className="w-full sm:w-auto h-16 px-12 text-xl shadow-2xl shadow-orange-500/20 transform hover:-translate-y-2">
          無料で今すぐ始める
        </Button>
        <Button variant="outline" className="w-full sm:w-auto h-16 px-12 text-xl border-slate-600 hover:bg-white/5 hover:border-white">
          資料をダウンロード
        </Button>
      </div>
      <p className="mt-8 text-slate-500 text-sm">
        お問い合わせ：03-1234-5678 (平日 10:00-18:00)
      </p>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 pb-32 md:pb-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-2 md:col-span-1">
        <span className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
           <TrendingUp className="w-6 h-6 text-blue-600" />
           SmartOrder
        </span>
        <p className="mt-6 text-sm leading-relaxed">
          B2B受発注のデジタル化を推進し、<br/>
          企業の生産性向上を支援します。
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Product</h4>
        <ul className="space-y-4 text-sm">
          <li className="hover:text-white cursor-pointer transition-colors">機能一覧</li>
          <li className="hover:text-white cursor-pointer transition-colors">料金プラン</li>
          <li className="hover:text-white cursor-pointer transition-colors">導入事例</li>
          <li className="hover:text-white cursor-pointer transition-colors">アップデート情報</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Support</h4>
        <ul className="space-y-4 text-sm">
          <li className="hover:text-white cursor-pointer transition-colors">ヘルプセンター</li>
          <li className="hover:text-white cursor-pointer transition-colors">開発者向けAPI</li>
          <li className="hover:text-white cursor-pointer transition-colors">お問い合わせ</li>
          <li className="hover:text-white cursor-pointer transition-colors">システム稼働状況</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-sm">
          <li className="hover:text-white cursor-pointer transition-colors">会社概要</li>
          <li className="hover:text-white cursor-pointer transition-colors">採用情報</li>
          <li className="hover:text-white cursor-pointer transition-colors">プライバシーポリシー</li>
          <li className="hover:text-white cursor-pointer transition-colors">特定商取引法に基づく表記</li>
        </ul>
      </div>
    </div>
    <div className="text-center text-sm border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4">
      <p>© 2024 SmartOrder Inc. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
         {/* Social Icons Placeholder */}
         <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-slate-700 cursor-pointer"></div>
         <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-slate-700 cursor-pointer"></div>
         <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-slate-700 cursor-pointer"></div>
      </div>
    </div>
  </footer>
);

// --- App ---

const App = () => {
  useIntersectionObserver();

  return (
    <div className="font-sans antialiased text-slate-600 bg-white selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <main>
        <Hero />
        <LogoScroll />
        <Problems />
        <Solution />
        <ImplementationStep />
        <Testimonial />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <StickyCTA />
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);