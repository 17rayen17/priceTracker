"use client";

import { addUserEmailToProduct } from "@/lib/actions";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { FormEvent, Fragment, useState } from "react";

interface Props {
  productId : string
}

const Modal = ({productId}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    await addUserEmailToProduct(productId, email)

    setIsSubmitted(false);
    setEmail('');
    closeModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button className="btn" type="button" onClick={openModal}>
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <Image
                          src={"/assets/icons/logo.svg"}
                          alt="logo"
                          width={27}
                          height={27}
                        />
                      </div>
                      <button type="button" onClick={closeModal}>
                        <Image
                          src={"/assets/icons/x-close.svg"}
                          alt="close"
                          width={27}
                          height={27}
                        />
                      </button>
                    </div>
                    <Dialog.Title as="h3" className="dialog-head_text">
                      Stay updated with product pricing alerts right in your
                      inbox!
                    </Dialog.Title>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                  <form className="flex flex-col mt-5" onSubmit={handelSubmit}>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="dialog-input_container">
                      <Image
                        src={"/assets/icons/mail.svg"}
                        alt="mail"
                        width={18}
                        height={18}
                      />
                      <input
                        type="email"
                        required
                        id="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Enter your email adress"
                        className="dialog-input"
                      />
                    </div>
                    <button type="submit" className="dialog-btn disabled:cursor-not-allowed disabled:opacity-40" disabled={email == ''}>
                      {isSubmitted ? "Submitting ..." : "Track Product"}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
