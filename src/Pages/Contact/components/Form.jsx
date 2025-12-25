import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

async function submitForm(prevState, formData) {
  try {
    const response = await fetch("https://formspree.io/f/xblzyjze", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
}

const Form = () => {
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState(submitForm, {
    success: null,
  });

  useEffect(() => {
    if (state.success === true) {
      navigate("/contact/success");
    } else if (state.success === false) {
      navigate("/contact/error");
    }
  }, [state.success, navigate]);

  return (
    <form
      action={formAction}
      className="px-5 sm:px-10 pt-10 w-full max-w-[500px] capitalize text-white"
    >
      {/* Name */}
      <fieldset className="fieldset">
        <label htmlFor="name" className="font-medium">What's your name?</label>
        <input
          type="text"
          id="name"
          name="name"
          className="py-4 placeholder:text-gray-500 w-full border-b border-gray-400 bg-transparent outline-none"
          placeholder="amine mani"
          required
        />
      </fieldset>

      {/* Email */}
      <fieldset className="fieldset">
        <label htmlFor="email" className="font-medium">What's your email?</label>
        <input
          type="email"
          id="email"
          name="email"
          className="py-4 placeholder:text-gray-500 w-full border-b border-gray-400 bg-transparent outline-none"
          placeholder="xxxx@gmail.com"
          required
        />
      </fieldset>

      {/* Message */}
      <fieldset className="fieldset">
        <label htmlFor="message" className="font-medium">What's your message?</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          className="py-4 placeholder:text-gray-500 w-full border-b border-gray-400 bg-transparent outline-none resize-none"
          placeholder="hi amine can you help me with ...?"
          required
        />
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-[120px] aspect-square flex items-center justify-center rounded-full text-white bg-violet-500 float-end mt-20 cursor-pointer hover:bg-violet-600 transition"
      >
        {isPending ? "Sending..." : "Send it"}
      </button>
    </form>
  );
};

export default Form;
