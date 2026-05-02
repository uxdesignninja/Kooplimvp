import svgPaths from "./svg-0j6wofs492";
import imgUserProfile from "./9e7ad8034fdd1140977edfcdea92aeac18b7a4b2.png";

function UserProfile() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="User Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e2e2e3] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <UserProfile />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[18px] tracking-[-0.45px] w-[126.09px]">
        <p className="leading-[28px]">Equity Reserve</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Background />
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[17px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 17">
        <g id="Container">
          <path d={svgPaths.paad5c90} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative w-full">
          <Container1 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="bg-[#f9f9fa] content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]" data-name="Header - TopAppBar">
      <Container />
      <div className="bg-[#f3f3f4] h-px shrink-0 w-full" data-name="Horizontal Divider" />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[10px] tracking-[1px] uppercase w-[34.28px]">
        <p className="leading-[15px]">Home</p>
      </div>
    </div>
  );
}

function LinkHome() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-60 relative shrink-0" data-name="Link - Home">
      <Container5 />
      <Margin />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[18px] relative shrink-0 w-[19px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
        <g id="Container">
          <path d={svgPaths.p3f8e080} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[10px] tracking-[1px] uppercase w-[47.23px]">
        <p className="leading-[15px]">Budget</p>
      </div>
    </div>
  );
}

function LinkBudgetActive() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Link - Budget (Active)">
      <Container6 />
      <Margin1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p30837e80} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[10px] tracking-[1px] uppercase w-[47.84px]">
        <p className="leading-[15px]">Wealth</p>
      </div>
    </div>
  );
}

function LinkWealth() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-60 relative shrink-0" data-name="Link - Wealth">
      <Container7 />
      <Margin2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 21">
        <g id="Container">
          <path d={svgPaths.p12930f00} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[10px] tracking-[1px] uppercase w-[36.91px]">
        <p className="leading-[15px]">Vault</p>
      </div>
    </div>
  );
}

function LinkVault() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-60 relative shrink-0" data-name="Link - Vault">
      <Container8 />
      <Margin3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bottom-[18px] content-stretch flex gap-[47.9px] items-center left-0 pl-[39.95px] pr-[40.01px] py-[12px] w-[390px] z-[2]" data-name="Container">
      <LinkHome />
      <LinkBudgetActive />
      <LinkWealth />
      <LinkVault />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#7c8498] text-[12px] tracking-[1.2px] uppercase w-[185.03px]">
        <p className="leading-[16px]">Financial Health Score</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-baseline leading-[0] not-italic relative shrink-0 w-full" data-name="Paragraph">
      <div className="flex flex-col h-[60px] justify-center relative shrink-0 text-[60px] text-white tracking-[-3px] w-[73.28px]">
        <p className="leading-[60px]">92</p>
      </div>
      <div className="flex flex-col h-[28px] justify-center relative shrink-0 text-[#95f7b9] text-[20px] w-[76.05px]">
        <p className="leading-[28px]">Optimal</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(124,132,152,0.8)] w-[263.84px]">
        <p className="leading-[20px] mb-0">Your spending is 12% lower than last</p>
        <p className="leading-[20px] mb-0">month. Equity Reserve AI suggests your</p>
        <p className="leading-[20px]">current trajectory is sustainable.</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[263.84px]" data-name="Container">
      <Container11 />
      <Paragraph />
      <Container12 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative size-[192px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 192 192">
        <g id="SVG">
          <path d={svgPaths.p235c0000} id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.1" strokeWidth="8" />
          <path d={svgPaths.p235c0000} id="Vector_2" stroke="var(--stroke-0, #95F7B9)" strokeWidth="12" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[33px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 31.5">
        <g id="Container">
          <path d={svgPaths.p2b7f8c00} fill="var(--fill-0, #95F7B9)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center justify-center" data-name="Container">
      <Container14 />
    </div>
  );
}

function GaugeVisualization() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[192px]" data-name="Gauge Visualization">
      <div className="flex items-center justify-center relative shrink-0 size-[192px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Svg />
        </div>
      </div>
      <Container13 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <GaugeVisualization />
    </div>
  );
}

