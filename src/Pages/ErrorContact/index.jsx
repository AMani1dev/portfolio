import { CircleBtn } from "../../SharedComponents";

const ErrorContact = () => {
  return (
    <div
      className="text-white bg-(--primary-clr) h-screen supports-[height:1svh]:h-svh
        capitalize content-center
        "
    >
      <section className="container sm:w-[80vw] px-5 sm:mx-auto ">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="text-3xl font-bold">
            <h1>error.  </h1>
            <h1>message failed! </h1>
          </div>

          <div className="">
            <p>please try again in a few moments</p>
          </div>
        </div>

        <div className="pl-[5vw] md:pl-0 md:float-end md:mr-[15vw] mt-5">
          <CircleBtn text={" home"} to="/" textClr={"text-white"} />
        </div>
      </section>
    </div>
  );
};

export default ErrorContact;
