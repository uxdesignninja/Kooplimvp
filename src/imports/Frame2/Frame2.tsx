import svgPaths from "./svg-t1cq408yq";

function Margin() {
  return (
    <div className="h-[22px] relative shrink-0 w-[16px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 22">
        <g id="Margin">
          <path d={svgPaths.p12a32500} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[11px] tracking-[0.275px] uppercase w-[34.41px]">
        <p className="leading-[16.5px]">Home</p>
      </div>
    </div>
  );
}

function LinkHome() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[37.5px] opacity-70 top-[calc(50%-6px)]" data-name="Link - Home">
      <Margin />
      <Container />
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[22px] relative shrink-0 w-[20px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
        <g id="Margin">
          <path d={svgPaths.p1511dfb0} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[11px] tracking-[0.275px] uppercase w-[67.364px]">
        <p className="leading-[16.5px]">Transfers</p>
      </div>
    </div>
  );
}

function LinkTransfersActive() {
  return (
    <div className="content-stretch flex flex-col gap-[0.355px] items-center justify-center relative" data-name="Link - Transfers (Active)">
      <Margin1 />
      <Container1 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[22px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20">
        <g id="Margin">
          <path d={svgPaths.p26835240} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[11px] tracking-[0.275px] uppercase w-[47.67px]">
        <p className="leading-[16.5px]">Wealth</p>
      </div>
    </div>
  );
}

function LinkWealth() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[225.3px] opacity-70 top-[calc(50%-6px)]" data-name="Link - Wealth">
      <Margin2 />
      <Container2 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[25px] relative shrink-0 w-[16px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 25">
        <g id="Margin">
          <path d={svgPaths.p12930f00} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[11px] tracking-[0.275px] uppercase w-[36.48px]">
        <p className="leading-[16.5px]">Vault</p>
      </div>
    </div>
  );
}

function LinkVault() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[315.98px] opacity-70 top-[calc(50%-6px)]" data-name="Link - Vault">
      <Margin3 />
      <Container3 />
    </div>
  );
}

