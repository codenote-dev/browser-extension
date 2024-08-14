import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { App } from '~ui/App';

type DrawerProps = {
    isOpen: boolean;
    close: () => void;
};

export const Drawer: React.FC<DrawerProps> = ({ isOpen, close }) => (
    <Dialog className="relative z-10" open={isOpen} onClose={close}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                            <div className="px-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                        Panel title
                                    </Dialog.Title>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={close}>
                                            <span className="absolute -inset-2.5" />
                                            <span className="sr-only">
                                                Close panel
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                <App />
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </div>
    </Dialog>
);
