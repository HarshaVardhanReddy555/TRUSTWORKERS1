import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ChatScreenProps {
  partnerName: string;
  setCurrentScreen: (screen: ScreenId) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  partnerName,
  setCurrentScreen,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'partner' | 'user'; text: string; time: string }>>([
    {
      sender: 'partner',
      text: `Namaste Ram! I am on my TVS vehicle departing from Undi Mandal Center. Should reach your doorstep in approximately 12-15 minutes.`,
      time: '1:52 PM',
    },
    {
      sender: 'user',
      text: 'Namaste Ravi! Gate 2 is open. Apartment Flat 302 on the 3rd floor. The lift is fully working.',
      time: '1:54 PM',
    },
    {
      sender: 'partner',
      text: 'Noted! I have the spare washers, seal joints, and digital multimeter ready in my toolkit.',
      time: '1:55 PM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: inputText,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'partner',
          text: 'Understood! I will notify you once I reach your doorstep.',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-16 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-4 flex-1 flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen('live-tracking')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-2 px-3.5 rounded-xl border border-[#e3e3de] bg-white hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Live Tracking</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#707975] hidden sm:inline">Booking Ref:</span>
            <span className="text-xs font-mono font-bold text-[#00342b] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              #CWS-8495
            </span>
          </div>
        </div>

        {/* Main Desktop Chat Container */}
        <div className="bg-white rounded-3xl border border-[#e3e3de] shadow-2xs overflow-hidden flex-1 flex flex-col">
          {/* Chat Header inside Card */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base shadow-2xs">
                {partnerName.slice(0, 1)}
              </div>
              <div>
                <h1 className="font-bold text-base text-[#1a1c19] leading-tight">{partnerName}</h1>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Certified Co-op Technician • En Route</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Calling ${partnerName}...`)}
                className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span className="hidden sm:inline">Call Technician</span>
              </button>
            </div>
          </div>

          {/* Encrypted Notice Banner */}
          <div className="bg-[#fafaf5] border-b border-slate-200 px-4 py-2 text-center text-xs text-[#3f4945] flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm text-emerald-800">lock</span>
            <span>Cooperative Direct Line • End-to-end encrypted direct communication with your technician</span>
          </div>

          {/* Messages Thread */}
          <div className="p-6 flex-1 space-y-4 overflow-y-auto min-h-[360px] max-h-[500px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#00342b] text-white rounded-br-xs'
                      : 'bg-[#fafaf5] border border-[#e3e3de] text-[#1a1c19] rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Replies & Message Input Area */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3">
            {/* Quick response chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
              {[
                'I am at the doorstep',
                'Where have you reached on the road?',
                'Please ring the doorbell when you arrive',
                'Gate 2 is unlocked',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setInputText(chip)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => alert('Photo of damage/meter attached.')}
                className="p-3 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                title="Attach photo of fixture or issue"
              >
                <span className="material-symbols-outlined text-xl">attach_file</span>
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type message directly to technician..."
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#00342b]"
              />

              <button
                type="submit"
                className="py-3 px-5 bg-[#00342b] hover:bg-[#004d40] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Send</span>
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