function BottomNavigationBar() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(255,255,255,0.85)] bottom-[-0.25px] h-[80.5px] left-0 rounded-tl-[16px] rounded-tr-[16px] shadow-[0px_-4px_24px_0px_rgba(20,27,44,0.06)] w-[390px] z-[3]" data-name="Bottom Navigation Bar">
      <LinkHome />
      <div className="-translate-y-1/2 absolute flex h-[43.29px] items-center justify-center left-[111.55px] top-[calc(50%-5.99px)] w-[74.1px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "38" } as React.CSSProperties}>
        <div className="flex-none scale-x-[110.00000000000001%] scale-y-[110.00000000000001%]">
          <LinkTransfersActive />
        </div>
      </div>
      <LinkWealth />
      <LinkVault />
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Button">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Button">
          <path d={svgPaths.p224f8bc0} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[18px] tracking-[-0.45px] w-[79.28px]">
        <p className="leading-[28px]">Transfers</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button />
      <Heading />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[20px] tracking-[-1px] w-[133.11px]">
        <p className="leading-[28px]">Equity Reserve</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative w-full">
          <Container5 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function HeaderTopNavigationAnchor() {
  return (
    <div className="bg-[#f3f3f4] content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]" data-name="Header - Top Navigation Anchor">
      <Container4 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#e2e2e3] content-stretch flex items-start left-0 px-[12px] py-[4px] rounded-[9999px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[11px] tracking-[1.1px] uppercase w-[138.48px]">
        <p className="leading-[16.5px]">New Liquidity Node</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[40.5px]" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[45px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[36px] tracking-[-1.8px] w-[295.33px]">
        <p className="leading-[45px]">Create Sub-Wallet</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[93.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[78px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[16px] w-[332.63px]">
        <p className="leading-[26px] mb-0">Define a precision-targeted container within</p>
        <p className="mb-0">
          <span className="leading-[26px]">{`the `}</span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26px] not-italic text-[#141b2c]">Equity Reserve</span>
          <span className="leading-[26px]">{` ecosystem. Segregate`}</span>
        </p>
        <p className="leading-[26px]">your assets with institutional clarity.</p>
      </div>
    </div>
  );
}

function HeroSectionContext() {
  return (
    <div className="h-[171.5px] relative shrink-0 w-full" data-name="Hero Section / Context">
      <Background />
      <Heading1 />
      <Container7 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Wallet Designation</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#76777d] text-[18px] w-full">
        <p className="leading-[normal]">e.g. Travel fund, Rent, Q4 Tax Reserve</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#e2e2e3] relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[20px] pt-[19px] px-[20px] relative w-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function InputSection() {
  return (
    <div className="bg-white relative rounded-[12px] shadow-[0px_4px_20px_0px_rgba(20,27,44,0.04)] shrink-0 w-full" data-name="Input Section">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[32px] relative w-full">
        <Label />
        <Input />
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">Visual Anchor</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3c3cf300} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIconOptions() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center justify-self-start pl-[18.23px] pr-[18.25px] py-[14.25px] relative rounded-[12px] row-1 self-start shrink-0" data-name="Button - Icon Options">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#141b2c] col-2 content-stretch flex items-center justify-center justify-self-start pl-[18.23px] pr-[18.25px] py-[14.25px] relative rounded-[12px] row-1 self-start shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.98px_0_0] rounded-[12px] shadow-[0px_0px_0px_2px_#f3f3f4,0px_0px_0px_4px_#141b2c,0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p5df7b00} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white col-3 content-stretch flex items-center justify-center justify-self-start pl-[18.23px] pr-[18.25px] py-[14.25px] relative rounded-[12px] row-1 self-start shrink-0" data-name="Button">
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p3faf9100} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white col-4 content-stretch flex items-center justify-center justify-self-start pl-[18.23px] pr-[18.25px] py-[14.25px] relative rounded-[12px] row-1 self-start shrink-0" data-name="Button">
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[19px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
        <g id="Container">
          <path d={svgPaths.p37546d20} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white col-1 content-stretch flex items-center justify-center justify-self-start pl-[18.23px] pr-[18.25px] py-[14.25px] relative rounded-[12px] row-2 self-start shrink-0" data-name="Button">
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
        <g id="Container">
          <path d={svgPaths.p2d32e900} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white col-2 content-stretch flex items-center justify-center justify-self-start pl-[18.23px] pr-[18.25px] py-[14.25px] relative rounded-[12px] row-2 self-start shrink-0" data-name="Button">
      <Container15 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[18px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 18">
        <g id="Container">
          <path d={svgPaths.pb257040} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white col-3 content-stretch flex items-center justify-center justify-self-start pl-[18.23px] pr-[18.25px] py-[14.25px] relative rounded-[12px] row-2 self-start shrink-0" data-name="Button">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 size-[19.8px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.8 19.8">
        <g id="Container">
          <path d={svgPaths.p2246b680} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white col-4 content-stretch flex items-center justify-center justify-self-start pl-[18.23px] pr-[18.25px] py-[14.25px] relative rounded-[12px] row-2 self-start shrink-0" data-name="Button">
      <Container17 />
    </div>
  );
}

function Container9() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[__60.50px_60.50px] relative shrink-0 w-full" data-name="Container">
      <ButtonIconOptions />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function SectionIconSelectionBentoStyle() {
  return (
    <div className="bg-[#f3f3f4] relative rounded-[12px] shrink-0 w-full" data-name="Section - Icon Selection (Bento Style)">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
        <Label1 />
        <Container9 />
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="h-[42.5px] relative shrink-0 w-[46px]" data-name="Overlay">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 42.5">
        <g id="Overlay">
          <rect fill="var(--fill-0, #95F7B9)" fillOpacity="0.2" height="42.5" rx="8" width="46" />
          <path d={svgPaths.p22cdc080} fill="var(--fill-0, #319560)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[16px] w-[92.75px]">
        <p className="leading-[24px] mb-0">Auto-Invest</p>
        <p className="leading-[24px]">Liquidity</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[14px] w-[149.9px]">
        <p className="leading-[20px] mb-0">Deploy idle capital into</p>
        <p className="leading-[20px] mb-0">Equity Reserve funds</p>
        <p className="leading-[20px]">automatically.</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[149.9px]" data-name="Container">
      <Heading2 />
      <Container21 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Overlay />
      <Container20 />
    </div>
  );
}

function LabelCustomToggle() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Label - Custom Toggle">
      <div className="bg-[#95f7b9] h-[32px] rounded-[9999px] shrink-0 w-[56px]" data-name="Background" />
      <div className="absolute bg-white left-[28px] rounded-[9999px] size-[24px] top-[4px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <LabelCustomToggle />
    </div>
  );
}

function SectionStrategicFeatures() {
  return (
    <div className="bg-white relative rounded-[12px] shadow-[0px_4px_20px_0px_rgba(20,27,44,0.04)] shrink-0 w-full" data-name="Section - Strategic Features">
      <div className="content-stretch flex flex-col items-start p-[32px] relative w-full">
        <Container18 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p2e0f2ff0} fill="var(--fill-0, #95F7B9)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#95f7b9] text-[10px] tracking-[2px] uppercase w-[189.47px]">
        <p className="leading-[15px]">Vault Security Protocol</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[384px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7c8498] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">All sub-wallets are protected by multi-</p>
        <p className="leading-[22.75px] mb-0">signature governance and instant</p>
        <p className="leading-[22.75px]">withdrawal liquidity paths.</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[6.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container26 />
    </div>
  );
}

function VisualContextCard() {
  return (
    <div className="bg-[#141b2c] min-h-[160px] relative rounded-[16px] shrink-0 w-full" data-name="Visual Context Card">
      <div className="flex flex-col justify-end min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end min-h-[inherit] p-[32px] relative w-full">
          <div className="absolute inset-[0_0_-0.25px_0] mix-blend-overlay opacity-40" data-name="Gradient" style={{ backgroundImage: "linear-gradient(135.706deg, rgba(20, 27, 44, 0) 0%, rgb(20, 27, 44) 100%)" }} />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#141b2c] content-stretch flex items-center justify-center py-[20px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_20px_25px_-5px_rgba(20,27,44,0.2),0px_8px_10px_-6px_rgba(20,27,44,0.2)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white w-[160.45px]">
        <p className="leading-[28px]">Create Sub-Wallet</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(69,71,76,0.6)] text-center tracking-[1.2px] uppercase w-[334.45px]">
        <p className="leading-[16px] mb-0">Authorized Transaction • Precision Vault</p>
        <p className="leading-[16px]">v4.2</p>
      </div>
    </div>
  );
}

function PrimaryAction() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[16px] relative shrink-0 w-full" data-name="Primary Action">
      <Button8 />
      <Container27 />
    </div>
  );
}

function ConfigurationForm() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Configuration Form">
      <InputSection />
      <SectionIconSelectionBentoStyle />
      <SectionStrategicFeatures />
      <VisualContextCard />
      <PrimaryAction />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[672px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="content-stretch flex flex-col gap-[40px] items-start max-w-[inherit] pb-[48px] pt-[32px] px-[24px] relative w-full">
        <HeroSectionContext />
        <ConfigurationForm />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-[#f9f9fa] content-stretch flex flex-col isolate items-start left-0 min-h-[1459px] pb-[98.25px] right-0 top-0" data-name="Body">
      <BottomNavigationBar />
      <HeaderTopNavigationAnchor />
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