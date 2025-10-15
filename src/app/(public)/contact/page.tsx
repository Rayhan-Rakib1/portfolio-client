import ContactForm from "@/components/modules/contactMe/ContactForm";

// src/app/contact/metadata.ts
export const metadata = {
  title: "Contact Us - portfolio",
  description: "Get in touch with us! Send your queries, feedback or message directly using our contact form.",

};


const contactMe = () => {
  return <div className="mt-36">
    <ContactForm></ContactForm>
  </div>;
};

export default contactMe;