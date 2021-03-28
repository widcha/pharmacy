import React from "react";
import Wiwi from "../assets/images/wiwi.jpg";
import Yao from "../assets/images/yao.png";
import Lan from "../assets/images/lan.jpg";

export const AboutUs = () => {
  return (
    <section class="text-gray-600 body-font ">
      <div class="px-5 py-10 mx-auto flex flex-col">
        <div class="text-center mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
            Our Pharmacist
          </h1>
          <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
            Educated drug dealer.
          </p>
          <div class="flex mt-6 justify-center">
            <div class="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
          </div>
        </div>
        <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
              <img src={Wiwi} alt="" className="rounded-full" />
            </div>
            <div class="flex-grow">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                Wido The Duck
              </h2>
              <p class="leading-relaxed text-base">
                “If you can’t live without me, why aren’t you dead already?”
              </p>
            </div>
          </div>
          <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
              <img src={Yao} alt="" className="rounded-full h-20 w-20" />
            </div>
            <div class="flex-grow">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                Adhi Ming
              </h2>
              <p class="leading-relaxed text-base">
                “People say nothing is impossible, but I do nothing every day.”
              </p>
            </div>
          </div>
          <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
              <img src={Lan} alt="" className="rounded-full w-24 h-20" />
            </div>
            <div class="flex-grow">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                Lani The Curs
              </h2>
              <p class="leading-relaxed text-base">
                “My favorite machine at the gym is the vending machine.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
