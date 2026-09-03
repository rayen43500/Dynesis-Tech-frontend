import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { endpoints } from '../../shared/api/endpoints';
import './chatbot.css';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
};

export function ChatbotWidget() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 'welcome', sender: 'bot', text: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ id: 'welcome', sender: 'bot', text: t('chatbot.welcome') }];
      }
      return prev;
    });
  }, [i18n.language, t]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await endpoints.public.chatbot.send(userText);
      const botText = res.data?.data?.response || t('chatbot.error');

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: t('chatbot.unavailable')
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatbot-floating">
      {!isOpen && (
        <button
          type="button"
          className="chatbot-trigger"
          onClick={() => setIsOpen(true)}
          aria-label={t('chatbot.triggerAria')}
        >
          <div className="chatbot-trigger__badge">
            <Bot size={16} />
          </div>
          <span>{t('chatbot.trigger')}</span>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-label={t('chatbot.dialogAria')}>
          <header className="chatbot-header">
            <div className="chatbot-header__title">
              <div className="chatbot-header__avatar">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="chatbot-header__name">{t('chatbot.name')}</h3>
                <span className="chatbot-header__rgpd-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <ShieldCheck size={10} /> {t('chatbot.gdprBadge')}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-header__close"
              onClick={() => setIsOpen(false)}
              aria-label={t('chatbot.closeAria')}
            >
              <X size={16} />
            </button>
          </header>

          <div className="chatbot-rgpd-banner">🔒 {t('chatbot.gdprBanner')}</div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg--bot" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                {t('chatbot.typing')}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              type="text"
              className="chatbot-input"
              placeholder={t('chatbot.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn" disabled={!input.trim() || loading} aria-label={t('chatbot.sendAria')}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
