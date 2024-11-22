export default function BackgroundGradient() {
  return (
    <div
      className="before:bg-gradient-radial after:bg-gradient-conic relative right-0 z-[-1] flex place-items-center before:absolute before:h-[160vh] before:w-[400px] before:translate-x-[70%] before:rotate-45 before:rounded-full before:from-[#1F4247] before:to-[#0D1D23] before:opacity-90 before:blur-3xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-[70%] after:overflow-hidden after:from-[#1F4247] after:via-[#0D1D23] after:opacity-70 after:blur-2xl after:content-[''] before:lg:h-[360px]"
      style={{
        backgroundColor: "#0D1D23",
      }}
    ></div>
  );
}
