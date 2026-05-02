import svgPaths from "./svg-2kihui9cpb";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[149.13px]">
        <p className="leading-[24px]">Continue to Review</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p1a406200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-gradient-to-r drop-shadow-[0px_8px_16px_rgba(25,28,29,0.12)] flex-[1_0_0] from-black max-w-[448px] min-w-px relative rounded-[4px] to-[#141b2c]" data-name="Button">
      <div className="flex flex-row items-center justify-center max-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center max-w-[inherit] px-[32px] py-[16px] relative size-full">
          <Container />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function FixedBottomActionArea() {
  return (
    <div className="absolute bg-gradient-to-t bottom-0 content-stretch flex from-[#f8f9fa] items-start justify-center left-0 pb-[32px] pt-[16px] px-[24px] right-0 to-[rgba(248,249,250,0)] via-1/2 via-[#f8f9fa] z-[3]" data-name="Fixed Bottom Action Area">
      <Button />
    </div>
  );
}

function Container2() {
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

function Button1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[-8px] p-[8px] rounded-[4px] top-0" data-name="Button">
      <Container2 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="h-[48px] relative shrink-0 w-[32.02px]" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#141b2c] text-[18px] tracking-[-0.9px] w-[100.78px]">
        <p className="leading-[28px]">Bill Payment</p>
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="bg-[#f8f9fa] relative shrink-0 w-full z-[2]" data-name="Header - TopAppBar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[24px] pr-[148.61px] py-[16px] relative size-full">
          <ButtonMargin />
          <Heading />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">PAYING VIA</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p5df7b00} fill="var(--fill-0, #7C8498)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#141b2c] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <Container5 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-[191.97px]">
        <p className="leading-[24px]">Precision Bank Checking</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[14px] w-[66.56px]">
        <p className="leading-[20px]">**** 4592</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[191.97px]" data-name="Container">
      <Heading1 />
      <Container7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Background1 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.pad10a80} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Button">
      <Container8 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Container4 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function ContextSelectedGateway() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Context: Selected Gateway">
      <Container3 />
      <Background />
    </div>
  );
}

function ContextSelectedGatewayMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Context: Selected Gateway:margin">
      <ContextSelectedGateway />
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[113.38px] pb-[8px] top-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-[115.25px]">
        <p className="leading-[16px]">AMOUNT TO PAY</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[20px] items-start left-[139px] pt-[16px] top-[115px] w-[64px]" data-name="Margin">
      <div className="bg-[#95f7b9] h-[4px] rounded-[12px] shrink-0 w-[64px]" data-name="Background" />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[48px] overflow-clip right-[31px] top-[16px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[59px] justify-center leading-[0] not-italic relative shrink-0 text-[#e1e3e4] text-[48px] text-center tracking-[-1.2px] w-[105.55px]">
        <p className="leading-[normal]">0.00</p>
      </div>
    </div>
  );
}

function Container12() {
  return <div className="flex-[1_0_0] h-[59px] min-w-px" data-name="Container" />;
}

function RectangleAlignStretch() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex items-center left-[48px] right-[16px] top-[16px]" data-name="Container">
      <Container12 />
      <div className="flex flex-row items-center self-stretch">
        <RectangleAlignStretch />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="h-[91px] overflow-clip relative shrink-0 w-full" data-name="Input">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bottom-[32.42%] content-stretch flex flex-col items-start left-[16px] top-[32.42%]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[24px] w-[15.52px]">
        <p className="leading-[32px]">$</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[31px] max-w-[280px] right-[31px] top-[24px]" data-name="Container">
      <Input />
      <Container13 />
    </div>
  );
}

function TheVaultMetricAmountInput() {
  return (
    <div className="h-[135px] relative shrink-0 w-full" data-name="The Vault Metric: Amount Input">
      <Margin />
      <Margin1 />
      <Container9 />
    </div>
  );
}

function TheVaultMetricAmountInputMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="The Vault Metric: Amount Input:margin">
      <TheVaultMetricAmountInput />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">BILLER INSTITUTION</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-[101.95px]">
          <p className="leading-[24px]">Select Biller...</p>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[7.4px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7.4">
        <g id="Container">
          <path d={svgPaths.p1adfde00} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[17px] relative size-full">
          <Container14 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function BillerSelection() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Biller Selection">
      <Label />
      <Button3 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">ACCOUNT NUMBER</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#e1e3e4] text-[16px] w-full">
          <p className="leading-[normal]">e.g. 1234567890</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[17px] py-[19px] relative size-full">
          <Container16 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function AccountNumberInput() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Account Number Input">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">REFERENCE NOTE (OPTIONAL)</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#e1e3e4] text-[16px] w-full">
          <p className="leading-[normal]">e.g. October Utilities</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[17px] py-[19px] relative size-full">
          <Container17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(198,198,205,0.15)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function ReferenceNotesInput() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Reference / Notes Input">
      <Label2 />
      <Input2 />
    </div>
  );
}

function BillerDetailsForm() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[47px] relative shrink-0 w-full" data-name="Biller Details Form">
      <BillerSelection />
      <AccountNumberInput />
      <ReferenceNotesInput />
    </div>
  );
}

function MainContent() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[128px] pt-[24px] px-[24px] relative size-full">
          <ContextSelectedGatewayMargin />
          <TheVaultMetricAmountInputMargin />
          <BillerDetailsForm />
        </div>
      </div>
    </div>
  );
}

export default function PaymentDetails() {
  return (
    <div className="content-stretch drop-shadow-[0px_0px_32px_rgba(25,28,29,0.08)] flex flex-col isolate items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Payment Details">
      <FixedBottomActionArea />
      <HeaderTopAppBar />
      <MainContent />
    </div>
  );
}