function SectionFinancialHealthScoreHero() {
  return (
    <div className="bg-[#141b2c] relative rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Section - Financial Health Score Hero">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[32px] relative w-full">
          <div className="absolute bg-gradient-to-l bottom-0 from-[rgba(149,247,185,0.1)] left-1/2 right-0 to-[rgba(149,247,185,0)] top-0" data-name="Decorative Gradient Background" />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[14px] tracking-[1.4px] uppercase w-[141.23px]">
        <p className="leading-[20px]">Smart Insights</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(69,71,76,0.6)] w-[237.92px]">
        <p className="leading-[16px]">Real-time analysis powered by Reserve AI</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[237.92px]" data-name="Container">
      <Heading />
      <Container17 />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[14px] text-center w-[55.66px]">
        <p className="leading-[20px]">View All</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end justify-between px-[8px] relative w-full">
          <Container16 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[18px] relative shrink-0 w-[19px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
        <g id="Container">
          <path d={svgPaths.p3f8e080} fill="var(--fill-0, #319560)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(149,247,185,0.2)] relative rounded-[8px] shrink-0 size-[48px]" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container19 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[16px] w-[139.11px]">
        <p className="leading-[20px]">Projected Surplus</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[14px] w-[205.14px]">
        <p className="mb-0">
          <span className="leading-[20px]">{`You can safely move `}</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1a1c1d]">$1,200</span>
          <span className="leading-[20px]">{` to`}</span>
        </p>
        <p className="leading-[20px] mb-0">your Vault this Friday based on</p>
        <p className="leading-[20px]">your recurring expenses.</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#95f7b9] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#002110] text-[12px] text-center w-[80.28px]">
        <p className="leading-[16px]">Move to Vault</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-full relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] h-full items-start relative">
        <Heading1 />
        <Container21 />
        <Button1 />
      </div>
    </div>
  );
}

function InsightCard() {
  return (
    <div className="bg-white col-1 h-[178px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Insight Card 1">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_24px_0px_rgba(20,27,44,0.04)]" />
      <div className="content-stretch flex gap-[20px] items-start p-[25px] relative size-full">
        <Overlay />
        <Container20 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20.05px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20.05">
        <g id="Container">
          <path d={svgPaths.p3132ac80} fill="var(--fill-0, #BA1A1A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(255,218,214,0.4)] relative rounded-[8px] shrink-0 size-[48px]" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container22 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[16px] w-[142.17px]">
        <p className="leading-[20px]">Subscription Alert</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[14px] w-[211.11px]">
        <p className="leading-[20px] mb-0">Unusual price hike detected in</p>
        <p className="mb-0">
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1a1c1d]">CloudStream Premium</span>
          <span className="leading-[20px]">. ($14.99</span>
        </p>
        <p className="leading-[20px]">→ $19.99).</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[12px] text-center w-[94.52px]">
        <p className="leading-[16px]">Review Charges</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-full relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] h-full items-start relative">
        <Heading2 />
        <Container24 />
        <Button2 />
      </div>
    </div>
  );
}

function InsightCard1() {
  return (
    <div className="bg-white col-1 h-[162px] justify-self-stretch relative rounded-[12px] row-2 shrink-0" data-name="Insight Card 2">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_24px_0px_rgba(20,27,44,0.04)]" />
      <div className="content-stretch flex gap-[20px] items-start p-[25px] relative size-full">
        <Overlay1 />
        <Container23 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__178px_162px] relative shrink-0 w-full" data-name="Container">
      <InsightCard />
      <InsightCard1 />
    </div>
  );
}

