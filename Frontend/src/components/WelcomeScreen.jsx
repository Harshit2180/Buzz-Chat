import React from 'react'
import { IconLock } from '../icons/Icons'

const WelcomeScreen = () => {
    return (
        <div className="min-h-screen flex-1 bg-[#f0f2f5] flex flex-col border-b-[6px] border-[#25d366] px-10">

            {/* Center Content */}
            <div className="flex flex-1 flex-col items-center justify-center text-center">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
                    width="100"
                    className="opacity-30 mb-8 grayscale"
                />

                <h1 className="text-3xl font-light text-[#41525d] mb-4">
                    Download BuzzChat for Windows
                </h1>

                <p className="text-[#667781] text-sm leading-6 max-w-md">
                    Make calls, share your screen and get a faster experience when you download the Windows app.
                </p>

                <button className="mt-8 bg-[#008069] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#006a57]">
                    Get the app
                </button>
            </div>

            {/* Footer */}
            <div className="mb-10 text-[13px] text-[#8696a0] flex items-center justify-center gap-1">
                <IconLock />
                <span>Your personal messages are end-to-end encrypted</span>
            </div>

        </div>
    )
}

export default WelcomeScreen