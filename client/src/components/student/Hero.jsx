import { assets } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70 ">
      <h1 className="md:text-home-leading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
        Empower your future with the courses designed to{" "}
        <span className="text-blue-600">fit your choice.</span>
        <img
          className="md:block hidden absolute -bottom-7 right-0"
          src={assets.sketch}
          alt="sketch"
        />
      </h1>
      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        We bring to together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>
      <p>
        We bring together world-class instructors to help you achieve your professional goals
      </p>
    </div>
  );
};

export default Hero;
