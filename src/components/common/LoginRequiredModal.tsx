"use client";
import { Fragment } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useLoginModal } from "@/hooks";
import { Button } from "../ui";

function LoginRequiredModal() {
  const { isOpen, closeModal } = useLoginModal();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Arka plan kaplaması */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="_backdrop-blur-[2px] fixed inset-0 bg-neutral-500/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center md:items-center">
            <TransitionChild
            /* as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95" */
            >
              <Dialog.Panel className="flex w-full transform flex-col gap-4 overflow-hidden rounded-t-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:max-w-xl md:rounded-2xl dark:bg-neutral-900">
                <div className="flex items-center justify-between">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100"
                  >
                    Giriş yap veya kaydol
                  </DialogTitle>
                  <button
                    type="button"
                    className="rounded-md text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Kapat</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  Kullanıcılara mesaj göndermek, paylaşım yapmak ve gönderilere
                  ifade bırakmak için oturum açın.
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Link href={"/login"} tabIndex={-1}>
                    <Button variant="secondary">Giriş yap</Button>
                  </Link>
                  <Link href={"/register"} tabIndex={-1}>
                    <Button>Kaydol</Button>
                  </Link>
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default LoginRequiredModal;
