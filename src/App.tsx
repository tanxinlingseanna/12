/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Map, 
  Heart, 
  Network, 
  CheckCircle2, 
  Phone, 
  Mail, 
  User,
  ChevronDown,
  Layout,
  Sparkles,
  Users
} from 'lucide-react';

// --- Types ---

type SolutionType = 'space' | 'life' | 'resource' | null;

interface SolutionDetail {
  id: SolutionType;
  title: string;
  target: string;
  value: string[];
  method: string;
  start: string;
}

const SOLUTION_DETAILS: Record<string, SolutionDetail> = {
  space: {
    id: 'space',
    title: '空間 / 店面 / 環境優化',
    target: '適合有實體空間，希望改善動線、成本與體驗的人',
    value: [
      '降低營運與維護成本',
      '提升使用者停留意願與體驗感',
      '創造具備美學與功能性的空間系統'
    ],
    method: '透過景觀設計背景，進行現況診斷與動線重整。',
    start: '預約現場勘查或線上初步諮詢。'
  },
  life: {
    id: 'life',
    title: '健康與生活品質提升',
    target: '適合重視健康、保養與生活系統化的人',
    value: [
      '建立個人化的健康管理系統',
      '整合優質健康資源，省去盲目嘗試',
      '長期穩定的生活品質提升'
    ],
    method: '顧問式分析生活習慣，對接適合的健康資源。',
    start: '進行 15 分鐘的生活品質評估談話。'
  },
  resource: {
    id: 'resource',
    title: '資源整合與機會',
    target: '適合想增加收入或接觸新機會的人',
    value: [
      '對接跨產業的人脈與商機',
      '優化現有資源的變現能力',
      '參與具備長期價值的事業系統'
    ],
    method: '分析現有資源缺口，提供精準的整合建議。',
    start: '預約 1-on-1 資源盤點諮詢。'
  }
};

// --- Components ---

const QUESTIONS = [
  {
    id: 'status',
    title: '你的目前狀態是？',
    options: ['上班族', '自由工作者', '創業 / 店家經營者', '其他']
  },
  {
    id: 'improvement',
    title: '你目前最想改善的是？',
    options: ['空間環境（居住 / 店面）', '健康與生活品質', '想增加收入或副業', '還不確定']
  },
  {
    id: 'goal',
    title: '你的主要目標是？',
    options: ['提升生活品質', '降低日常成本', '增加收入', '建立資源與人脈']
  },
  {
    id: 'budget',
    title: '你目前的預算接受範圍？',
    options: ['低於 2 萬', '2～5 萬', '5 萬以上', '還在評估']
  },
  {
    id: 'preference',
    title: '你希望的方式？',
    options: ['想先了解再決定', '願意直接開始', '想有人幫我規劃', '還在觀望']
  }
];

