import svgPaths from "./svg-ney5fdmxod";

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
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[37.38px] opacity-70 top-[calc(50%-6px)]" data-name="Link - Home">
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
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[11px] tracking-[0.275px] uppercase w-[68.409px]">
        <p className="leading-[16.5px]">Transfers</p>
      </div>
    </div>
  );
}

function LinkTransfersActiveState() {
  return (
    <div className="content-stretch flex flex-col gap-[0.355px] items-center justify-center relative" data-name="Link - Transfers (ACTIVE STATE)">
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
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[225.69px] opacity-70 top-[calc(50%-6px)]" data-name="Link - Wealth">
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
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[316.11px] opacity-70 top-[calc(50%-6px)]" data-name="Link - Vault">
      <Margin3 />
      <Container3 />
    </div>
  );
}

function BottomNavigationShellDestinationMappingTransfersActive() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(255,255,255,0.85)] bottom-0 h-[80.5px] left-0 rounded-tl-[16px] rounded-tr-[16px] shadow-[0px_-4px_24px_0px_rgba(20,27,44,0.06)] w-[390px] z-[3]" data-name="Bottom Navigation Shell (Destination Mapping: Transfers Active)">
      <LinkHome />
      <div className="-translate-y-1/2 absolute flex h-[43.29px] items-center justify-center left-[111.11px] top-[calc(50%-5.99px)] w-[75.25px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "38" } as React.CSSProperties}>
        <div className="flex-none scale-x-[110.00000000000001%] scale-y-[110.00000000000001%]">
          <LinkTransfersActiveState />
        </div>
      </div>
      <LinkWealth />
      <LinkVault />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p300a1100} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container5 />
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

function Container4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button />
      <Heading />
    </div>
  );
}

function HeaderTopNavigationAnchor() {
  return (
    <div className="bg-[#f9f9fa] relative shrink-0 w-full z-[2]" data-name="Header - Top Navigation Anchor">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative w-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[30px] tracking-[-0.75px] w-full">
        <p className="leading-[36px]">Select Transfer Mode</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[16px] w-full">
        <p className="leading-[26px] mb-0">Choose the optimal path for your capital</p>
        <p className="leading-[26px]">movement.</p>
      </div>
    </div>
  );
}

function SectionEditorialHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section - Editorial Header">
      <Heading1 />
      <Container6 />
    </div>
  );
}

function Background() {
  return (
    <div className="h-[42px] relative shrink-0 w-[44px]" data-name="Background">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 42">
        <g id="Background">
          <rect fill="var(--fill-0, #D7E3FC)" height="42" rx="8" width="44" />
          <path d={svgPaths.p2aa1fcc0} fill="var(--fill-0, #0F1C2E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[25px] right-[25px] top-[25px]" data-name="Container">
      <Background />
      <div className="h-[20px] relative shrink-0 w-[11.775px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.775 20">
          <path d={svgPaths.p1c96f700} fill="var(--fill-0, #C6C6CD)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[113px]" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[20px] w-[131.05px]">
        <p className="leading-[28px]">Send Directly</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] max-w-[273.6000061035156px] right-[83.41px] top-[145px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[39px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[14px] w-[209.83px]">
        <p className="leading-[19.25px] mb-0">Instant transmission to external</p>
        <p className="leading-[19.25px]">accounts and global recipients.</p>
      </div>
    </div>
  );
}

function ButtonSendDirectlyOption() {
  return (
    <div className="bg-white h-[208.5px] relative rounded-[12px] shrink-0 w-full" data-name="Button - Send Directly Option">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container7 />
        <Heading2 />
        <Container8 />
        <div className="absolute bg-[rgba(212,224,249,0.2)] blur-[20px] bottom-[-15px] right-[-15px] rounded-[9999px] size-[96px]" data-name="Abstract decorative background element" />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_20px_0px_rgba(20,27,44,0.04)]" />
    </div>
  );
}