function SectionSmartInsightsAiAdvisory() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section - Smart Insights / AI Advisory">
      <Container15 />
      <Container18 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[14px] tracking-[1.4px] uppercase w-full">
          <p className="leading-[20px]">Budget Allocation</p>
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[64px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[24px] w-[119.45px]">
        <p className="leading-[32px] mb-0">{`Housing &`}</p>
        <p className="leading-[32px]">Living</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[14px] w-[117.98px]">
        <p className="leading-[20px] mb-0">{`Main Residence &`}</p>
        <p className="leading-[20px]">Utilities</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[119.45px]" data-name="Container">
      <Heading4 />
      <Container28 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal h-[44px] leading-[0] not-italic relative shrink-0 w-[109.38px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col h-[28px] justify-center left-0 text-[#141b2c] text-[20px] top-[14px] w-[77.84px]">
        <p className="leading-[28px]">{`$3,250 `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[16px] justify-center left-[77.84px] text-[#3f4759] text-[12px] top-[16.5px] w-[4.44px]">
        <p className="leading-[16px]">/</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[16px] justify-center left-0 text-[#3f4759] text-[12px] top-[35.5px] w-[41.78px]">
        <p className="leading-[16px]">$4,000</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Paragraph1 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e2e2e3] h-[12px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#79da9e] inset-[0_19%_0_0]" data-name="Background" />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(69,71,76,0.7)] tracking-[1px] uppercase w-[80.55px]">
        <p className="leading-[15px]">81% Utilized</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(69,71,76,0.7)] tracking-[1px] uppercase w-[99.39px]">
        <p className="leading-[15px]">$750 Remaining</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Container30 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[10px] w-[26.95px]">
        <p className="leading-[15px]">RENT</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[16px] w-[57.44px]">
        <p className="leading-[24px]">$2,800</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[89.44px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[8px] relative size-full">
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[10px] w-[40.88px]">
        <p className="leading-[15px]">ENERGY</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[16px] w-[41.92px]">
        <p className="leading-[24px]">$240</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[73.92px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[8px] relative size-full">
        <Container35 />
        <Container36 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[10px] w-[35.56px]">
        <p className="leading-[15px]">WATER</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[16px] w-[38.25px]">
        <p className="leading-[24px]">$210</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[70.25px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[8px] relative size-full">
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div className="content-stretch flex gap-[16px] items-start overflow-clip pt-[17px] relative rounded-[inherit] size-full">
        <Background2 />
        <Background3 />
        <Background4 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(198,198,205,0.2)] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function LargeMainCategory() {
  return (
    <div className="bg-[#f3f3f4] col-1 justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Large Main Category">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
        <Container26 />
        <Container29 />
        <HorizontalBorder />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[20px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 20">
        <g id="Container">
          <path d={svgPaths.p23cfd7c0} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[12px] tracking-[-0.6px] uppercase w-[62.84px]">
        <p className="leading-[16px]">Near Limit</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container40 />
        <Container41 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Dining</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[20px] w-full">
        <p className="leading-[28px]">$780 / $800</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container43 />
        <Container44 />
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#e2e2e3] h-[6px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#ba1a1a] inset-[0_3%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function Dining() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Dining">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Container39 />
        <Container42 />
        <Background5 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[18.15px] relative shrink-0 w-[20.679px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6794 18.15">
        <g id="Container">
          <path d={svgPaths.p37534660} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#79da9e] text-[12px] tracking-[-0.6px] uppercase w-[52.47px]">
        <p className="leading-[16px]">Healthy</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Travel</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[20px] w-full">
        <p className="leading-[28px]">$1,200 / $2,500</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#e2e2e3] h-[6px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#79da9e] inset-[0_52%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function Travel() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Travel">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Container45 />
        <Container48 />
        <Background6 />
      </div>
    </div>
  );
}

function VerticalStats() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Vertical Stats">
      <Dining />
      <Travel />
    </div>
  );
}

function Container25() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__327px_336px] relative shrink-0 w-full" data-name="Container">
      <LargeMainCategory />
      <VerticalStats />
    </div>
  );
}

function SectionBudgetBreakdownBentoGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section - Budget Breakdown Bento Grid">
      <Heading3 />
      <Container25 />
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="Container">
          <path d={svgPaths.pb589888} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#141b2c] content-stretch flex gap-[8px] items-center justify-center px-[81.95px] py-[16px] relative rounded-[12px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_-0.02px_0_0] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <Container51 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white w-[146.08px]">
        <p className="leading-[28px]">Optimize Budget</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#e2e2e3] content-stretch flex flex-col items-center justify-center pl-[113.84px] pr-[113.86px] py-[16px] relative rounded-[12px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[18px] text-center w-[114.3px]">
        <p className="leading-[28px]">Adjust Limits</p>
      </div>
    </div>
  );
}

function CtaSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pt-[24px] relative shrink-0 w-full" data-name="CTA Section">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[896px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="content-stretch flex flex-col gap-[40px] items-start max-w-[inherit] px-[24px] py-[32px] relative w-full">
        <SectionFinancialHealthScoreHero />
        <SectionSmartInsightsAiAdvisory />
        <SectionBudgetBreakdownBentoGrid />
        <CtaSection />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-[#f9f9fa] content-stretch flex flex-col isolate items-start left-0 min-h-[2070px] pb-[96px] right-0 top-0" data-name="Body">
      <HeaderTopAppBar />
      <Container4 />
      <Main />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <Body />
    </div>
  );
}