export default function App() {
  const [selectedSolution, setSelectedSolution] = useState<SolutionType>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userCategory, setUserCategory] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSolutionSelect = (type: SolutionType) => {
    setSelectedSolution(type);
    setTimeout(() => {
      const detailElement = document.getElementById('solution-detail');
      if (detailElement) {
        detailElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleAnswer = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    // Classification Logic
    const imp = answers['improvement'];
    let category = '還不確定';
    let solutionToSelect: SolutionType = null;

    if (imp?.includes('空間')) {
      category = '空間型客戶';
      solutionToSelect = 'space';
    } else if (imp?.includes('健康')) {
      category = '生活型客戶';
      solutionToSelect = 'life';
    } else if (imp?.includes('收入')) {
      category = '事業型客戶';
      solutionToSelect = 'resource';
    }

    setUserCategory(category);
    setIsSubmitted(true);
    
    // Auto-select solution based on classification
    if (solutionToSelect) {
      setSelectedSolution(solutionToSelect);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsSubmitted(false);
    setUserCategory(null);
  };

  return (
    <div className="min-h-screen selection:bg-moss/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-xl font-serif tracking-widest">MONICA TAN</div>
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
          <button onClick={() => scrollToSection('about')} className="hover:opacity-60 transition-opacity">About</button>
          <button onClick={() => scrollToSection('solutions')} className="hover:opacity-60 transition-opacity">Solutions</button>
          <button onClick={() => scrollToSection('contact')} className="hover:opacity-60 transition-opacity">Contact</button>
        </div>
      </nav>

      {/* 1️⃣ Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-cream">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,93,78,0.1)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-paper/80"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-moss font-medium tracking-[0.3em] uppercase mb-6"
          >
            空間優化 ｜ 健康管理 ｜ 資源整合
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.2]"
          >
            不是產品，<br />
            而是一種更適合你的選擇方式
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => scrollToSection('assessment')} className="btn-primary flex items-center justify-center gap-2">
              開始評估你的需求 <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-outline">
              預約 10 分鐘了解
            </button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-moss/40"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 🧭 Questionnaire Section */}
      <section id="assessment" className="section-padding bg-paper border-y border-moss/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">開始評估你的需求</h2>
            <p className="text-ink/60">透過簡單幾個問題，幫你找到最適合你的方向（2分鐘完成）</p>
          </div>

          <div className="bg-cream/30 p-8 md:p-12 rounded-[2.5rem] border border-moss/10 shadow-sm relative overflow-hidden">
            {!isSubmitted ? (
              <>
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-moss/5">
                  <motion.div 
                    className="h-full bg-moss"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-end">
                      <h3 className="text-2xl font-serif">{QUESTIONS[currentStep].title}</h3>
                      <span className="text-xs tracking-widest text-ink/30 uppercase">Step {currentStep + 1} / {QUESTIONS.length}</span>
                    </div>

                    <div className="grid gap-4">
                      {QUESTIONS[currentStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(QUESTIONS[currentStep].id, option)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                            answers[QUESTIONS[currentStep].id] === option 
                            ? 'border-moss bg-moss text-white shadow-md' 
                            : 'border-moss/10 bg-white/50 hover:border-moss/40 hover:bg-white'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button 
                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                        disabled={currentStep === 0}
                        className="text-ink/40 hover:text-ink disabled:opacity-0 transition-all"
                      >
                        上一步
                      </button>
                      {currentStep === QUESTIONS.length - 1 && answers[QUESTIONS[currentStep].id] && (
                        <button 
                          onClick={handleSubmit}
                          className="btn-primary"
                        >
                          送出並獲得建議
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-8"
              >
                <div className="w-20 h-20 bg-moss/10 rounded-full flex items-center justify-center mx-auto text-moss mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl">感謝你的填寫</h3>
                  <p className="text-ink/70 text-lg leading-relaxed">
                    我們已收到你的需求，初步分析你屬於：<br />
                    <span className="text-moss font-serif text-2xl font-medium">【{userCategory}】</span>
                  </p>
                  <p className="text-ink/60 max-w-md mx-auto">
                    建議你預約 10 分鐘，我可以根據你的情況幫你做初步分析，並提供最適合的建議。
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <button onClick={() => scrollToSection('contact')} className="btn-primary">
                    預約諮詢
                  </button>
                  <a href="https://line.me" target="_blank" rel="noreferrer" className="btn-outline flex items-center justify-center gap-2">
                    加 LINE 聯絡
                  </a>
                </div>
                
                <button 
                  onClick={resetQuestionnaire}
                  className="text-xs text-ink/30 hover:text-ink/60 transition-colors uppercase tracking-widest"
                >
                  重新評估
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 2️⃣ Pain Points Section */}
      <section className="section-padding bg-paper">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-12">為什麼很多人一直卡住？</h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-left">
            {[
              '花了很多錢，但沒有系統',
              '空間做了，但沒有提升生活品質',
              '想變好，但沒有方向',
              '資源分散，難以整合'
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-cream/30 border border-moss/5"
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-moss shrink-0" />
                <p className="text-lg text-ink/80">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ Consultant Positioning */}
      <section id="about" className="section-padding bg-cream/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-12">我在做的事情</h2>
          <div className="grid sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto text-moss">
                <Layout size={28} />
              </div>
              <h3 className="text-xl font-medium">景觀空間優化</h3>
              <p className="text-ink/70 text-sm leading-relaxed">降低成本 / 提升使用體驗，創造人與環境的良性互動。</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto text-moss">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-medium">健康資源整合</h3>
              <p className="text-ink/70 text-sm leading-relaxed">長期生活品質的系統化管理，對接精準健康方案。</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto text-moss">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-medium">人脈與機會串聯</h3>
              <p className="text-ink/70 text-sm leading-relaxed">打破資訊落差，實現資源的高效整合與事業對接。</p>
            </div>
          </div>
          <p className="mt-16 italic text-ink/60 max-w-2xl mx-auto">
            「專業但不誇大，我提供的不是單次交易，而是陪伴您成長的長期整合系統。」
          </p>
        </div>
      </section>

      {/* 4️⃣ Core Interaction: Three Selection Cards */}
      <section id="solutions" className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-16">選擇最接近你的狀態</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => handleSolutionSelect('space')}
              className={`cursor-pointer p-10 rounded-3xl transition-all duration-500 border-2 ${selectedSolution === 'space' ? 'border-moss bg-moss/5' : 'border-transparent bg-cream/50 hover:bg-cream'}`}
            >
              <Map className="text-moss mb-8" size={40} />
              <h3 className="text-2xl mb-4">空間 / 店面 / 環境優化</h3>
              <p className="text-ink/70 mb-8 leading-relaxed">適合有實體空間，希望改善動線、成本與體驗的人。</p>
              <button className={`flex items-center gap-2 font-medium ${selectedSolution === 'space' ? 'text-moss' : 'text-ink/40'}`}>
                了解空間方案 <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => handleSolutionSelect('life')}
              className={`cursor-pointer p-10 rounded-3xl transition-all duration-500 border-2 ${selectedSolution === 'life' ? 'border-moss bg-moss/5' : 'border-transparent bg-cream/50 hover:bg-cream'}`}
            >
              <Heart className="text-moss mb-8" size={40} />
              <h3 className="text-2xl mb-4">健康與生活品質提升</h3>
              <p className="text-ink/70 mb-8 leading-relaxed">適合重視健康、保養與生活系統化的人。</p>
              <button className={`flex items-center gap-2 font-medium ${selectedSolution === 'life' ? 'text-moss' : 'text-ink/40'}`}>
                了解生活方案 <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => handleSolutionSelect('resource')}
              className={`cursor-pointer p-10 rounded-3xl transition-all duration-500 border-2 ${selectedSolution === 'resource' ? 'border-moss bg-moss/5' : 'border-transparent bg-cream/50 hover:bg-cream'}`}
            >
              <Network className="text-moss mb-8" size={40} />
              <h3 className="text-2xl mb-4">資源整合與機會</h3>
              <p className="text-ink/70 mb-8 leading-relaxed">適合想增加收入 or 接觸新機會的人。</p>
              <button className={`flex items-center gap-2 font-medium ${selectedSolution === 'resource' ? 'text-moss' : 'text-ink/40'}`}>
                了解事業方案 <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* 5️⃣ Solution Detail Area */}
        <div id="solution-detail" className="max-w-4xl mx-auto mt-24">
          <AnimatePresence mode="wait">
            {selectedSolution && (
              <motion.div
                key={selectedSolution}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-12 rounded-[2rem] shadow-xl border border-cream"
              >
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl text-moss">{SOLUTION_DETAILS[selectedSolution].title}</h3>
                  <button onClick={() => setSelectedSolution(null)} className="text-ink/30 hover:text-ink">Close</button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-ink/40 mb-3">適合對象</h4>
                      <p className="text-lg">{SOLUTION_DETAILS[selectedSolution].target}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-ink/40 mb-3">可獲得的價值</h4>
                      <ul className="space-y-3">
                        {SOLUTION_DETAILS[selectedSolution].value.map((v, i) => (
                          <li key={i} className="flex items-center gap-2 text-ink/80">
                            <CheckCircle2 size={16} className="text-moss" /> {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-ink/40 mb-3">顧問方式</h4>
                      <p className="text-ink/80">{SOLUTION_DETAILS[selectedSolution].method}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-ink/40 mb-3">如何開始</h4>
                      <p className="text-ink/80">{SOLUTION_DETAILS[selectedSolution].start}</p>
                    </div>
                    <button onClick={() => scrollToSection('contact')} className="btn-primary w-full">
                      立即諮詢此方案
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 6️⃣ Entry Solution (45k) */}
      <section className="section-padding bg-ink text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6">入門整合方案（彈性起點）</h2>
          <p className="text-white/60 mb-12 text-lg">
            避免銷售感，我們強調的是「選擇」與「適合性」。<br />
            作為進入整合系統的第一步，這是一個低門檻且具備高度彈性的起點。
          </p>
          <div className="glass-card p-12 rounded-[2.5rem] inline-block text-left max-w-2xl">
            <div className="flex justify-between items-center mb-8">
              <span className="text-moss-light font-serif text-4xl">NT$ 45,000</span>
              <span className="bg-white/10 px-4 py-1 rounded-full text-xs tracking-widest uppercase">Entry Level</span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-6 mb-12">
              <li className="flex items-center gap-3 text-white/80"><CheckCircle2 size={18} className="text-moss" /> 低門檻開始</li>
              <li className="flex items-center gap-3 text-white/80"><CheckCircle2 size={18} className="text-moss" /> 可依需求調整</li>
              <li className="flex items-center gap-3 text-white/80"><CheckCircle2 size={18} className="text-moss" /> 系統化導入</li>
              <li className="flex items-center gap-3 text-white/80"><CheckCircle2 size={18} className="text-moss" /> 適合測試與了解</li>
            </ul>
            <button onClick={() => scrollToSection('contact')} className="w-full py-4 bg-white text-ink rounded-full font-medium hover:bg-moss hover:text-white transition-colors">
              了解整合方案細節
            </button>
          </div>
        </div>
      </section>

      {/* 7️⃣ Trust Section */}
      <section className="section-padding bg-paper">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">為什麼可以放心了解？</h2>
            <p className="text-ink/60">基於專業背景與顧問式服務，我們建立長期的信任關係。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-cream/30 border border-moss/5 space-y-4">
              <div className="w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center text-moss">
                <Layout size={20} />
              </div>
              <h4 className="font-medium text-xl">實務經驗背景</h4>
              <p className="text-ink/60 text-sm leading-relaxed">深耕景觀設計領域，具備空間邏輯與美學實操經驗，能從專業視角切入問題核心。</p>
            </div>
            <div className="p-8 rounded-3xl bg-cream/30 border border-moss/5 space-y-4">
              <div className="w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center text-moss">
                <User size={20} />
              </div>
              <h4 className="font-medium text-xl">顧問式分析</h4>
              <p className="text-ink/60 text-sm leading-relaxed">我們不推銷單一產品，而是依據您的現況與目標，提供客觀且多元的整合建議。</p>
            </div>
            <div className="p-8 rounded-3xl bg-cream/30 border border-moss/5 space-y-4">
              <div className="w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center text-moss">
                <Network size={20} />
              </div>
              <h4 className="font-medium text-xl">長期整合導向</h4>
              <p className="text-ink/60 text-sm leading-relaxed">強調資源的長期價值與系統化運作，致力於建立陪伴式的長期合作夥伴關係。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Final CTA & Contact */}
      <section id="contact" className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl mb-6">如果你還不確定，可以先聊 10 分鐘</h2>
            <p className="text-ink/60">這不是銷售電話，而是一次釐清需求的機會。</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[2rem] shadow-sm">
              <h3 className="text-2xl mb-8">預約諮詢</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink/40 mb-2">姓名 Name</label>
                  <input type="text" className="w-full border-b border-ink/10 py-3 focus:outline-none focus:border-moss transition-colors bg-transparent" placeholder="您的稱呼" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink/40 mb-2">聯絡電話 Phone</label>
                  <input type="tel" className="w-full border-b border-ink/10 py-3 focus:outline-none focus:border-moss transition-colors bg-transparent" placeholder="09xx-xxx-xxx" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink/40 mb-2">感興趣的方向 Interest</label>
                  <select className="w-full border-b border-ink/10 py-3 focus:outline-none focus:border-moss transition-colors bg-transparent">
                    <option>空間優化</option>
                    <option>生活升級</option>
                    <option>資源整合</option>
                    <option>還不確定，想先聊聊</option>
                  </select>
                </div>
                <button className="btn-primary w-full mt-4">送出預約請求</button>
              </form>
            </div>

            <div className="flex flex-col justify-center space-y-12 md:pl-12">
              <div>
                <h3 className="text-2xl mb-6">聯絡資訊</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-ink/70">
                    <User size={20} className="text-moss" />
                    <span>Monica Tan</span>
                  </div>
                  <div className="flex items-center gap-4 text-ink/70">
                    <Phone size={20} className="text-moss" />
                    <a href="tel:+886987330317" className="hover:text-moss transition-colors">+886 987330317</a>
                  </div>
                  <div className="flex items-center gap-4 text-ink/70">
                    <Mail size={20} className="text-moss" />
                    <a href="mailto:tanxinling31@gmail.com" className="hover:text-moss transition-colors">tanxinling31@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-ink/10">
                <p className="text-xs text-ink/40 leading-relaxed">
                  © 2026 MONICA TAN CONSULTING. <br />
                  空間 × 健康 × 資源整合 顧問系統
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
