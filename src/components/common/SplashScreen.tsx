"use client";
import Logo from "./Logo";

const SplashScreen = ({ visible = false }: { visible: boolean }) => {
  return visible ? (
    <div
      className={"fixed inset-0 flex items-center justify-center bg-white z-50"}
    >
      <Logo className="text-3xl" />
    </div>
  ) : (
    <></>
  );
};

export default SplashScreen;
