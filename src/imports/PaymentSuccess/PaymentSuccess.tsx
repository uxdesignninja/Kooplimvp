import svgPaths from "./svg-314jwaj1io";

function Container() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Container">
          <path d={svgPaths.p3189c140} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#95f7b9] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[64px]" data-name="Background">
      <Container />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(149,247,185,0.2)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[96px]" data-name="Overlay">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] shadow-[0px_32px_64px_-12px_rgba(149,247,185,0.4)] size-[96px] top-0" data-name="Overlay+Shadow" />
      <Background />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[120px] items-start pb-[24px] relative shrink-0 w-[96px]" data-name="Margin">
      <Overlay />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[30px] text-center tracking-[-0.75px] w-[286.38px]">
        <p className="leading-[36px]">Payment Successful</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[320px] px-[26.83px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[52px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[16px] text-center w-[266.34px]">
        <p className="leading-[26px] mb-0">Your transaction has been securely</p>
        <p className="leading-[26px]">processed and confirmed.</p>
      </div>
    </div>
  );
}

function SuccessIndicatorHeader() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Success Indicator & Header">
      <Margin />
      <Heading1Margin />
      <Container1 />
    </div>
  );
}

function SuccessIndicatorHeaderMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0" data-name="Success Indicator & Header:margin">
      <SuccessIndicatorHeader />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] text-center tracking-[1.2px] uppercase w-[146.11px]">
          <p className="leading-[16px]">TOTAL AMOUNT PAID</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4.01px] items-start justify-center leading-[0] not-italic relative size-full text-center tracking-[-2.4px]">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[36px] justify-center relative shrink-0 text-[#45474c] text-[30px] w-[19.06px]">
          <p className="leading-[36px]">₱</p>
        </div>
        <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[48px] justify-center relative shrink-0 text-[#191c1d] text-[48px] w-[203.81px]">
          <p className="leading-[48px]">4,250.00</p>
        </div>
      </div>
    </div>
  );
}

function AmountHighlight() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pb-[33px] relative shrink-0 w-full" data-name="Amount Highlight">
      <div aria-hidden="true" className="absolute border-[#f3f4f5] border-b border-solid inset-0 pointer-events-none" />
      <Container2 />
      <Paragraph />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">RECIPIENT / BILLER</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] w-[284.28px]">
        <p className="leading-[24px]">Manila Electric Company (MERALCO)</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[284.28px]" data-name="Container">
      <Margin1 />
      <Container6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="col-1 content-stretch flex h-[44px] items-start justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">REFERENCE NUMBER</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] tracking-[-0.4px] w-[156.44px]">
        <p className="leading-[24px]">TRX-9982-441A-X9P</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[156.44px]" data-name="Container">
      <Margin2 />
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[9.917px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.91667 11.6667">
        <g id="Container">
          <path d={svgPaths.p29eb9000} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCopyReferenceNumber() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button - Copy reference number">
      <Container11 />
    </div>
  );
}

function Container7() {
  return (
    <div className="col-1 content-stretch flex h-[44px] items-start justify-between justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <Container8 />
      <ButtonCopyReferenceNumber />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">{`DATE & TIME`}</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[176.45px]">
        <p className="leading-[20px]">Oct 24, 2023 at 14:32 PHT</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[176.45px]" data-name="Container">
      <Margin3 />
      <Container15 />
    </div>
  );
}

function Container12() {
  return (
    <div className="col-1 content-stretch flex h-[40px] items-start justify-self-stretch relative row-3 shrink-0" data-name="Container">
      <Container13 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45474c] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">PAYMENT GATEWAY</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[14px] w-[153.2px]">
        <p className="leading-[20px]">VaultSecure Direct Pay</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[153.2px]" data-name="Container">
      <Margin4 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 13.3333">
        <g id="Container">
          <path d={svgPaths.p39026480} fill="var(--fill-0, #45474C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-center pr-[4px] relative shrink-0" data-name="Container">
      <Container21 />
    </div>
  );
}

function Container16() {
  return (
    <div className="col-1 content-stretch flex h-[40px] items-start justify-between justify-self-stretch relative row-4 shrink-0" data-name="Container">
      <Container17 />
      <Container20 />
    </div>
  );
}

function DetailsGrid() {
  return (
    <div className="gap-y-[24px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[____44px_44px_40px_40px] relative shrink-0 w-full" data-name="Details Grid">
      <Container3 />
      <Container7 />
      <Container12 />
      <Container16 />
    </div>
  );
}

function DecorativeVaultMetricSparklineSubtleSuccessIndicatorAtBottomOfCard() {
  return (
    <div className="absolute bg-[#f3f4f5] bottom-0 content-stretch flex flex-col h-[4px] items-start justify-center left-0 right-0" data-name="Decorative Vault Metric Sparkline (Subtle success indicator at bottom of card)">
      <div className="bg-[#95f7b9] flex-[1_0_0] min-h-px w-full" data-name="Background" />
    </div>
  );
}

function ReceiptCardBentoEditorialStyle() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_4px_32px_0px_rgba(25,28,29,0.04)] shrink-0 w-full" data-name="Receipt Card (Bento/Editorial Style)">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-start p-[32px] relative size-full">
          <AmountHighlight />
          <DetailsGrid />
          <DecorativeVaultMetricSparklineSubtleSuccessIndicatorAtBottomOfCard />
        </div>
      </div>
    </div>
  );
}

function ReceiptCardBentoEditorialStyleMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Receipt Card (Bento/Editorial Style):margin">
      <ReceiptCardBentoEditorialStyle />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-black relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative size-full">
          <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[4px] shadow-[0px_8px_16px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[90.56px]">
            <p className="leading-[24px]">Go to Home</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p38806900} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[16px] relative size-full">
          <Container22 />
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] text-center w-[139.86px]">
            <p className="leading-[24px]">Download Receipt</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Action Buttons">
      <Button />
      <Button1 />
    </div>
  );
}

function MainPaymentConfirmationScreenTransactionalNavigationSuppressed() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[448px] relative shrink-0 w-full" data-name="Main - Payment Confirmation Screen (Transactional - Navigation Suppressed)">
      <SuccessIndicatorHeaderMargin />
      <ReceiptCardBentoEditorialStyleMargin />
      <ActionButtons />
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 250) 0%, rgb(248, 249, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Payment Success">
      <MainPaymentConfirmationScreenTransactionalNavigationSuppressed />
    </div>
  );
}