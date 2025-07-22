import React from "react";

const AboutUs: React.FC = () => {
  return (
    <main
      className="h-screen w-screen flex flex-col items-center justify-center px-5 text-center"
      style={{ background: "linear-gradient(180deg, #928DAB 6%, #1F1C2C 100%)" }}
    >
      <h1 className="text-white font-black text-4xl mb-6 font-serif">
        About Us
      </h1>
      <p className="text-[#C3BDD4] max-w-xl mb-6 leading-relaxed text-lg">
        Welcome to our To-Do List app! We are passionate about helping you organize your tasks and boost your productivity.  
        Our mission is to provide a clean, easy-to-use interface that helps you focus on what matters most.
      </p>
      <p className="text-[#C3BDD4] max-w-xl leading-relaxed text-lg">
        Built with React and modern web technologies, our app offers intuitive features to manage your daily and monthly tasks effortlessly.
      </p>
    </main>
  );
};

export default AboutUs;
