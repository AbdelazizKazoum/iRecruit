"use client";
import { ClipLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      <ClipLoader
        color="#1b4362"
        loading={true}
        size={150}
        className=" text-4xl "
      />
    </div>
  );
};

export default LoadingPage;