function Background1() {
  return (
    <div className="h-[42px] relative shrink-0 w-[43px]" data-name="Background">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 42">
        <g id="Background">
          <rect fill="var(--fill-0, #95F7B9)" height="42" rx="8" width="43" />
          <path d={svgPaths.pb2abb00} fill="var(--fill-0, #002110)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[25px] right-[25px] top-[25px]" data-name="Container">
      <Background1 />
      <div className="h-[20px] relative shrink-0 w-[11.775px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.775 20">
          <path d={svgPaths.p1c96f700} fill="var(--fill-0, #C6C6CD)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[113px]" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[20px] w-[176.89px]">
        <p className="leading-[28px]">Add to Sub-Wallet</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[145px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[58px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[14px] w-[257.09px]">
        <p className="leading-[19.25px] mb-0">Organize your funds into custom</p>
        <p className="leading-[19.25px] mb-0">categories for better management and</p>
        <p className="leading-[19.25px]">strategic allocation.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[12.833px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 12.25">
        <g id="Container">
          <path d={svgPaths.p3b404880} fill="var(--fill-0, #319560)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#319560] text-[10px] tracking-[1px] uppercase w-[128.88px]">
        <p className="leading-[15px]">Optimized Planning</p>
      </div>
    </div>
  );
}

function ContextualBenefitChip() {
  return (
    <div className="absolute bg-[rgba(121,218,158,0.2)] content-stretch flex gap-[8px] items-center left-[25px] px-[12px] py-[6px] rounded-[9999px] top-[226.75px]" data-name="Contextual Benefit Chip">
      <Container11 />
      <Container12 />
    </div>
  );
}

function ButtonAddToSubWalletOption() {
  return (
    <div className="bg-white h-[283.75px] relative rounded-[12px] shrink-0 w-full" data-name="Button - Add to Sub-Wallet Option">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container9 />
        <Heading3 />
        <Container10 />
        <ContextualBenefitChip />
        <div className="absolute bg-[rgba(149,247,185,0.1)] blur-[32px] bottom-[-15px] right-[-15px] rounded-[9999px] size-[128px]" data-name="Abstract decorative background element" />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_20px_0px_rgba(20,27,44,0.04)]" />
    </div>
  );
}

function SelectionCardsThePrecisionVaultStyle() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Selection Cards (The 'Precision Vault' Style)">
      <ButtonSendDirectlyOption />
      <ButtonAddToSubWalletOption />
    </div>
  );
}

function Margin4() {
  return (
    <div className="h-[22px] relative shrink-0 w-[20px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
        <g id="Margin">
          <path d={svgPaths.p24277c00} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-[150.5px]">
        <p className="leading-[16px]">Security Protocol</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[69px] justify-center leading-[0] not-italic relative shrink-0 text-[#3b475c] text-[14px] w-[243.53px]">
        <p className="leading-[22.75px] mb-0">All internal and external transfers are</p>
        <p className="leading-[22.75px] mb-0">protected by bank-grade encryption</p>
        <p className="leading-[22.75px]">and real-time fraud monitoring.</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[2.75px] items-start relative shrink-0 w-[243.53px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin4 />
      <Container14 />
    </div>
  );
}

function SectionInformationSurfaceLayer() {
  return (
    <div className="bg-[#f3f3f4] relative rounded-[12px] shrink-0 w-full" data-name="Section - Information Surface Layer">
      <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
        <Container13 />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[448px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[inherit] pt-[32px] px-[24px] relative w-full">
        <SectionEditorialHeader />
        <SelectionCardsThePrecisionVaultStyle />
        <SectionInformationSurfaceLayer />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-[#f9f9fa] content-stretch flex flex-col isolate items-start left-0 min-h-[1094px] pb-[141.5px] right-0 top-0" data-name="Body">
      <BottomNavigationShellDestinationMappingTransfersActive />
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