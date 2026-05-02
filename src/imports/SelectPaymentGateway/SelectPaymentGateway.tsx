import svgPaths from "./svg-fktvj5e16g";

function Container1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p300a1100} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonGoBack() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-8px] p-[8px] rounded-[12px] top-0" data-name="Button - Go back">
      <Container1 />
    </div>
  );
}

function ButtonGoBackMargin() {
  return (
    <div className="h-[40px] relative shrink-0 w-[32.02px]" data-name="Button - Go back:margin">
      <ButtonGoBack />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[18px] tracking-[-0.9px] w-[99px]">
        <p className="leading-[28px]">Bill Payment</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <ButtonGoBackMargin />
      <Heading />
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="bg-[#f8f9fa] relative shrink-0 w-full z-[2]" data-name="Header - TopAppBar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[112.56px] pb-[24px] top-0" data-name="Heading 2:margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.5px] w-[132.86px]">
        <p className="leading-[28px]">Scan QR Code</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[120.23px] pt-[24px] top-[308px]" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[117.52px]">
        <p className="leading-[24px]">Scan QR to Pay</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p27b37980} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] text-center w-[157.5px]">
          <p className="leading-[20px]">Upload QR from Gallery</p>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[25px] py-[11px] relative rounded-[12px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c6c6cd] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container2 />
      <Container3 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[61.25px] pt-[16px] top-[356px]" data-name="Button:margin">
      <Button />
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[32px] right-0 top-[414px]" data-name="Margin">
      <div className="h-px relative shrink-0 w-full" data-name="Horizontal Divider">
        <div aria-hidden="true" className="absolute border-[rgba(198,198,205,0.2)] border-solid border-t inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function ScannerIconRepresentation() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="Scanner Icon/Representation">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="Scanner Icon/Representation" opacity="0.4">
          <path d={svgPaths.p35f19900} fill="var(--fill-0, #C6C6CD)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#f3f4f5] left-1/2 rounded-[16px] size-[256px] top-[52px]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <div className="absolute left-[26px] rounded-tl-[4px] size-[32px] top-[26px]" data-name="Scanner Corner Accents">
          <div aria-hidden="true" className="absolute border-black border-l-4 border-solid border-t-4 inset-0 pointer-events-none rounded-tl-[4px]" />
        </div>
        <div className="absolute right-[26px] rounded-tr-[4px] size-[32px] top-[26px]" data-name="Border">
          <div aria-hidden="true" className="absolute border-black border-r-4 border-solid border-t-4 inset-0 pointer-events-none rounded-tr-[4px]" />
        </div>
        <div className="absolute bottom-[26px] left-[26px] rounded-bl-[4px] size-[32px]" data-name="Border">
          <div aria-hidden="true" className="absolute border-b-4 border-black border-l-4 border-solid inset-0 pointer-events-none rounded-bl-[4px]" />
        </div>
        <div className="absolute bottom-[26px] right-[26px] rounded-br-[4px] size-[32px]" data-name="Border">
          <div aria-hidden="true" className="absolute border-b-4 border-black border-r-4 border-solid inset-0 pointer-events-none rounded-br-[4px]" />
        </div>
        <ScannerIconRepresentation />
        <div className="-translate-y-1/2 absolute bg-[rgba(0,0,0,0.2)] h-[2px] left-[34px] right-[34px] top-[calc(50%+1px)]" data-name="Scanning Animation Line (Static Representation)" />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(198,198,205,0.3)] border-dashed inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="h-[447px] relative shrink-0 w-full" data-name="Section Title">
      <Heading2Margin />
      <Margin />
      <ButtonMargin />
      <Margin1 />
      <BackgroundBorder />
    </div>
  );
}

function SectionTitleMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Section Title:margin">
      <SectionTitle />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.5px] w-full">
        <p className="leading-[28px]">Select Payment Gateway</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[14px] w-full">
        <p className="leading-[20px]">Choose a method to complete your payment.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container5 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Margin">
      <Container4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0052e0] text-[18px] w-[13.52px]">
        <p className="leading-[28px]">G</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(0,82,224,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[48px]" data-name="Overlay">
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[51.55px]">
        <p className="leading-[24px]">GCash</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] w-[106.81px]">
        <p className="leading-[16px]">Pay via GCash app</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[106.81px]" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Overlay />
        <Container8 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #76777D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonOption1GCash() {
  return (
    <div className="bg-white col-1 h-[90px] justify-self-stretch relative rounded-[4px] row-1 shrink-0" data-name="Button - Option 1: GCash">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[21px] relative size-full">
          <Container6 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[18px] w-[16.78px]">
        <p className="leading-[28px]">M</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(20,27,44,0.05)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[48px]" data-name="Overlay">
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[42.16px]">
        <p className="leading-[24px]">Maya</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] w-[99.75px]">
        <p className="leading-[16px]">Pay via Maya app</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[99.75px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Overlay1 />
        <Container14 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #76777D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonOption2Maya() {
  return (
    <div className="bg-white col-1 h-[90px] justify-self-stretch relative rounded-[4px] row-2 shrink-0" data-name="Button - Option 2: Maya">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[21px] relative size-full">
          <Container12 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[19px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 19">
        <g id="Container">
          <path d={svgPaths.p38fbbc00} fill="var(--fill-0, #FF3B30)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(255,59,48,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[48px]" data-name="Overlay">
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[84.97px]">
        <p className="leading-[24px]">Dragonpay</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] w-[124.23px]">
        <p className="leading-[16px]">{`Online banking & OTC`}</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[124.23px]" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Overlay2 />
        <Container20 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #76777D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonOption3Dragonpay() {
  return (
    <div className="bg-white col-1 h-[90px] justify-self-stretch relative rounded-[4px] row-3 shrink-0" data-name="Button - Option 3: Dragonpay">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[21px] relative size-full">
          <Container18 />
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p5df7b00} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e7e8e9] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[48px]" data-name="Background">
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[107.95px]">
        <p className="leading-[24px]">Bank Transfer</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] w-[111.14px]">
        <p className="leading-[16px]">InstaPay / PESONet</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[111.14px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Background />
        <Container26 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #76777D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonOption4BankTransfer() {
  return (
    <div className="bg-white col-1 h-[90px] justify-self-stretch relative rounded-[4px] row-4 shrink-0" data-name="Button - Option 4: Bank Transfer">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[21px] relative size-full">
          <Container24 />
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p25774b00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#141b2c] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[48px]" data-name="Background">
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[112.08px]">
        <p className="leading-[24px] mb-0">Credit or Debit</p>
        <p className="leading-[24px]">Card</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] w-[125.81px]">
        <p className="leading-[16px]">Visa, Mastercard, JCB</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[125.81px]" data-name="Container">
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Background1 />
        <Container32 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[8px] w-[19.31px]">
        <p className="leading-[12px]">VISA</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e1e3e4] content-stretch flex h-[20px] items-center justify-center relative rounded-[2px] shrink-0 w-[32px]" data-name="Background">
      <Container37 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[8px] w-[13.38px]">
        <p className="leading-[12px]">MC</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e1e3e4] content-stretch flex h-[20px] items-center justify-center relative rounded-[2px] shrink-0 w-[32px]" data-name="Background">
      <Container38 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[4px] items-start opacity-60 relative shrink-0" data-name="Container">
      <Background2 />
      <Background3 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Margin">
      <Container36 />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #76777D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Margin3 />
        <Container39 />
      </div>
    </div>
  );
}

function ButtonOption5CreditDebitCard() {
  return (
    <div className="bg-white col-1 h-[108px] justify-self-stretch relative rounded-[4px] row-5 shrink-0" data-name="Button - Option 5: Credit/Debit Card">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[21px] relative size-full">
          <Container30 />
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function GatewayOptionsGrid() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[_____90px_90px_90px_90px_108px] relative shrink-0 w-full" data-name="Gateway Options Grid">
      <ButtonOption1GCash />
      <ButtonOption2Maya />
      <ButtonOption3Dragonpay />
      <ButtonOption4BankTransfer />
      <ButtonOption5CreditDebitCard />
    </div>
  );
}

function MainContentCanvas() {
  return (
    <div className="max-w-[768px] relative shrink-0 w-full z-[1]" data-name="Main Content Canvas">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center max-w-[inherit] pb-[136px] pt-[32px] px-[16px] relative size-full">
          <SectionTitleMargin />
          <Margin2 />
          <GatewayOptionsGrid />
        </div>
      </div>
    </div>
  );
}

export default function SelectPaymentGateway() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Select Payment Gateway">
      <HeaderTopAppBar />
      <MainContentCanvas />
    </div>
  );
}