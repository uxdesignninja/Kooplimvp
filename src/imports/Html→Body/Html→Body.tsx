import svgPaths from "./svg-93zjeynhrd";
import imgFinancialEducation from "./8d9609ad1037cc86ca021ce12b0586a1f53856d6.png";

function Container() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p15494480} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] items-center justify-center px-[32px] py-[12px] relative shrink-0" data-name="Button">
      <Container />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[14px] text-center w-[85.75px]">
        <p className="leading-[20px]">Skip for Now</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p1a406200} fill="var(--fill-0, #002110)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#95f7b9] content-stretch flex flex-col gap-[3.5px] items-center justify-center px-[32px] py-[12px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container1 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#002110] text-[14px] text-center w-[60.52px]">
        <p className="leading-[20px]">Continue</p>
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.85)] bottom-0 content-stretch drop-shadow-[0px_-4px_20px_rgba(20,27,44,0.06)] flex items-center justify-between left-0 px-[32px] py-[24px] rounded-tl-[12px] rounded-tr-[12px] w-[390px] z-[3]" data-name="BottomNavBar">
      <Button />
      <Button1 />
    </div>
  );
}

function Container3() {
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

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container3 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[18px] tracking-[-0.45px] w-[95.13px]">
        <p className="leading-[28px]">Verification</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button2 />
      <Heading />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[14px] text-center tracking-[-0.35px] w-[29.72px]">
        <p className="leading-[20px]">Help</p>
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="bg-[#f9f9fa] relative shrink-0 w-full z-[2]" data-name="Header - TopAppBar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative size-full">
          <Container2 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[12px] tracking-[0.6px] uppercase w-[134.34px]">
        <p className="leading-[16px]">CURRENT PROGRESS</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[14px] w-[92.98px]">
        <p className="leading-[20px]">0% Complete</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e8e8e9] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#79da9e] inset-[0_95%_0_0]" data-name="Background" />
    </div>
  );
}

function ProgressSection() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Progress Section">
      <Container4 />
      <Background />
    </div>
  );
}

function FinancialEducation() {
  return (
    <div className="h-[192.38px] mix-blend-overlay opacity-60 relative shrink-0 w-full" data-name="Financial education">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[177.77%] left-0 max-w-none top-[-38.89%] w-full" src={imgFinancialEducation} />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 21">
        <g id="Container">
          <path d="M0 21V0L16.5 10.5L0 21V21" fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[64px]" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex inset-0 items-center justify-center" data-name="Container">
      <OverlayBorderOverlayBlur />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#141b2c] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <FinancialEducation />
      <Container7 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[36px] tracking-[-0.9px] w-full">
        <p className="leading-[45px] mb-0">Mastering Your</p>
        <p className="leading-[45px]">Cooperative</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[18px] w-full">
        <p className="leading-[29.25px] mb-0">A quick 2-minute session on how</p>
        <p className="leading-[29.25px] mb-0">cooperatives empower your financial</p>
        <p className="leading-[29.25px]">growth.</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container10 />
    </div>
  );
}

function SectionHeroContent() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Section - Hero Content">
      <Background1 />
      <Container9 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[20px]">LEARNING PATH</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p378800} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f3f3f4] relative rounded-[8px] shrink-0 size-[40px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[16px] w-full">
        <p className="leading-[24px] mb-0">What is a</p>
        <p className="leading-[24px]">Cooperative?</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Foundational</p>
        <p className="leading-[20px] mb-0">principles and</p>
        <p className="leading-[20px]">structure</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading3 />
        <Container13 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p29478120} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] w-[51.06px]">
        <p className="leading-[16px]">45s read</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f3f3f4] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[12px] py-[4px] relative size-full">
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function LearningItem() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_10px_rgba(20,27,44,0.02)] relative rounded-[12px] shrink-0 w-full" data-name="Learning Item 1">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pb-[21px] pt-[29px] px-[21px] relative size-full">
          <Background2 />
          <Container12 />
          <Background3 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p26835240} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f3f3f4] relative rounded-[8px] shrink-0 size-[40px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container16 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Member</p>
        <p className="leading-[24px]">Benefits</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Profit sharing and</p>
        <p className="leading-[20px]">lower interest rates</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading4 />
        <Container18 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[9.333px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 9.33333">
        <g id="Container">
          <path d={svgPaths.p37657300} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] w-[50.98px]">
        <p className="leading-[16px]">1m video</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f3f3f4] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[12px] py-[4px] relative size-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function LearningItem1() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_10px_rgba(20,27,44,0.02)] relative rounded-[12px] shrink-0 w-full" data-name="Learning Item 2">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[21px] relative size-full">
          <Background4 />
          <Container17 />
          <Background5 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[19.476px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19.476">
        <g id="Container">
          <path d={svgPaths.p26bd0ea8} fill="var(--fill-0, #141B2C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f3f3f4] relative rounded-[8px] shrink-0 size-[40px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container21 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1c1d] text-[16px] w-full">
        <p className="leading-[24px]">Voting Rights</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f4759] text-[14px] w-full">
        <p className="leading-[20px] mb-0">How your voice</p>
        <p className="leading-[20px]">shapes our future</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading5 />
        <Container23 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p29478120} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] w-[51.27px]">
        <p className="leading-[16px]">30s read</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f3f3f4] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.99px] items-center px-[12px] py-[4px] relative size-full">
        <Container24 />
        <Container25 />
      </div>
    </div>
  );
}

function LearningItem2() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_10px_rgba(20,27,44,0.02)] opacity-75 relative rounded-[12px] shrink-0 w-full" data-name="Learning Item 3">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[21px] relative size-full">
          <Background6 />
          <Container22 />
          <Background7 />
        </div>
      </div>
    </div>
  );
}

function SectionSyllabusLearningObjectives() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pt-[8px] relative shrink-0 w-full" data-name="Section - Syllabus / Learning Objectives">
      <Heading2 />
      <LearningItem />
      <LearningItem1 />
      <LearningItem2 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#95f7b9] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">WHY IT MATTERS</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[27.5px] mb-0">{`In a cooperative, you're not`}</p>
        <p className="leading-[27.5px] mb-0">{`just a customer—you're a`}</p>
        <p className="leading-[27.5px] mb-0">shareholder. Every member</p>
        <p className="leading-[27.5px] mb-0">has an equal vote, regardless</p>
        <p className="leading-[27.5px]">of their balance.</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function EditorialInfoCard() {
  return (
    <div className="bg-[#141b2c] relative rounded-[12px] shrink-0 w-full" data-name="Editorial Info Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[24px] pt-[40px] px-[24px] relative size-full">
          <div className="absolute bg-[rgba(149,247,185,0.1)] blur-[32px] bottom-[-39.5px] right-[-40px] rounded-[9999px] size-[160px]" data-name="Aesthetic abstract shape" />
          <Container26 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[672px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] pb-[128px] pt-[16px] px-[24px] relative size-full">
        <ProgressSection />
        <SectionHeroContent />
        <SectionSyllabusLearningObjectives />
        <EditorialInfoCard />
      </div>
    </div>
  );
}

export default function HtmlBody() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[6.37px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(249, 249, 250) 0%, rgb(249, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Html → Body">
      <BottomNavBar />
      <HeaderTopAppBar />
      <Main />
    </div>
  );
}