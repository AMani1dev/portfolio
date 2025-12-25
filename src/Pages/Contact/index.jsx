import { Form } from "./components";

const Info = () => {
  return (
    <div className="p-6 h-fit ">

      {/* Contact Details */}
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 uppercase text-sm mb-2">
          contact details
        </span>

        <a
          className="text-white flex flex-wrap"
          href="mailto:aminemani.freelance@gmail.com"
        >
          <abbr title="aminemani">am</abbr>
          <span>.freelance@gmail.com</span>
        </a>

        <a className="text-white" href="tel:+213796594817">
          +213 796594817
        </a>
      </div>

      {/* Business Details */}
      <div className="flex flex-col gap-1 my-10">
        <span className="text-gray-500 uppercase text-sm mb-2">
          business details
        </span>

        <a className="pointer-events-none select-none text-white">
          location : algeria
        </a>
      </div>

      {/* Socials */}
      <div>
        <span className="text-gray-500 uppercase text-sm mb-2">socials</span>

        <ul className="list-none flex flex-col gap-2 mt-3">
          <li>
            <a href="https://www.instagram.com/x.mani.dev/" target="_blank" className="text-white ">
              instagram
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@a.mani.dev?is_from_webapp=1&sender_device=pc" target="_blank" className="text-white ">
              tiktok
            </a>
          </li>
          <li>
            <a className="pointer-events-none select-none text-white">
              linkedin
            </a>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:px-20 bg-(--primary-clr) pt-40 pb-15 ">
        <Form />
        <Info />
      </div>
    </>
  );
};

export default Contact;